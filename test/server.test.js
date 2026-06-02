// Set environment variables for testing
process.env.NODE_ENV = 'test';
process.env.PORT = '3001';
process.env.ALLOWED_ORIGIN = 'http://localhost:3000';

const { app } = require('../src/server');
const request = require('supertest');

describe('Security Middleware', () => {
  let server;

  beforeAll(() => {
    // Start server for tests
    const { server: testServer } = require('../src/server');
    server = testServer;
  });

  afterAll(() => {
    // Close server after tests
    server.close();
  });

  // Test helmet headers
  test('should set helmet headers', async () => {
    const response = await request(app).get('/health');
    expect(response.headers).toHaveProperty('x-content-type-options');
    expect(response.headers).toHaveProperty('x-frame-options');
    expect(response.headers).toHaveProperty('x-xss-protection');
  });

  // Test CORS
  test('should set CORS headers', async () => {
    const response = await request(app)
      .get('/health')
      .set('Origin', 'http://localhost:3000');
    expect(response.headers).toHaveProperty('access-control-allow-origin', 'http://localhost:3000');
    expect(response.headers).toHaveProperty('access-control-allow-credentials', 'true');
  });

  // Test rate limiting headers
  test('should set rate limit headers', async () => {
    const response = await request(app).get('/health');
    expect(response.headers).toHaveProperty('x-ratelimit-limit');
    expect(response.headers).toHaveProperty('x-ratelimit-remaining');
    expect(response.headers).toHaveProperty('x-ratelimit-reset');
  });

  // Test input validation for /api/users endpoint
  describe('POST /api/users', () => {
    test('should validate input and return 400 for invalid email', async () => {
      const response = await request(app)
        .post('/api/users')
        .send({ email: 'invalid-email', password: 'password123', name: 'Test User' });
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('errors');
      expect(response.body.errors).toEqual(expect.arrayContaining([
        expect.objectContaining({ msg: 'Invalid value' })
      ]));
    });

    test('should validate input and return 400 for short password', async () => {
      const response = await request(app)
        .post('/api/users')
        .send({ email: 'test@example.com', password: '123', name: 'Test User' });
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('errors');
      // Check for any validation error on password field
      const passwordError = response.body.errors.find(err => err.param === 'password');
      expect(passwordError).toBeDefined();
      expect(passwordError.msg).toContain('Password must be at least 8 characters long');
    });

    test('should validate input and return 400 for password without number', async () => {
      const response = await request(app)
        .post('/api/users')
        .send({ email: 'test@example.com', password: 'password', name: 'Test User' });
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('errors');
      // Check for any validation error on password field
      const passwordError = response.body.errors.find(err => err.param === 'password');
      expect(passwordError).toBeDefined();
      expect(passwordError.msg).toContain('Password must contain a number');
    });

    test('should create user with valid input', async () => {
      const response = await request(app)
        .post('/api/users')
        .send({ email: 'test@example.com', password: 'password123', name: 'Test User' });
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('message', 'User created successfully');
      expect(response.body.user).toHaveProperty('email', 'test@example.com');
      expect(response.body.user).toHaveProperty('name', 'Test User');
    });

    test('should trim and escape name', async () => {
      const response = await request(app)
        .post('/api/users')
        .send({ email: 'test@example.com', password: 'password123', name: '  <script>alert(1)</script>  ' });
      expect(response.status).toBe(201);
      // The name should be trimmed and HTML-escaped
      // express-validator's escape() converts < to &lt;, > to &gt;, " to &quot;, ' to &#x27;, and / to &#x2F;
      expect(response.body.user.name).toBe('&lt;script&gt;alert(1)&lt;&#x2F;script&gt;');
    });
  });
});
const fs = require('fs');
const path = require('path');

describe('Package.json remediation', () => {
  let packageJson;

  beforeAll(() => {
    const packageJsonPath = path.join(__dirname, '..', 'package.json');
    const rawData = fs.readFileSync(packageJsonPath);
    packageJson = JSON.parse(rawData);
  });

  test('should have name field', () => {
    expect(packageJson.name).toBeDefined();
    expect(typeof packageJson.name).toBe('string');
  });

  test('should have version field', () => {
    expect(packageJson.version).toBe('1.0.0');
  });

  test('should have description field', () => {
    expect(packageJson.description).toBe('A secure rate-limited Express.js server with environment configuration and input validation.');
  });

  test('should have main field', () => {
    expect(packageJson.main).toBe('index.js');
  });

  test('should have scripts field with test, start, build, lint, format, publish', () => {
    expect(packageJson.scripts).toHaveProperty('test', 'jest');
    expect(packageJson.scripts).toHaveProperty('start', 'node src/server.js');
    expect(packageJson.scripts).toHaveProperty('build', 'echo \'No build step required\'');
    expect(packageJson.scripts).toHaveProperty('lint', 'eslint .');
    expect(packageJson.scripts).toHaveProperty('format', 'prettier --write .');
    expect(packageJson.scripts).toHaveProperty('publish', 'echo \'Publishing not automated; run npm publish manually\'');
  });

  test('should have repository field with type and url', () => {
    expect(packageJson.repository).toHaveProperty('type', 'git');
    expect(packageJson.repository).toHaveProperty('url', 'https://github.com/juninmd/jules.git');
  });

  test('should have keywords array with express, rate-limit, security, validation', () => {
    expect(packageJson.keywords).toContain('express');
    expect(packageJson.keywords).toContain('rate-limit');
    expect(packageJson.keywords).toContain('security');
    expect(packageJson.keywords).toContain('validation');
  });

  test('should have author field', () => {
    expect(packageJson.author).toBe('Juninmd');
  });

  test('should have license field as MIT', () => {
    expect(packageJson.license).toBe('MIT');
  });

  test('should have engines field with node >=14.0.0', () => {
    expect(packageJson.engines).toHaveProperty('node', '>=14.0.0');
  });

  test('should have security field with policy url', () => {
    expect(packageJson.security).toHaveProperty('policy', 'https://github.com/juninmd/jules/security/policy');
  });

  test('should have readme field pointing to README.md', () => {
    expect(packageJson.readme).toBe('README.md');
  });

  test('should have bugs field with url', () => {
    expect(packageJson.bugs).toHaveProperty('url', 'https://github.com/juninmd/jules/issues');
  });

  test('should have homepage field', () => {
    expect(packageJson.homepage).toBe('https://github.com/juninmd/jules#readme');
  });

  test('should have devDependencies including jest, supertest, eslint, prettier', () => {
    expect(packageJson.devDependencies).toHaveProperty('jest');
    expect(packageJson.devDependencies).toHaveProperty('supertest');
    expect(packageJson.devDependencies).toHaveProperty('eslint');
    expect(packageJson.devDependencies).toHaveProperty('prettier');
  });

  test('should have dependencies including cors, dotenv, express, express-rate-limit, express-validator, helmet', () => {
    expect(packageJson.dependencies).toHaveProperty('cors');
    expect(packageJson.dependencies).toHaveProperty('dotenv');
    expect(packageJson.dependencies).toHaveProperty('express');
    expect(packageJson.dependencies).toHaveProperty('express-rate-limit');
    expect(packageJson.dependencies).toHaveProperty('express-validator');
    expect(packageJson.dependencies).toHaveProperty('helmet');
  });
});

describe('README.md exists and has content', () => {
  const readmePath = path.join(__dirname, '..', 'README.md');

  test('should exist', () => {
    expect(fs.existsSync(readmePath)).toBe(true);
  });

  test('should contain project title', () => {
    const content = fs.readFileSync(readmePath, 'utf8');
    expect(content).toContain('# Jules');
  });

  test('should contain installation section', () => {
    const content = fs.readFileSync(readmePath, 'utf8');
    expect(content).toContain('## Installation');
  });

  test('should contain usage section', () => {
    const content = fs.readFileSync(readmePath, 'utf8');
    expect(content).toContain('## Usage');
  });

  test('should contain testing section', () => {
    const content = fs.readFileSync(readmePath, 'utf8');
    expect(content).toContain('## Testing');
  });

  test('should contain license section', () => {
    const content = fs.readFileSync(readmePath, 'utf8');
    expect(content).toContain('## License');
  });

  test('should contain security policy section', () => {
    const content = fs.readFileSync(readmePath, 'utf8');
    expect(content).toContain('## Security Policy');
  });
});
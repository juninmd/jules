# Jules

A Node.js/Express API service with security best practices.

## CI/CD Pipeline

This project uses GitHub Actions for continuous integration and deployment.

![CI/CD Pipeline](https://github.com/juninmd/jules/actions/workflows/ci.yml/badge.svg)

### Pipeline Stages

1. **Lint** - Code quality checks using ESLint
2. **Test** - Unit and integration tests with Jest
3. **Build** - Artifact preparation (currently a placeholder for this backend service)
4. **Deploy** - Automatic deployment to production on main branch pushes

### Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm start
   ```

3. Run tests:
   ```bash
   npm test
   ```

4. Lint code:
   ```bash
   npx eslint src/
   ```

### Environment Variables

- `PORT` - Server port (default: 3000)
- `ALLOWED_ORIGIN` - CORS allowed origin (default: http://localhost:3000)

### Deployment

The application is automatically deployed to the production environment when changes are pushed to the `main` branch, pending successful completion of all pipeline stages.

### Contributing

Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code review process and CI/CD guidelines.

### License

ISC

# Posts Frontend Application

A modern, production-ready React application for managing posts with an optimized architecture following industry best practices. Built with React, Redux Toolkit, TypeScript, and Vite.

![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=flat-square&logo=typescript)
![Redux](https://img.shields.io/badge/Redux_Toolkit-2.8.2-764ABC?style=flat-square&logo=redux)
![Vite](https://img.shields.io/badge/Vite-6.3.5-646CFF?style=flat-square&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.7-38B2AC?style=flat-square&logo=tailwind-css)
![Vitest](https://img.shields.io/badge/Vitest-3.1.4-6E9F18?style=flat-square&logo=vitest)

## Features

- **Complete CRUD Operations** - Create, read, update, and delete posts
- **Advanced Filtering** - Filter posts by name with debounced search
- **Responsive UI** - Fully responsive design with Tailwind CSS
- **Advanced State Management** - Redux with RTK and optimistic updates
- **Performance Optimized** - Memoization, code splitting, and other optimizations
- **Comprehensive Testing** - Unit, integration, and component tests
- **Accessibility Compliant** - Follows WCAG 2.1 AA standards
- **Docker Ready** - Containerization for consistent deployment
- **CI/CD Integration** - Automated workflows with GitHub Actions

## Tech Stack

### Frontend Framework & Libraries
- **React 19** - Modern UI library with latest features
- **Redux Toolkit** - State management with simplified APIs and best practices
- **React Router DOM 7** - Declarative routing for React applications

### Build & Development Tools
- **TypeScript 5.8** - Static type checking and latest language features
- **Vite 6** - Next-generation frontend build tool
- **ESLint 9** - Static code analysis with modern configurations
- **Prettier** - Code formatter for consistent style

### Styling & UI
- **Tailwind CSS 4** - Utility-first CSS framework
- **Custom UI Components** - Reusable component library with design system

### Testing
- **Vitest** - Ultra-fast testing framework compatible with Vite
- **React Testing Library** - Component testing with user-centric approach
- **Mock Service Worker** - API mocking for testing
- **Jest DOM** - DOM testing utilities
- **Code Coverage Reporting** - Via v8 coverage engine

### Performance & Best Practices
- **Custom Hooks** - Reusable logic with optimized performance
- **Memoization** - Preventing unnecessary re-renders
- **Debouncing** - Performance optimization for input handling
- **Error Boundaries** - Graceful error handling
- **Accessibility Features** - Screen reader support, keyboard navigation, ARIA attributes

### DevOps & Deployment
- **GitHub Actions** - CI/CD workflows
- **Docker** - Containerization for consistent environments
- **Nginx** - Production-grade web server configuration

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm 9 or later
- API Backend running (default: http://localhost:3001/api)

### Installation

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd posts-frontend
   ```

2. Install dependencies
   ```bash
   npm ci  # Clean install for reproducible builds
   ```

3. Configure environment variables
   ```bash
   cp .env.example .env  # Copy example and adjust as needed
   ```

4. Start the development server
   ```bash
   npm run dev
   ```

5. Open http://localhost:5173 to view the application

### API Configuration

The application expects a backend API with the following endpoints:
- `GET /posts` - List all posts (supports optional `name` query param for filtering)
- `GET /posts/:id` - Get a post by ID
- `POST /posts` - Create a new post
- `PUT /posts/:id` - Update a post
- `DELETE /posts/:id` - Delete a post

Configure the API URL in `.env`:
```
VITE_API_URL=http://localhost:3001/api
```

## Available Scripts

### Development
- `npm run dev` - Start development server with HMR
- `npm run build` - Build optimized production bundle
- `npm run preview` - Preview production build locally

### Code Quality
- `npm run lint` - Run ESLint for all files
- `npm run lint:fix` - Fix auto-fixable ESLint issues
- `npm run format` - Format code with Prettier
- `npm run checkformat` - Check format without modifying files

### Testing
- `npm run test` - Run all tests
- `npm run test:watch` - Run tests in watch mode for development
- `npm run test:ui` - Run tests with UI interface
- `npm run test:coverage` - Generate test coverage reports

### Documentation
- `npm run docs` - Generate JSDoc documentation

### Production
- `npm run analyze` - Analyze bundle size
- `npm run prepare` - Pre-commit hook for linting and testing

## Project Architecture

The project follows a feature-based architecture with clear separation of concerns:

```
src/
  ├── assets/         # Static assets and media files
  ├── components/     # Reusable UI components
  │   ├── posts/      # Post-specific components (DataTable, Forms, etc.)
  │   └── ui/         # Generic UI components (Modal, Notification, etc.)
  ├── features/       # Feature-specific modules
  │   └── posts/      # Posts feature (Page, Redux slice, tests)
  ├── hooks/          # Custom React hooks (useDebounce, useForm, etc.)
  ├── layouts/        # Layout components and templates
  ├── pages/          # Page components for routing
  ├── services/       # API services and abstractions
  ├── store/          # Redux store configuration and middleware
  │   └── middleware/ # Custom middleware (logger, etc.)
  ├── styles/         # Global styles and CSS utilities
  ├── test/           # Test utilities and mock server setup
  │   ├── mocks/      # API mocking with MSW
  │   └── utils/      # Test helper functions and providers
  ├── types/          # TypeScript type definitions and interfaces
  └── App.tsx         # Main application component
```

## Key Design Patterns

- **Feature-based Organization** - Related code is grouped by feature, not by type
- **Redux Toolkit Architecture** - Using slices, async thunks, and modern Redux patterns
- **Container/Presentation Pattern** - Separation of logic and presentation
- **Custom Hook Pattern** - Extracting and reusing complex stateful logic
- **Error Boundary Pattern** - Graceful error handling and recovery
- **Optimistic UI Updates** - Immediate feedback with background sync

## Documentation

The project includes comprehensive documentation:

- [Testing Strategy](./TESTING.md) - Testing approach, tools, and practices
- [Accessibility Guide](./ACCESSIBILITY.md) - Accessibility features and standards
- [Performance Optimization](./PERFORMANCE.md) - Performance strategies and metrics
- [Deployment Guide](./DEPLOYMENT.md) - Production deployment instructions
- [Contributing Guidelines](./CONTRIBUTING.md) - Guidelines for contributors

## Continuous Integration & Deployment

The project uses GitHub Actions for CI/CD with the following workflow:

1. **Install Dependencies** - Clean installation of dependencies
2. **Lint** - Code quality checks with ESLint
3. **Test** - Run all tests with Vitest
4. **Coverage Report** - Generate and verify test coverage
5. **Build** - Create optimized production build
6. **Deploy** - Conditional deployment to staging/production (when configured)

## Docker Deployment

The project includes Docker configuration for containerized deployment:

```bash
# Build the Docker image
docker build -t posts-frontend:latest .

# Run the container
docker run -p 80:80 posts-frontend:latest
```

## Performance Considerations

- Debounced search inputs to minimize API calls
- Memoized components and callbacks to prevent unnecessary re-renders
- Optimistic UI updates for improved perceived performance
- Code splitting for reduced initial bundle size

## License

This project is licensed under the MIT License.

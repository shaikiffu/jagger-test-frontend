# JAGGAER Frontend - E-Commerce Application

A modern, responsive e-commerce frontend application built with React and Material-UI, featuring GraphQL integration and advanced caching strategies.

## 🚀 Live Demo

**Frontend**: [https://jaggaer-frontend-85f1e9744d8d.herokuapp.com/](https://jaggaer-frontend-85f1e9744d8d.herokuapp.com/)

**Backend API**: [https://jaggaer-backend-api-908f5a13acd5.herokuapp.com/graphql](https://jaggaer-backend-api-908f5a13acd5.herokuapp.com/graphql)

## 🛠️ Technologies Used

### Core Framework & Libraries

#### **React (v19.0.0)**
- **Why**: Industry-standard library for building user interfaces with component-based architecture
- **Benefits**:
  - Virtual DOM for optimal performance
  - Reusable components
  - Large ecosystem and community support
  - Easy state management

#### **React Router DOM (v7.1.1)**
- **Why**: Client-side routing for single-page application navigation
- **Benefits**:
  - Seamless page transitions without full page reloads
  - URL-based navigation
  - Nested routing support
  - Browser history management

### GraphQL & Data Management

#### **Apollo Client (v3.11.8)**
- **Why**: Powerful GraphQL client for React applications
- **Benefits**:
  - Built-in caching with InMemoryCache
  - Automatic request deduplication
  - Optimistic UI updates
  - Real-time data synchronization
  - Declarative data fetching with hooks

#### **GraphQL (v16.9.0)**
- **Why**: Query language for APIs providing efficient data fetching
- **Benefits**:
  - Request only the data you need
  - Strong typing
  - Single endpoint for all data operations
  - Reduced over-fetching and under-fetching

### UI Framework & Styling

#### **Material-UI (MUI) (v6.1.9)**
- **Why**: Comprehensive React component library implementing Material Design
- **Benefits**:
  - Pre-built, customizable components
  - Responsive design out of the box
  - Consistent design language
  - Accessibility built-in
  - Theme customization support

#### **@mui/icons-material (v6.1.9)**
- **Why**: Official Material Design icon set
- **Benefits**:
  - 2,000+ ready-to-use icons
  - Consistent visual language
  - Scalable vector icons
  - Easy integration with MUI components

#### **Emotion (v11.13.5)**
- **Why**: CSS-in-JS library used by Material-UI
- **Benefits**:
  - Dynamic styling based on props
  - Scoped styles preventing conflicts
  - Server-side rendering support
  - Better performance than traditional CSS

### Build Tools & Transpilation

#### **Webpack (v5.97.1)**
- **Why**: Module bundler for JavaScript applications
- **Benefits**:
  - Code splitting for optimal loading
  - Asset optimization
  - Tree shaking for smaller bundles
  - Development server with hot module replacement

#### **Babel**
- **@babel/core (v7.26.0)**
- **@babel/preset-env (v7.26.0)**
- **@babel/preset-react (v7.25.9)**
- **Why**: JavaScript compiler to use latest JS features
- **Benefits**:
  - Transpiles modern JavaScript to browser-compatible code
  - JSX transformation
  - Polyfill support for older browsers
  - Configurable target environments

#### **babel-loader (v9.2.1)**
- **Why**: Webpack loader for Babel integration
- **Benefits**: Seamless transpilation during build process

### Development Tools

#### **webpack-dev-server (v5.1.0)**
- **Why**: Development server with live reloading
- **Benefits**:
  - Hot module replacement (HMR)
  - Automatic browser refresh
  - Fast development feedback loop

#### **ESLint (v8.57.1)**
- **Why**: JavaScript linting tool for code quality
- **Benefits**:
  - Catches bugs early
  - Enforces coding standards
  - Improves code consistency
  - Customizable rules

#### **eslint-plugin-react (v7.37.2)**
- **Why**: React-specific linting rules
- **Benefits**:
  - React best practices enforcement
  - Hook usage validation
  - Accessibility checks

#### **eslint-plugin-react-hooks (v4.6.2)**
- **Why**: Enforces React Hooks rules
- **Benefits**:
  - Prevents common Hook mistakes
  - Ensures Hook dependency arrays are correct

### Loaders & Utilities

#### **style-loader (v4.0.0)**
- **Why**: Injects CSS into the DOM
- **Benefits**: Dynamic CSS loading during development

#### **css-loader (v7.1.2)**
- **Why**: Resolves CSS imports and dependencies
- **Benefits**: Enables CSS modules and asset handling

#### **html-webpack-plugin (v5.6.3)**
- **Why**: Generates HTML files for the application
- **Benefits**:
  - Automatic script injection
  - Template support
  - Minification

### Polyfills & Browser Support

#### **core-js (v3.46.0)**
- **Why**: Polyfill library for JavaScript features
- **Benefits**:
  - Ensures compatibility with older browsers
  - Support for ES6+ features
  - Modular polyfills

### Production Server

#### **serve (v14.2.4)**
- **Why**: Static file server for production deployment
- **Benefits**:
  - Lightweight HTTP server
  - Optimized for serving static files
  - CORS support
  - Cache control

## 🎯 Key Features Implemented

### 1. **Advanced Caching Strategy**
- Apollo Client InMemoryCache with custom type policies
- Cache-first fetch policy for products
- Cache-and-network for real-time cart updates
- Automatic cache invalidation after mutations

### 2. **Responsive Design**
- Mobile-first approach
- Breakpoint-based layouts
- Responsive typography
- Adaptive component sizing

### 3. **Performance Optimizations**
- Code splitting by route
- Lazy loading of components
- Image optimization
- Minified production builds

### 4. **User Experience**
- Smooth animations and transitions
- Loading states and skeleton screens
- Error handling with user-friendly messages
- Toast notifications for actions
- Drop shadow on scroll effect

### 5. **State Management**
- Apollo Client cache as single source of truth
- Optimistic UI updates
- Automatic refetching after mutations
- Local state for UI components

## 📁 Project Structure

```
frontend/
├── public/
│   ├── index.html          # HTML template
│   └── favicon.ico         # App icon
├── src/
│   ├── components/         # Reusable components
│   │   ├── CartItem.js
│   │   ├── Header.js
│   │   ├── Layout.js
│   │   ├── ProductCard.js
│   │   ├── ProductImageModal.js
│   │   └── PurchaseCompleteModal.js
│   ├── pages/              # Page components
│   │   ├── CartPage.js
│   │   ├── ProductDetailsPage.js
│   │   └── ProductsListPage.js
│   ├── graphql/            # GraphQL operations
│   │   ├── queries.js
│   │   └── mutations.js
│   ├── App.js              # Main app component with Apollo setup
│   ├── index.js            # Entry point
│   └── index.css           # Global styles
├── .babelrc                # Babel configuration
├── .eslintrc.json          # ESLint configuration
├── .gitignore              # Git ignore rules
├── package.json            # Dependencies and scripts
├── static.json             # Static server configuration
└── webpack.config.js       # Webpack configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18.x
- npm >= 9.x

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd frontend
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm run dev
```

4. Build for production
```bash
npm run build
```

5. Serve production build locally
```bash
npm start
```

## 📜 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Create production build
- `npm start` - Serve production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors automatically

## 🌐 Deployment

The application is deployed on Heroku using the following configuration:

1. **Build Process**: Webpack production build via `heroku-postbuild` script
2. **Server**: Static file serving using `serve` package
3. **Environment**: Node.js 24.x runtime

### Deployment URL
- **Frontend**: https://jaggaer-frontend-85f1e9744d8d.herokuapp.com/
- **Backend**: https://jaggaer-backend-api-908f5a13acd5.herokuapp.com/graphql

## 🎨 Design Decisions

### Why Apollo Client over Redux?
- Built specifically for GraphQL
- Automatic caching out of the box
- Less boilerplate code
- Better DevTools experience
- Normalized cache updates

### Why Material-UI over Custom CSS?
- Faster development with pre-built components
- Consistent design system
- Built-in accessibility
- Responsive by default
- Easy theming and customization

### Why Webpack over Vite?
- More mature ecosystem
- Better plugin support for complex configurations
- Greater flexibility for advanced use cases
- Industry standard for production builds

## 📊 Performance Metrics

- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Bundle Size**: 689 KB (minified)
- **Lighthouse Score**: 90+ (Performance)

## 🔒 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 License

ISC

## 👥 Contributing

This is an assignment project. Contributions are not currently accepted.

## 📧 Contact

For questions or feedback, please reach out to the project maintainer.

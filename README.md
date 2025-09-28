# AcmeCorp Claims Demo Website

A comprehensive demo web application that simulates the complete insurance claim filing process for AcmeCorp, a fictitious insurance company. This application provides an intuitive, wizard-like interface that guides customers through the entire claim submission workflow, from initial login to final confirmation. Built with modern web technologies, it demonstrates best practices in user experience design, form handling, file uploads, and session management.

## 📖 Table of Contents

- [Quick Start](#-quick-start)
- [Detailed Claim Filing Process](#-detailed-claim-filing-process)
- [Comprehensive Troubleshooting](#-comprehensive-troubleshooting)
- [Technical Architecture](#️-technical-architecture)
- [Development Guide](#-development-guide)
- [Customization Options](#-customization-options)
- [Security Considerations](#-security-considerations)
- [Performance Optimization](#-performance-optimization)
- [Testing Guidelines](#-testing-guidelines)
- [Deployment Instructions](#-deployment-instructions)
- [API Documentation](#-api-documentation)
- [Contributing Guidelines](#-contributing-guidelines)

## 🚀 Quick Start

### Prerequisites
Before running the application, ensure you have the following installed:
- **Node.js** (version 14.0 or higher) - Download from [nodejs.org](https://nodejs.org/)
- **npm** (comes with Node.js) - Package manager for JavaScript
- **Modern web browser** (Chrome, Firefox, Safari, or Edge)

### Installation Steps

1. **Clone or download the project:**
   ```bash
   # If using git
   git clone <repository-url>
   cd acmecorp-claims
   
   # Or simply navigate to the project directory
   cd /path/to/acmecorp-claims
   ```

2. **Install all required dependencies:**
   ```bash
   npm install
   ```
   This command will install all packages listed in `package.json`, including:
   - Express.js web framework
   - EJS templating engine
   - Express-session for session management
   - Multer for file upload handling
   - Morgan for HTTP request logging
   - Express-ejs-layouts for template layouts

3. **Start the development server:**
   ```bash
   # For production mode
   npm start
   
   # For development mode with auto-restart
   npm run dev
   ```

4. **Access the application:**
   Open your web browser and navigate to `http://localhost:3000`
   
   You should see the AcmeCorp homepage with:
   - Hero section with call-to-action
   - Feature cards showcasing different insurance types
   - Image gallery with stock photos
   - Navigation header with login option

### Verification Steps
To ensure everything is working correctly:
1. The terminal should display: `AcmeCorp demo listening on http://localhost:3000`
2. The homepage should load with proper styling and images
3. Click "Customer Login" to test the login flow
4. Try filing a test claim to verify the complete workflow

## 📋 Detailed Claim Filing Process

The claim filing process is designed to be intuitive and user-friendly, guiding customers through each step with clear instructions and helpful hints. The entire process typically takes 5-10 minutes to complete.

### Step 1: Customer Login & Authentication

**Purpose**: Establish a user session and verify access to the claims system.

**Process**:
1. **Navigate to Login**: From the homepage, click either "Customer Login" in the header or "File a Claim" in the hero section
2. **Enter Credentials**: 
   - **Username**: Enter any username (demo mode - no validation required)
   - **Password**: Enter any password (demo mode - no validation required)
   - **Note**: In a production environment, this would require valid credentials
3. **Submit**: Click "Continue" to proceed
4. **Session Creation**: The system creates a session and redirects to the claim wizard

**Technical Details**:
- Session data is stored in memory using `express-session`
- Session expires after 1 hour of inactivity
- User data is stored in `req.session.user`
- Claim progress is initialized in `req.session.claim`

### Step 2: Initial Data Collection

**Purpose**: Gather basic policyholder information and contact details.

**Required Information**:
- **Policy Number**: 
  - Format: Any alphanumeric string (e.g., "POL-12345-ABC")
  - Purpose: Links the claim to the customer's insurance policy
  - Note: No validation against actual policy database in demo mode
- **Full Name**: 
  - Format: Complete legal name as it appears on the policy
  - Purpose: Verification and correspondence
- **Email Address**: 
  - Format: Valid email format (e.g., "customer@example.com")
  - Purpose: Primary communication method for claim updates
- **Phone Number**: 
  - Format: Any phone number format
  - Purpose: Secondary contact method and urgent communications

**User Experience Features**:
- Form validation ensures all fields are completed
- Data persists if user navigates back to previous steps
- Clean, responsive form layout with clear labels
- "Next" button only enables when all required fields are filled

### Step 3: Incident Details & Evidence Upload

**Purpose**: Collect comprehensive information about the incident and supporting documentation.

**Incident Information**:
- **Incident Type**: 
  - Options: Car, Boat, Other
  - Purpose: Categorizes the claim for proper routing and processing
  - Help Text: "Choose the category that best fits your incident"
- **Incident Date**: 
  - Format: Date picker (YYYY-MM-DD)
  - Purpose: Establishes timeline and policy coverage period
- **Incident Time**: 
  - Format: Time picker (HH:MM)
  - Purpose: Provides additional context for the incident
- **Brief Description**: 
  - Format: Multi-line text area (1-3 sentences recommended)
  - Purpose: Initial narrative of what occurred
  - Help Text: "Describe what happened in 1-3 sentences"

**File Upload System**:
- **Supported Formats**: 
  - Images: JPG, JPEG, PNG, GIF
  - Documents: PDF, DOC, DOCX
- **Upload Limits**: 
  - Maximum 10 files per submission
  - Individual file size limit: 10MB (configurable)
  - Total upload size limit: 50MB
- **File Processing**: 
  - Files are renamed with timestamp prefix for uniqueness
  - Original filenames are preserved for reference
  - Files stored temporarily in `src/public/uploads/`
- **User Experience**: 
  - Multiple file selection supported
  - Previously uploaded files are displayed
  - Files can be viewed by clicking on them
  - Upload progress feedback (browser-dependent)

**Advanced Features**:
- **File Persistence**: Uploaded files remain available when navigating between steps
- **Error Handling**: Clear error messages for unsupported file types
- **Security**: File type validation prevents malicious uploads

### Step 4: Review & Final Submission

**Purpose**: Allow users to review all entered information before final submission.

**Review Process**:
1. **Data Verification**: All previously entered information is displayed in organized sections
2. **Edit Capability**: Each section includes an "Edit" link to return to that step
3. **File Review**: Previously uploaded files are listed with download links
4. **Final Confirmation**: Submit button processes the complete claim

**Submission Process**:
1. **Data Validation**: Final check of all required fields
2. **File Processing**: Uploaded files are processed and stored
3. **Claim Creation**: Complete claim object is created with timestamp
4. **Storage**: Claim is added to in-memory storage array
5. **Session Cleanup**: Claim data is cleared from session (user data retained)
6. **Confirmation**: Success page displays submission details

**Post-Submission**:
- **Confirmation Page**: Displays complete claim data in JSON format
- **Navigation Options**: 
  - Return to homepage
  - File another claim (maintains login session)
- **Data Persistence**: Submitted claims stored in `app.locals.submittedClaims`

## 🔧 Comprehensive Troubleshooting

This section provides detailed solutions for common issues, advanced troubleshooting techniques, and debugging strategies for the AcmeCorp Claims Demo application.

### Common Issues & Solutions

#### **Server Startup Problems**

**Issue**: `Cannot find package 'express'` or similar module errors
- **Root Cause**: Missing or incomplete dependency installation
- **Solution Steps**:
  1. Delete `node_modules` folder: `rm -rf node_modules`
  2. Delete `package-lock.json`: `rm package-lock.json`
  3. Clear npm cache: `npm cache clean --force`
  4. Reinstall dependencies: `npm install`
  5. Verify installation: `npm list express`

**Issue**: `Port 3000 already in use`
- **Root Cause**: Another process is using port 3000
- **Solution Options**:
  1. **Kill existing process**:
     ```bash
     # Find process using port 3000
     lsof -ti:3000
     # Kill the process (replace PID with actual process ID)
     kill -9 PID
     ```
  2. **Use different port**:
     ```bash
     # Set environment variable
     export PORT=3001
     npm start
     ```
  3. **Modify .env file**:
     ```
     PORT=3001
     ```

**Issue**: `EADDRINUSE: address already in use`
- **Root Cause**: Port binding conflict
- **Solution**: Use `npx kill-port 3000` or restart terminal session

#### **Image Loading Issues**

**Issue**: Stock images from Unsplash don't appear
- **Root Cause**: Network connectivity or Unsplash service issues
- **Diagnostic Steps**:
  1. Check internet connection
  2. Test image URLs directly in browser
  3. Check browser console for CORS errors
  4. Verify firewall/proxy settings
- **Solutions**:
  1. **Network Issues**: Ensure stable internet connection
  2. **CORS Issues**: Images should load directly from Unsplash
  3. **Fallback Images**: Some images have built-in fallback URLs
  4. **Local Images**: Replace with local images in `src/public/images/`

**Issue**: Images load slowly or inconsistently
- **Root Cause**: Large image files or slow network
- **Solutions**:
  1. **Optimize Images**: Use smaller image dimensions in URLs
  2. **Lazy Loading**: Images have `loading="lazy"` attribute
  3. **Caching**: Browser should cache images after first load

#### **File Upload Issues**

**Issue**: `MulterError: Unexpected field`
- **Root Cause**: Form configuration mismatch
- **Solution**: Ensure form has correct attributes:
  ```html
  <form method="post" action="/wizard/step2" enctype="multipart/form-data">
  ```

**Issue**: `ENOENT: no such file or directory, open 'uploads'`
- **Root Cause**: Uploads directory doesn't exist
- **Solution**: The server automatically creates the directory, but you can manually create it:
  ```bash
  mkdir -p src/public/uploads
  ```

**Issue**: Files not persisting after server restart
- **Expected Behavior**: This is intentional for demo purposes
- **Production Note**: Implement persistent storage (database, cloud storage)

**Issue**: File upload fails silently
- **Diagnostic Steps**:
  1. Check browser console for JavaScript errors
  2. Verify file size limits (10MB per file)
  3. Check file type restrictions
  4. Monitor server logs for errors
- **Solutions**:
  1. **File Size**: Reduce file size or increase limits
  2. **File Type**: Use supported formats only
  3. **Server Logs**: Check terminal output for error messages

#### **Session Management Issues**

**Issue**: Login redirects back to login page
- **Root Cause**: Session not being created or expired
- **Diagnostic Steps**:
  1. Check browser cookies are enabled
  2. Verify session secret is set
  3. Check session middleware configuration
- **Solutions**:
  1. **Clear Browser Data**: Clear cookies and local storage
  2. **Session Secret**: Ensure `.env` file has `SESSION_SECRET`
  3. **Browser Settings**: Enable cookies for localhost

**Issue**: Form data lost between steps
- **Root Cause**: Session not persisting or JavaScript disabled
- **Solutions**:
  1. **Enable JavaScript**: Required for form functionality
  2. **Check Session**: Verify session is being maintained
  3. **Browser Compatibility**: Use modern browser

**Issue**: Multiple sessions interfering
- **Root Cause**: Browser storing multiple session cookies
- **Solution**: Clear all browser data or use incognito/private mode

#### **Styling and Layout Issues**

**Issue**: CSS not loading or styles appear broken
- **Root Cause**: Static file serving issues
- **Diagnostic Steps**:
  1. Check `/public/css/styles.css` URL in browser
  2. Verify file exists in correct location
  3. Check browser console for 404 errors
- **Solutions**:
  1. **File Path**: Ensure CSS file is in `src/public/css/`
  2. **Static Middleware**: Verify Express static middleware configuration
  3. **Hard Refresh**: Use Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)

**Issue**: Layout looks broken on mobile devices
- **Root Cause**: Responsive design issues
- **Solutions**:
  1. **Viewport Meta Tag**: Ensure present in layout.ejs
  2. **CSS Media Queries**: Check responsive breakpoints
  3. **Browser Testing**: Test on actual mobile devices

**Issue**: Images not responsive
- **Root Cause**: CSS image sizing issues
- **Solution**: Images should have `width: 100%` and `height: auto`

#### **Template Engine Issues**

**Issue**: EJS template errors or syntax issues
- **Common Causes**:
  1. Incorrect EJS syntax
  2. Missing template files
  3. Variable scope issues
- **Solutions**:
  1. **Syntax Check**: Verify `<% %>` tags are properly closed
  2. **File Paths**: Check template file locations
  3. **Variable Access**: Ensure variables are passed to templates

**Issue**: Layout not rendering properly
- **Root Cause**: Express-ejs-layouts configuration
- **Solution**: Verify layout configuration in server.js:
  ```javascript
  app.use(expressLayouts);
  app.set('layout', 'layout');
  ```

### Advanced Troubleshooting

#### **Performance Issues**

**Issue**: Slow page loading
- **Diagnostic Steps**:
  1. Check network tab in browser dev tools
  2. Monitor server response times
  3. Check for memory leaks
- **Solutions**:
  1. **Image Optimization**: Use smaller image dimensions
  2. **Caching**: Implement browser caching headers
  3. **Code Optimization**: Profile server performance

**Issue**: High memory usage
- **Root Cause**: File uploads accumulating in memory
- **Solution**: Implement file cleanup mechanisms

#### **Development Environment Issues**

**Issue**: Hot reload not working with nodemon
- **Root Cause**: Nodemon configuration or file watching issues
- **Solutions**:
  1. **Check nodemon.json**: Verify watch configuration
  2. **File Permissions**: Ensure proper file permissions
  3. **Restart Nodemon**: Kill and restart the process

**Issue**: Environment variables not loading
- **Root Cause**: .env file not being read
- **Solution**: Install and configure dotenv package:
  ```bash
  npm install dotenv
  ```
  Add to server.js:
  ```javascript
  import dotenv from 'dotenv';
  dotenv.config();
  ```

### Browser Compatibility Issues

#### **Internet Explorer**
- **Status**: Not supported
- **Reason**: Uses modern JavaScript features
- **Alternative**: Use Chrome, Firefox, Safari, or Edge

#### **Mobile Browsers**
- **iOS Safari**: Fully supported
- **Android Chrome**: Fully supported
- **Mobile Firefox**: Fully supported
- **Issues**: Touch interactions may vary

#### **Older Browser Versions**
- **Chrome**: Version 60+ recommended
- **Firefox**: Version 55+ recommended
- **Safari**: Version 12+ recommended
- **Edge**: Version 79+ recommended

### Debugging Techniques

#### **Server-Side Debugging**
1. **Console Logging**: Add `console.log()` statements
2. **Morgan Logging**: HTTP requests are logged automatically
3. **Error Handling**: Implement try-catch blocks
4. **Debug Mode**: Use `DEBUG=* npm start` for verbose logging

#### **Client-Side Debugging**
1. **Browser Dev Tools**: Use F12 to open developer tools
2. **Console Tab**: Check for JavaScript errors
3. **Network Tab**: Monitor HTTP requests and responses
4. **Application Tab**: Check session storage and cookies

#### **Database Debugging** (When implemented)
1. **Query Logging**: Log database queries
2. **Connection Testing**: Verify database connectivity
3. **Data Validation**: Check data integrity

### Getting Help

#### **Log Files**
- **Server Logs**: Check terminal output for error messages
- **Browser Logs**: Use browser developer tools console
- **Network Logs**: Monitor network requests in browser dev tools

#### **Common Error Messages**
- **404 Not Found**: Check file paths and routes
- **500 Internal Server Error**: Check server logs for details
- **CORS Error**: Usually related to external image loading
- **Session Error**: Check session configuration and browser settings

#### **Support Resources**
- **Node.js Documentation**: [nodejs.org/docs](https://nodejs.org/docs/)
- **Express.js Guide**: [expressjs.com/guide](https://expressjs.com/guide/)
- **EJS Documentation**: [ejs.co](https://ejs.co/)
- **Browser Dev Tools**: Use F12 in any modern browser

## 🏗️ Technical Architecture

### Project Structure
```
acmecorp-claims/
├── src/
│   ├── server.js              # Main Express server configuration
│   ├── middleware/
│   │   └── upload.js          # Multer file upload configuration
│   ├── routes/
│   │   ├── index.js           # Home page and static routes
│   │   ├── auth.js            # Authentication and session management
│   │   └── wizard.js          # Multi-step claim wizard routes
│   ├── views/
│   │   ├── layout.ejs         # Main HTML layout template
│   │   ├── home.ejs           # Landing page with hero and features
│   │   ├── login.ejs          # Customer login form
│   │   ├── wizard-step1.ejs   # Initial data collection form
│   │   ├── wizard-step2.ejs   # Incident details and file upload
│   │   ├── wizard-review.ejs  # Review and confirmation page
│   │   ├── wizard-confirm.ejs # Post-submission confirmation
│   │   └── partials/
│   │       ├── header.ejs     # Site header with navigation
│   │       └── footer.ejs     # Site footer
│   └── public/
│       ├── css/
│       │   └── styles.css     # Main stylesheet with responsive design
│       ├── images/            # Static image assets
│       └── uploads/           # Temporary file upload storage
├── package.json               # Dependencies and scripts
├── nodemon.json              # Development server configuration
├── .env                      # Environment variables
└── README.md                 # This documentation file
```

### Key Technologies & Dependencies

#### **Core Framework**
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **EJS**: Embedded JavaScript templating engine
- **Express-ejs-layouts**: Template layout system

#### **Middleware & Utilities**
- **Express-session**: Session management and persistence
- **Body-parser**: HTTP request body parsing
- **Multer**: Multipart form data handling for file uploads
- **Morgan**: HTTP request logging middleware

#### **Development Tools**
- **Nodemon**: Development server with auto-restart
- **ES Modules**: Modern JavaScript module system

### Data Flow Architecture

#### **Request Processing Flow**
1. **HTTP Request**: Client sends request to Express server
2. **Middleware Chain**: Request passes through middleware stack
3. **Route Matching**: Express router matches URL to handler
4. **Controller Logic**: Route handler processes request
5. **Template Rendering**: EJS renders response template
6. **HTTP Response**: Server sends rendered HTML to client

#### **Session Management Flow**
1. **Login Request**: User submits credentials
2. **Session Creation**: Express-session creates session cookie
3. **Data Storage**: User and claim data stored in session
4. **Request Processing**: Each request validates session
5. **Data Persistence**: Session data maintained across requests
6. **Session Cleanup**: Data cleared on logout or expiration

#### **File Upload Flow**
1. **Form Submission**: User submits multipart form with files
2. **Multer Processing**: Files processed and stored temporarily
3. **Metadata Extraction**: File information stored in session
4. **Path Generation**: Unique file paths created with timestamps
5. **Storage**: Files saved to `src/public/uploads/` directory
6. **Cleanup**: Files removed on server restart (demo behavior)

### Security Considerations

#### **Current Security Measures**
- **File Type Validation**: Only allowed file types accepted
- **File Size Limits**: Prevents oversized uploads
- **Session Management**: Secure session handling
- **Input Sanitization**: Basic form validation

#### **Production Security Requirements**
- **Authentication**: Implement proper user authentication
- **Authorization**: Role-based access control
- **Input Validation**: Comprehensive input sanitization
- **File Security**: Virus scanning and secure storage
- **HTTPS**: SSL/TLS encryption for all communications
- **CSRF Protection**: Cross-site request forgery prevention
- **Rate Limiting**: Prevent abuse and DoS attacks

### Performance Optimization

#### **Current Optimizations**
- **Static File Serving**: Efficient static asset delivery
- **Template Caching**: EJS template compilation caching
- **Image Optimization**: Responsive image sizing
- **Lazy Loading**: Deferred image loading

#### **Recommended Enhancements**
- **CDN Integration**: Content delivery network for static assets
- **Database Connection Pooling**: Efficient database connections
- **Redis Caching**: Session and data caching
- **Compression**: Gzip compression for responses
- **Image Compression**: Automatic image optimization

## 🛠️ Development Guide

### Setting Up Development Environment

#### **Prerequisites**
- Node.js 14.0+ installed
- npm or yarn package manager
- Git version control
- Modern code editor (VS Code recommended)

#### **Development Setup**
1. **Clone Repository**:
   ```bash
   git clone <repository-url>
   cd acmecorp-claims
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Environment Configuration**:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start Development Server**:
   ```bash
   npm run dev
   ```

### Code Organization

#### **File Naming Conventions**
- **Routes**: `kebab-case.js` (e.g., `user-profile.js`)
- **Views**: `kebab-case.ejs` (e.g., `wizard-step1.ejs`)
- **CSS**: `kebab-case.css` (e.g., `main-styles.css`)
- **JavaScript**: `camelCase.js` (e.g., `uploadHandler.js`)

#### **Code Style Guidelines**
- **Indentation**: 2 spaces for consistency
- **Quotes**: Single quotes for strings
- **Semicolons**: Always use semicolons
- **Comments**: JSDoc style for functions
- **Variables**: Descriptive, meaningful names

### Adding New Features

#### **Adding New Routes**
1. Create route file in `src/routes/`
2. Import and mount in `src/server.js`
3. Add corresponding view templates
4. Update navigation if needed

#### **Adding New Form Steps**
1. Create new EJS template
2. Add route handlers for GET and POST
3. Update progress bar logic
4. Add form validation
5. Update session data structure

#### **Styling Guidelines**
- Use CSS custom properties for theming
- Follow mobile-first responsive design
- Maintain consistent spacing and typography
- Test across different browsers

### Testing Strategy

#### **Manual Testing Checklist**
- [ ] Homepage loads correctly
- [ ] Login process works
- [ ] All wizard steps function properly
- [ ] File uploads work correctly
- [ ] Form validation prevents invalid submissions
- [ ] Responsive design works on mobile
- [ ] Session persistence across steps
- [ ] Error handling displays appropriate messages

#### **Browser Testing**
- **Desktop**: Chrome, Firefox, Safari, Edge
- **Mobile**: iOS Safari, Android Chrome
- **Tablet**: iPad Safari, Android Chrome

#### **Performance Testing**
- **Page Load Times**: < 3 seconds
- **File Upload**: Handle files up to 10MB
- **Concurrent Users**: Test with multiple sessions
- **Memory Usage**: Monitor for leaks

## 🎨 Customization Options

### Visual Customization

#### **Color Scheme**
Modify CSS custom properties in `styles.css`:
```css
:root {
  --bg: #0b0f14;           /* Background color */
  --surface: #121826;      /* Card/surface color */
  --text: #e6edf3;         /* Text color */
  --primary: #5ec4ff;      /* Primary accent color */
  --accent: #7ee6b8;       /* Secondary accent color */
}
```

#### **Typography**
- **Font Family**: Change `font-family` in body selector
- **Font Sizes**: Adjust heading and text sizes
- **Font Weights**: Modify font-weight properties

#### **Layout Modifications**
- **Container Width**: Change `max-width` in `.container`
- **Grid Layouts**: Modify grid-template-columns
- **Spacing**: Adjust padding and margin values

### Functional Customization

#### **Adding New Incident Types**
1. Update select options in `wizard-step2.ejs`
2. Add validation logic in route handler
3. Update review page display
4. Modify confirmation page output

#### **File Upload Modifications**
1. **File Types**: Modify `accept` attribute in file input
2. **File Size**: Adjust limits in multer configuration
3. **Storage Location**: Change upload directory path
4. **File Processing**: Add image resizing or compression

#### **Form Field Changes**
1. **Add Fields**: Update EJS templates and route handlers
2. **Validation**: Add client and server-side validation
3. **Conditional Logic**: Show/hide fields based on selections
4. **Data Structure**: Update session data schema

### Brand Customization

#### **Company Information**
- **Company Name**: Update throughout templates
- **Logo**: Replace with company logo
- **Contact Information**: Update footer and contact details
- **Color Scheme**: Match company brand colors

#### **Content Updates**
- **Marketing Copy**: Update hero text and feature descriptions
- **Help Text**: Modify form hints and instructions
- **Error Messages**: Customize error messaging
- **Success Messages**: Update confirmation text

## 📊 Performance Optimization

### Current Performance Features

#### **Frontend Optimizations**
- **Lazy Loading**: Images load only when needed
- **CSS Minification**: Compressed stylesheet
- **Responsive Images**: Appropriate sizing for different devices
- **Efficient Selectors**: Optimized CSS selectors

#### **Backend Optimizations**
- **Static File Serving**: Efficient asset delivery
- **Template Caching**: Compiled EJS templates
- **Session Management**: In-memory session storage
- **Request Logging**: Morgan middleware for monitoring

### Recommended Performance Improvements

#### **Database Integration**
- **Connection Pooling**: Efficient database connections
- **Query Optimization**: Indexed database queries
- **Data Caching**: Redis for session and data caching
- **Background Processing**: Async file processing

#### **CDN and Caching**
- **Content Delivery Network**: Global asset distribution
- **Browser Caching**: Appropriate cache headers
- **Image Optimization**: Automatic image compression
- **Static Asset Versioning**: Cache busting for updates

#### **Code Optimization**
- **Bundle Optimization**: Webpack or similar bundler
- **Tree Shaking**: Remove unused code
- **Code Splitting**: Load only necessary JavaScript
- **Minification**: Compress JavaScript and CSS

## 🚀 Deployment Instructions

### Production Deployment

#### **Environment Setup**
1. **Server Requirements**:
   - Node.js 14.0+ installed
   - PM2 process manager
   - Nginx reverse proxy
   - SSL certificate

2. **Environment Variables**:
   ```bash
   NODE_ENV=production
   PORT=3000
   SESSION_SECRET=your-secure-secret-key
   ```

#### **Deployment Steps**
1. **Code Deployment**:
   ```bash
   git clone <repository-url>
   cd acmecorp-claims
   npm install --production
   ```

2. **Process Management**:
   ```bash
   npm install -g pm2
   pm2 start src/server.js --name "acmecorp-claims"
   pm2 startup
   pm2 save
   ```

3. **Nginx Configuration**:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }
   }
   ```

#### **Security Hardening**
- **Firewall Configuration**: Restrict access to necessary ports
- **SSL/TLS**: Enable HTTPS with valid certificate
- **File Permissions**: Secure file and directory permissions
- **Regular Updates**: Keep dependencies updated

### Docker Deployment

#### **Dockerfile**
```dockerfile
FROM node:14-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

#### **Docker Compose**
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - SESSION_SECRET=your-secret
```

## 📚 API Documentation

### Route Endpoints

#### **Authentication Routes**
- `GET /login` - Display login form
- `POST /login` - Process login credentials
- `POST /logout` - Destroy user session

#### **Wizard Routes**
- `GET /wizard/step1` - Initial data collection form
- `POST /wizard/step1` - Process initial data
- `GET /wizard/step2` - Incident details form
- `POST /wizard/step2` - Process incident data and files
- `GET /wizard/review` - Review submission page
- `POST /wizard/submit` - Final claim submission

#### **Static Routes**
- `GET /` - Homepage
- `GET /public/*` - Static file serving

### Data Structures

#### **Session Data**
```javascript
req.session = {
  user: {
    username: "string"
  },
  claim: {
    initial: {
      policyNumber: "string",
      fullName: "string",
      email: "string",
      phone: "string"
    },
    details: {
      incidentType: "car|boat|other",
      incidentDate: "YYYY-MM-DD",
      incidentTime: "HH:MM",
      description: "string",
      uploads: [{
        filename: "string",
        originalname: "string",
        path: "string",
        size: "number",
        mimetype: "string"
      }]
    }
  }
}
```

#### **Submitted Claims**
```javascript
app.locals.submittedClaims = [{
  initial: { /* initial data */ },
  details: { /* incident details */ },
  submittedAt: "ISO timestamp"
}]
```

### Error Handling

#### **Common Error Responses**
- `400 Bad Request` - Invalid form data
- `404 Not Found` - Route not found
- `500 Internal Server Error` - Server error

#### **Error Logging**
- All errors logged to console
- Morgan middleware logs HTTP requests
- File upload errors logged with details

## 🤝 Contributing Guidelines

### Development Workflow

#### **Getting Started**
1. Fork the repository
2. Create feature branch: `git checkout -b feature/new-feature`
3. Make changes and test thoroughly
4. Commit changes: `git commit -m "Add new feature"`
5. Push to branch: `git push origin feature/new-feature`
6. Create pull request

#### **Code Standards**
- **ESLint**: Follow JavaScript style guidelines
- **Prettier**: Consistent code formatting
- **Testing**: Include tests for new features
- **Documentation**: Update README for significant changes

### Feature Development

#### **Adding New Features**
1. **Planning**: Document feature requirements
2. **Implementation**: Follow existing code patterns
3. **Testing**: Manual and automated testing
4. **Documentation**: Update relevant documentation
5. **Review**: Code review process

#### **Bug Fixes**
1. **Reproduction**: Document steps to reproduce
2. **Fix**: Implement minimal fix
3. **Testing**: Verify fix resolves issue
4. **Regression**: Ensure no new issues introduced

### Code Review Process

#### **Review Checklist**
- [ ] Code follows style guidelines
- [ ] Functionality works as expected
- [ ] No security vulnerabilities
- [ ] Performance impact considered
- [ ] Documentation updated
- [ ] Tests pass

#### **Review Criteria**
- **Functionality**: Feature works correctly
- **Security**: No security issues introduced
- **Performance**: No performance degradation
- **Maintainability**: Code is readable and maintainable
- **Testing**: Adequate test coverage

## 📄 License & Legal

### Demo Application Notice
This application is created for demonstration purposes only. It is not intended for production use without significant modifications and security enhancements.

### Production Considerations
For production deployment, consider implementing:
- **Authentication System**: Proper user authentication and authorization
- **Database Integration**: Persistent data storage
- **Security Measures**: Input validation, CSRF protection, rate limiting
- **Monitoring**: Application performance monitoring
- **Backup Systems**: Data backup and recovery procedures
- **Compliance**: Industry-specific compliance requirements

### Support & Maintenance
- **Regular Updates**: Keep dependencies updated
- **Security Patches**: Apply security updates promptly
- **Monitoring**: Monitor application performance and errors
- **Backup**: Regular data backups
- **Documentation**: Keep documentation current

---

**AcmeCorp Claims Demo** - A comprehensive demonstration of modern web application development practices for insurance claim processing.

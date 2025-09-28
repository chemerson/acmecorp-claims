import express from 'express';
import path from 'path';
import session from 'express-session';
import bodyParser from 'body-parser';
import expressLayouts from 'express-ejs-layouts';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import indexRouter from './routes/index.js';
import authRouter from './routes/auth.js';
import wizardRouter from './routes/wizard.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Config
const PORT = process.env.PORT || 3000;
const SESSION_SECRET = process.env.SESSION_SECRET || 'devsecret';

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layout');

// Logging
app.use(morgan('dev'));

// Static assets
app.use('/public', express.static(path.join(__dirname, 'public')));

// Body parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Session
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 },
  })
);

// (Upload configured in middleware/upload.js)

// Make session data accessible to views
app.use((req, res, next) => {
  res.locals.session = req.session;
  res.locals.req = req;
  next();
});

// Routers
app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/wizard', wizardRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).render('home', { title: 'Not Found' });
});

// Start server
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`AcmeCorp demo listening on http://localhost:${PORT}`);
});



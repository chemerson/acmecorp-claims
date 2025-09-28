import { Router } from 'express';
import upload from '../middleware/upload.js';

const router = Router();

function requireLogin(req, res, next) {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  next();
}

router.get('/step1', requireLogin, (req, res) => {
  res.render('wizard-step1', {
    title: 'Claim - Initial Details',
    data: req.session.claim || {},
  });
});

router.post('/step1', requireLogin, (req, res) => {
  const { policyNumber, fullName, email, phone } = req.body;
  req.session.claim = {
    ...req.session.claim,
    initial: { policyNumber, fullName, email, phone },
  };
  res.redirect('/wizard/step2');
});

router.get('/step2', requireLogin, (req, res) => {
  res.render('wizard-step2', {
    title: 'Claim - Incident Details',
    data: req.session.claim || {},
  });
});

router.post(
  '/step2',
  requireLogin,
  upload.array('evidenceFiles', 10),
  (req, res) => {
    const { incidentType, incidentDate, incidentTime, description } = req.body;
    const uploaded = (req.files || []).map((f) => ({
      filename: f.filename,
      originalname: f.originalname,
      path: `/public/uploads/${f.filename}`,
      size: f.size,
      mimetype: f.mimetype,
    }));

    const existingUploads = (req.session.claim?.details?.uploads) || [];

    req.session.claim = {
      ...req.session.claim,
      details: {
        incidentType,
        incidentDate,
        incidentTime,
        description,
        uploads: [...existingUploads, ...uploaded],
      },
    };
    res.redirect('/wizard/review');
  }
);

router.get('/review', requireLogin, (req, res) => {
  res.render('wizard-review', {
    title: 'Review Your Claim',
    data: req.session.claim || {},
  });
});

router.post('/submit', requireLogin, (req, res) => {
  const submittedAt = new Date().toISOString();
  const claim = { ...req.session.claim, submittedAt };
  // For demo: push into a transient in-memory list on app instance
  req.app.locals.submittedClaims = req.app.locals.submittedClaims || [];
  req.app.locals.submittedClaims.push(claim);

  // Clear session claim data but retain user for convenience
  req.session.claim = {};
  res.render('wizard-confirm', {
    title: 'Claim Submitted',
    claim,
  });
});

export default router;



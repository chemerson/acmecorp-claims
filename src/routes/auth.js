import { Router } from 'express';

const router = Router();

router.get('/login', (req, res) => {
  res.render('login', { title: 'Customer Login' });
});

router.post('/login', (req, res) => {
  const { username } = req.body;
  // Minimal demo session init
  req.session.user = { username: username || 'guest' };
  req.session.claim = req.session.claim || {};
  res.redirect('/wizard/step1');
});

router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

export default router;



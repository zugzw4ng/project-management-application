const router = require('express').Router();
const userRoutes = require('./userRoutes');
const projectRoutes = require('./projectRoutes');
const dashboardRoutes = require('./dashboardRoutes');

router.use('/users', userRoutes);
router.use('/profile', projectRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;
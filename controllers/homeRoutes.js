const router = require('express').Router();
const { Project, User, Task, ProjectUser } = require('../models');
// const withAuth = require('../utils/auth');

// renders homepage(login page) upon start of application
router.get('/', async (req, res) => {
  if (req.session.logged_in) {
    console.log(req.session);
    res.redirect(`/profile`);
    return;
  }
  res.render('homepage', {
    logged_in: req.session.logged_in
  });
});
// renders all projects under logged in user
router.get(`/profile`, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      include: [
        {
          model: Project, as: 'user_projects', through: ProjectUser
        },
      ],
    });
    if (!userData) { // do we need this?
      res.status(404).json({ message: 'No user found with that id!' });
      return;
    }
    console.log(userData);
    const user = userData.get({ plain: true });
    console.log(user);
    res.render('profile', {
      user,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// get one project by id > goes to dashboard.handlebars
router.get('/dashboard/:id', async (req, res) => {
  try {
    const projectData = await Project.findByPk(req.params.id, {
      include: [
        {
          model: User, as: 'group_members', through: ProjectUser
        },
      ],
    });
    const project = projectData.get({ plain: true });
    console.log(project);
    res.render('dashboard', {
      project,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
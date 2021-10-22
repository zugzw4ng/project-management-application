const router = require('express').Router();
const { Project, User, Task, ProjectUser } = require('../models');

// renders homepage(login page) upon start of application
router.get('/', async (req, res) => {
  if (req.session.logged_in) {
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
    const user = userData.get({ plain: true });
    res.render('profile', {
      user,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// render single project by id
router.get('/dashboard/:id', async (req, res) => {
  try {
    const projectData = await Project.findByPk(req.params.id, {
      include: [
        {
          model: User, as: 'group_members', through: ProjectUser
        },
        {
          model: Task, attributes: [
            "id", "title", "description", "status", "project_id" // !! do i need this??
          ]
        },
      ],
    });
    const project = projectData.get({ plain: true });
    res.render('dashboard', {
      project,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/about", (req, res) => {
  res.render('about');
});

module.exports = router;
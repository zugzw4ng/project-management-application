const router = require('express').Router();
const { Project, User, ProjectUser } = require('../../models');
// create a new project
router.post('/', async (req, res) => {
  try {
    const newProject = await Project.create({
      name: req.body.projectName,
      deadline: req.body.projectDeadline,
      status: req.body.projectStatus,
    });
    const projectUserData = await ProjectUser.create({
      user_id: req.session.user_id,
      project_id: newProject.id
    });
    res.status(200).json(projectUserData);
  } catch (err) {
    res.status(400).json(err);
  }
});
// delete a project
router.delete('/:id', async (req, res) => {
  try {
    const projectData = await Project.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!projectData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }
    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
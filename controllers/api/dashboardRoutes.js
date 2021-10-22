const router = require('express').Router();
const { Project, User, ProjectUser, Task } = require('../../models');
// create a new task
router.post('/', async (req, res) => {
    try {
        // const projectData = await Project.findByPk(req.params.id);
        const newTask = await Task.create({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            user_id: req.session.user_id,
            project_id: req.params.id,
            // or can i just put req.params.id here?
        });
        console.log(newTask);
        res.status(200).json(newTask);
    } catch (err) {
        res.status(400).json(err);
    }
})

module.exports = router;
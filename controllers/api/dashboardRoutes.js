const router = require('express').Router();
<<<<<<< HEAD
const { Project, User, ProjectUser, Task } = require('../../models');

=======
const { Project, Task } = require('../../models');
>>>>>>> 997d75732d95d36c69aa0507aea6b9ccc1cccacc
// create a new task
router.post('/', async (req, res) => {
    try {
        const newTask = await Task.create({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            user_id: req.session.user_id,
            project_id: req.body.project_id,
        });
        res.status(200).json(newTask);
    } catch (err) {
        res.status(400).json(err);
    }
});
// delete a task
router.delete('/:id', async (req, res) => {
    try {
        const taskData = await Task.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (!taskData) {
            res.status(404).json({ message: 'No task found with this id!' });
            return;
        }
        res.status(200).json(taskData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
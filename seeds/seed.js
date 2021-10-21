const sequelize = require('../config/connection');
const { User, Project, Task, ProjectUser } = require('../models');

const userSeedData = require('./userSeedData.json');
const projectSeedData = require('./projectSeedData.json');
const taskSeedData = require('./taskSeedData.json')

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userSeedData, {
        individualHooks: true,
        returning: true,
    });
    // const tasks = await Task.bulkCreate(taskSeedData);
    const projects = await Project.bulkCreate(projectSeedData)

    // randomly deals out tasks to projects
    for (const task of taskSeedData) {
        const newTask = await Task.create({
            ...task,
            project_id: projects[Math.floor(Math.random() * projects.length)].id,
        });
    }

    // create ProjectUser info at random
    for (let i = 0; i < 10; i++) {
        // random user id
        const { id: randomUserId } = users[
            Math.floor(Math.random() * users.length)
        ];
        // random project id 
        const { id: randomProjectId } = projects[
            Math.floor(Math.random() * projects.length)
        ];
        await ProjectUser.create({
            user_id: randomUserId,
            project_id: randomProjectId
        }).catch((err) => {
            console.log(err);
        });
    }
    process.exit(0);
};

seedDatabase();

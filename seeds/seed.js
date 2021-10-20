const sequelize = require('../config/connection');
const { User, Project, Task } = require('../models');

const userSeedData = require('./userSeedData.json');
const projectSeedData = require('./projectSeedData.json');
const taskSeedData = require('./taskSeedData.json')

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userSeedData, {
        individualHooks: true,
        returning: true,
    });

    for (const project of projectSeedData) {
        await Project.create({
            ...project,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }

    process.exit(0);
};

seedDatabase();

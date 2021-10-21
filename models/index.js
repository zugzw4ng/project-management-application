const User = require("./User");
const Project = require("./Project");
const Task = require("./Task");
const ProjectUser = require("./ProjectUser")

User.belongsToMany(Project, {
    through: {
        model: ProjectUser,
        unique: false
    },
    as: "user_projects"
});

Project.belongsToMany(User, {
    through: {
        model: ProjectUser,
        unique: false
    },
    as: "group_members"
});

Project.hasMany(Task, {
    foreignKey: 'project_id'
});

Task.belongsTo(Project, {
    foreignKey: 'project_id'
});

module.exports = { User, Project, Task, ProjectUser };
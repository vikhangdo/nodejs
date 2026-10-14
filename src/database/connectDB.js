import { Sequelize } from 'sequelize';
const sequelize = new Sequelize('nodejs', 'root', null, {
    host: 'localhost',
    dialect: 'mysql'
});


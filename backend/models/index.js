
//importing modules
import { Sequelize, DataTypes } from 'sequelize';
import userModel from './userModel.js'; // Adjust import for your model
import blacklistedTokenModel from './blacklistedToken.js';

//Database connection with dialect of postgres specifying the database we are using
//port for my database is 5433
//database name is discover
// const sequelize = new Sequelize(`postgres://postgres:1234@localhost:5432/postgres`, { dialect: "postgres" })
const sequelize = new Sequelize('postgres', 'postgres', '1234', {
    host: 'db',
    port: 5432,
    dialect: 'postgres',
    logging: false
});
//checking if connection is done
sequelize.authenticate().then(() => {
    console.log(`Database connected to discover`)
}).catch((err) => {
    console.log(err)
})

// Initialize models
const db = {
    Sequelize,
    sequelize,
    users: userModel(sequelize, DataTypes),
    blacklistedTokens: blacklistedTokenModel(sequelize, DataTypes)
};

export default db;

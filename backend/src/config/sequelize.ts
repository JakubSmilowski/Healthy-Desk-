import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
{
    dialect: 'postgres',
    logging: console.log,
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT || '5432', 10),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
});

sequelize.sync({ force: false }).then(() => {
    console.log('Database & tables created!');
});

export default sequelize;
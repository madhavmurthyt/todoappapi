module.exports = {
    development: {
        dialect: 'postgres',
        url: 'postgresql://postgres:root@localhost:5432/todo',
    },
    production: {
        dialect: 'postgres',
        url: process.env.DATABASE_URL,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
    },
};

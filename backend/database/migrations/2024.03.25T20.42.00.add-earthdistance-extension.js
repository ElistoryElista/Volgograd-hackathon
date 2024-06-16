module.exports = {
    async up(knex) {
        // You have full access to the Knex.js API with an already initialized connection to the database
        await knex.raw('create extension if not exists cube;');
        await knex.raw('create extension if not exists earthdistance;');
    },
}


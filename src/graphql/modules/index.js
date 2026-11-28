const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const resolvers = require('./Usuario/resolvers');

const typeDefs = ['Usuario', 'Perfil'].map(modulo =>
    readFileSync(join(__dirname, modulo, 'schema.gql'), 'utf8')
);

module.exports = { typeDefs, resolvers };

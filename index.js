const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const typeDefs = `#graphql
    type Query {
        hello: String!
    }
`;

const resolvers = {
    Query: {
        hello: () => "Hello World",
    },
};

async function startServer() {
    const server = new ApolloServer({ typeDefs, resolvers });
    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
    });

    console.log(`Servidor pronto em ${url}`);
}

startServer().catch((error) => {
    console.error("Falha ao iniciar o servidor:", error);
    process.exitCode = 1;
});
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const db = [
    {
        id: 1,
        nome: "Paulo",
        email: "paulo@email.com",
        telefone_fixo: "11 1234 1234"
    },
    {
        id: 2,
        nome: "Lucas",
        email: "lucas@email.com",
        telefone_fixo: "34 1234 1234"
    },
]

const typeDefs = `#graphql

    type Usuario {
        id: Int
        nome: String
        email: String
        telefone: String
    }

    type Query {
        usuario(id: ID): Usuario
    }
`;

const resolvers = {
    Usuario: {
        telefone(obj) {
            return obj.telefone_fixo
        }
    },
    Query: {
        usuario(_obj, { id }) {
            if (!id) {
                return db[0];
            }

            return db.find(usuario => usuario.id === Number(id)) ?? null;
        },
    }
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
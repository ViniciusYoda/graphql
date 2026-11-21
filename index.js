const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const produtos = [
    {
        id: 1,
        nome: 'Notebbok',
        valor: 12000.00
    },
    {
        id: 2,
        nome: 'TV',
        valor: 5000.00
    },
    {
        id: 3,
        nome: 'Geladeira',
        valor: 8000.00
    },
]

const usuarios = [
    {
        id: 1,
        nome: 'Paulo',
        salario: 12234.54,
        ativo: true,
        idade: 23
    },
    {
        id: 2,
        nome: 'Laura',
        salario: 3500.50,
        ativo: false,
        idade: 34
    },
    {
        id: 3,
        nome: 'Mario',
        salario: 5600.70,
        ativo: true,
        idade: 29
    },
]


const typeDefs = `#graphql

    type Produto {
        id: ID
        nome: String
        valor: Float
    }

    type Usuario {
        idade: Int
        salario: Float
        nome: String
        ativo: Boolean
        id: ID
    }

    type Query {
        usuarios: [Usuario]
        produtos: [Produto]
    }
`;

const resolvers = {
    Query: {
        usuarios() {
            return usuarios
        },
        produtos() {
            return produtos
        }
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
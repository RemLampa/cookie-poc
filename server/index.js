const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const cors = require("cors");

const typeDefs = gql`
  type Query {
    hello: String
    user: User
  }

  type User {
    id: ID
    name: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello world!",
    user: () => ({ id: 1, name: "John Doe" }),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const corsOptions = {};

const app = express();
app.use((req, res, next) => {
  console.log(new Date().toISOString());

  console.log("Request headers: ", req.headers);
  console.log("Request cookies: ", req.headers.cookie);
  console.log("Request origin: ", req.headers.origin);
  console.log("Request referer: ", req.headers.referer);

  next();
});

app.use(cors(corsOptions));

app.options("/graphql", cors(corsOptions));

server.applyMiddleware({
  app,
  cors: corsOptions,
});

app.listen({ port: 5000 }, () =>
  console.log(`🚀 Server ready at http://localhost:5000${server.graphqlPath}`)
);

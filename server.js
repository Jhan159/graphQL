
const {ApolloServer, gql} = require("apollo-server"); // 아폴로 서버 설정
const test = require('./test')

// import ApolloServer from "apollo-server";
// import * as test from "./test.js";

// Query type 등록
const typeDefs = [
    test.typeDefs
]

const resolvers = [
    test.resolvers
]

const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true
});

// url
server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});



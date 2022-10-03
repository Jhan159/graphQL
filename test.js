// import gql from 'graphql-tag';
// import fetch from 'node-fetch';
const {ApolloServer, gql} = require("apollo-server");
const fetch = require('node-fetch');

const typeDefs = gql`
    type User {
        id: ID!
        username: String!
        mail: String
    }
    type Tweet {
        id: ID!
        text: String!
        author: User
    }
    type Movie {
        id: Int!
        url: String!
        imdb_code: String!
        title: String!
        title_english: String!
        title_long: String!
        slug: String!
        year: Int!
        rating: Float!
        runtime: Float!
        genres: [String]!
        summary: String
        description_full: String!
        synopsis: String
        yt_trailer_code: String!
        language: String!
        background_image: String!
        background_image_original: String!
        small_cover_image: String!
        medium_cover_image: String!
        large_cover_image: String!
    }
    type Query {
        allMovies: [Movie!]!
        allTweets: [Tweet!]!
        tweet(id:ID!): Tweet
        allUsers: [User!]!
        movie(id:String!): Movie
    }
    type Mutation {
        """
        insert tweet
        """
        postTweet(text:String!, userId: ID!): Tweet
        """
        delete tweet
        """
        deleteTweet(id: ID!): Boolean!
    }
`

const resolvers = {
    Query: {
        allTweets(){
            return tweets;
        },
        tweet(root, { id }){
            return tweets.find((tweet) => tweet.id === id);
        },
        allUsers(){
            return users;
        },
        allMovies(){
            return fetch("https://yts.mx/api/v2/list_movies.json")
                .then((m) => m.json())
                .then(json => json.data.movies);
        },
        movie(_, {id}){
            return fetch("https://yts.mx/api/v2/movie_details.json?movie_id=" + id)
                .then((m) => m.json())
                .then(json => json.data.movie);
        }
    },
    Mutation: {
        postTweet(_, { text, userId }){
            const newTweet = {
                id: tweets.length + 1,
                text
            }
            tweets.push(newTweet);
            return newTweet;
        },
        deleteTweet(_, { id }){
            const tweet = tweets.find((tweet) => tweet.id === id);
            if(!tweet) return false;
            tweets = tweets.filter(tweet => tweet.id !== id);
            return true;
        }
    },
    User: {
        mail(root) {
            return root.username + "@google.com";
        }
    },
    Tweet: {
        author({userId}){
            return users.find((user) => user.id === userId);
        }
    }
}

// module.exports = typeDefs
module.exports = {
    typeDefs: typeDefs,
    resolvers: resolvers
}

// export {
//     typeDefs,
//     resolvers
// }

/////////////////////////////////////////////////////////////////////////////////
// IN MEMORY DB
let tweets = [
    {
        id: "1",
        text: "first",
        userId: "1"
    },
    {
        id: "2",
        text: "second",
        userId: "2"
    }
]

let users = [
    {
        id: "1",
        username: "J"
    },
    {
        id: "2",
        username: "jjh"
    },
    {
        id: "3",
        username: "han"
    }
]
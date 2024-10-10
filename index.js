import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import { typeDefs } from './schema.js'; 

// import db
import { games, reviews, authors } from './_db.js';

// // A schema is a collection of type definitions (hence "typeDefs")
// // that together define the "shape" of queries that are executed against
// // your data.
// const typeDefs = `#graphql
//   # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

//   # This "Book" type defines the queryable fields for every book in our data source.
//   type Book {
//     title: String
//     author: String
//   }

//   # The "Query" type is special: it lists all of the available queries that
//   # clients can execute, along with the return type for each. In this
//   # case, the "books" query returns an array of zero or more Books (defined above).
//   type Query {
//     books: [Book]
//   }
// `;

const resolvers = {
    Query: {
        games: () => games,
        reviews: () => reviews,
        authors: () => authors,
        review(_,args) {
            return reviews.find(review => review.id === args.id);
        },
        reviewByRating(_,args) {
            return reviews.filter(review => review.rating === args.rating);
        },
        game(_,args) {
            return games.find(game => game.id === args.id);
        },
        author(_,args) {
            return authors.find(author => author.id === args.id);
        },

    },

    Game: {
        reviews(parent) {
            return reviews.filter(review => review.game_id === parent.id);
        }
    },
    Author: {
        reviews(parent) {
            return reviews.filter(review => review.author_id === parent.id);
        }
    },
    Review: {
        game(parent) {
            return games.find(game => game.id === parent.game_id);
        },
        author(parent) {
            return authors.find(author => author.id === parent.author_id);
        }
    },

    Mutation: {
        deleteGame(_,args) {
            const index = games.findIndex(game => game.id === args.id);
            if(index === -1) {
                return games;
            }
            games.splice(index,1);
            return games;
        },

        addGame(_,args) {
            const newGame = {
                id: Math.floor(Math.random() * 1000).toString(),
                title: args.game.title,
                platform: args.game.platform
            }
            games.push(newGame);
            return newGame;
        },

        updateGame(_,args) {
            const index = games.findIndex(game => game.id === args.id);
            if(index === -1) {
                return null;
            }
            games[index] = {
                id: args.id,
                title: args.edits.title || games[index].title,
                platform: args.edits.platform || games[index].platform
            }
            return games[index];
        }
    }


};


const server = new ApolloServer({
    typeDefs,
    resolvers
})

const url = await startStandaloneServer(server,{listen : {port : 4000}})

console.log(`🚀 Server ready at ${url} and port: 4000`);
export const typeDefs = `#graphql
type Game {
    id: ID!
    title: String!
    platform: [String!]!
    reviews: [Review!]
    }

type Review {
    id: ID!
    rating: Int!
    content: String!
    game: Game!
    author: Author!
    }
type Author {
    id: ID!
    name: String!
    verified: Boolean!
    reviews: [Review!]
    }

type Query {
    games: [Game]
    game(id: ID!): Game
    reviews: [Review]
    review(id: ID!): Review
    reviewByRating(rating : Int!): [Review]
    authors: [Author]
    author(id: ID!): Author

    }

type Mutation {
    addGame(game: AddInputGame): Game
    deleteGame(id: ID!): [Game]
    updateGame(id: ID!, edits: EditInputGame): Game
    }

input AddInputGame {
    title: String!,
    platform: [String!]!
    }
    
input EditInputGame {
    title: String,
    platform: [String!]
    }

`;

/* @flow */
import { gql } from 'apollo-server-express';

export default gql`
  type ExchangeRate {
    _id: String!
    currency: String!
    euro: Float!
    dollar: Float!
  }

  extend type Query {
    ExchangeRate(currency: String!): ExchangeRate!
  }

  extend type Mutation {
    createExchangeRate(
      currency: String!
      euro: Float!
      dollar: Float!
    ): ExchangeRate!
    deleteExchangeRate(_id: String!): Boolean!
  }
`;

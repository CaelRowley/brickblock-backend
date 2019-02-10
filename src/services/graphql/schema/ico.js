/* @flow */
import { gql } from 'apollo-server-express';

export default gql`
  type ICO {
    _id: String!
    address: String!
    currency: String!
    value: Long!
    txid: String!
    date: Date
  }

  extend type Query {
    ICOs(cursor: Int, limit: Int): [ICO!]!
    ICO(_id: String!): ICO!
    averageValue(currency: String, exchange: String): Float!
    highestValue(currency: String, exchange: String): [ICO!]!
    mostTransactions(currency: String): JSON!
  }

  extend type Mutation {
    createICO(
      address: String!
      currency: String!
      value: Long!
      txid: String!
      date: Date!
    ): ICO!

    deleteICO(_id: String!): Boolean!
  }
`;

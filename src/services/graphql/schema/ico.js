/* @flow */
import { gql } from 'apollo-server-express';

export default gql`
  type ICO {
    _id: String!
    address: String!
    currency: String!
    value(text: Int): Int!
    txid: String!
  }

  extend type Query {
    ICOs(limit: Int): [ICO!]!
    ICO(_id: String!): ICO!
  }

  extend type Mutation {
    createICO(
      address: String!
      currency: String!
      value: Int!
      txid: String!
    ): ICO!
    deleteICO(_id: String!): Boolean!
  }
`;

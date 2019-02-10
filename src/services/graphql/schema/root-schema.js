/* @flow */
import { gql } from 'apollo-server-express';

import icoSchema from './ico';
import exchangeRateSchema from './exchange-rate';

const rootSchema = gql`
  scalar Date
  scalar Long
  scalar JSON

  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;

export default [rootSchema, icoSchema, exchangeRateSchema];

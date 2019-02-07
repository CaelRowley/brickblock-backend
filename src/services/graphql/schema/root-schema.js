/* @flow */
import { gql } from 'apollo-server-express';

import icoSchema from './ico';

const baseSchema = gql`
  scalar Date

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

export default [baseSchema, icoSchema];

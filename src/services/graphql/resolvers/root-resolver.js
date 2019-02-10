/* @flow */
import { GraphQLDateTime } from 'graphql-iso-date';
import GraphQLLong from 'graphql-type-long';
import GraphQLJSON from 'graphql-type-json';

import icoResolvers from './ico';
import exchangeRateResolvers from './exchange-rate';

const customScalarResolver = {
  Date: GraphQLDateTime,
  Long: GraphQLLong,
  JSON: GraphQLJSON,
};

export default [customScalarResolver, icoResolvers, exchangeRateResolvers];

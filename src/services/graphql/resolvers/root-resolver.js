/* @flow */
import { GraphQLDateTime } from 'graphql-iso-date';
import GraphQLLong from 'graphql-type-long';

import icoResolvers from './ico';

const customScalarResolver = {
  Date: GraphQLDateTime,
  Long: GraphQLLong,
};

export default [customScalarResolver, icoResolvers];

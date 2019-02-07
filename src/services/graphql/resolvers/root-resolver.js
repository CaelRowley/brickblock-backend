/* @flow */
import { GraphQLDateTime } from 'graphql-iso-date';

import icoResolvers from './ico';

const customScalarResolver = {
  Date: GraphQLDateTime,
};

export default [customScalarResolver, icoResolvers];

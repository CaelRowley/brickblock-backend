/* @flow weak */
import '@babel/polyfill';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import path from 'path';
import favicon from 'serve-favicon';
import DataLoader from 'dataloader';

import logger from './config/winston';
import addRouters from './routes/app-router';
import schema from './services/graphql/schema/root-schema';
import resolvers from './services/graphql/resolvers/root-resolver';
import models from './services/graphql/models/root-model';
import loaders from './services/graphql/loaders/root-loader';

const app = express();

const server = new ApolloServer({
  introspection: true,
  typeDefs: schema,
  resolvers,
  context: async () => ({
    models,
    loaders: {
      exchangeRate: new DataLoader(currencies => loaders.exchangeRate.exchangeBatchRates(currencies, models)),
    },
  }),
});

server.applyMiddleware({
  app,
  path: '/graphql',
});

addRouters(app);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
});

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

const port = process.env.PORT || 8000;
app.listen(port, () => {
  logger.debug(`Server be jammin' on http://localhost:${port}`);
});

export default app;

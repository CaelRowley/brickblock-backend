/* eslint-disable */
/* @flow weak */
import '@babel/polyfill';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import path from 'path';
import favicon from 'serve-favicon';
import DataLoader from 'dataloader';

import logger from '../config/winston';
import addRouters from '../routes/app-router';
import schema from '../services/graphql/schema/root-schema';
import resolvers from '../services/graphql/resolvers/root-resolver';
import models from '../services/graphql/models/root-model';
import loaders from '../services/graphql/loaders/root-loader';

const app = express();

const server = new ApolloServer({
  introspection: true,
  typeDefs: schema,
  resolvers,
  context: async () => ({
    models,
    loaders: {
      exchangeRate: new DataLoader((currencies) =>
        loaders.exchangeRate.exchangeBatchRates(currencies, models),
      ),
    },
  }),
});

server.applyMiddleware({
  app,
  path: '/graphql',
});

addRouters(app);

const port = process.env.PORT || 8000;

const connectDb = () =>
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
  });

connectDb().then(async () => {
  createICOs(200);
  createExchangeRates();
  app.listen(port, () => {
    logger.debug(`Server be jammin' on http://localhost:${port}/graphql`);
  });
});

const createExchangeRates = async () => {
  const exchangeRateEth = new models.exchangeRate({
    currency: 'ETH',
    euro: 104.57,
    dollar: 118.38,
  });
  await exchangeRateEth.save();

  const exchangeRateBtc = new models.exchangeRate({
    currency: 'BTC',
    euro: 3198.64,
    dollar: 3621.28,
  });
  await exchangeRateBtc.save();

  const exchangeRateLtc = new models.exchangeRate({
    currency: 'LTC',
    euro: 38.77,
    dollar: 43.89,
  });
  await exchangeRateLtc.save();
};

const createICOs = async (amount) => {
  for (let i = 0; i < amount; i++) {
    let numOfTransactions = randomNumOfTransactions();
    let ranAddress = randomChars(34);
    for (let j = 0; j < numOfTransactions; j++) {
      const ranCurrency = randomCurrency();
      const ico = new models.ico({
        address: ranAddress,
        currency: ranCurrency,
        value: randomValue(ranCurrency),
        txid: randomChars(64),
        date: randomDate(new Date(2018, 2, 2), new Date()),
      });
      await ico.save();
    }
  }
};

const randomDate = (start, end) => {
  let ranDate = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
  return ranDate;
};

const randomChars = (length) => {
  let text = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
};

const randomCurrency = () => {
  const currencies = ['ETH', 'ETH', 'ETH', 'ETH', 'BTC', 'LTC', 'BTC'];
  return currencies[Math.floor(Math.random() * Math.floor(currencies.length))];
};

const randomValue = (currency) => {
  let ranValue = 0;
  switch (currency) {
    case 'ETH':
      // const weiInEth = 1000000000000000000;
      const mweiInEth = 1000000000000;
      ranValue = Math.random() * 3.5;
      if (ranValue < 0.05) ranValue = 0.05;
      return Math.floor(ranValue * mweiInEth);
    case 'BTC':
      const satoshiInBtc = 100000000;
      ranValue = Math.random() * 0.09;
      if (ranValue < 0.0016) ranValue = 0.0016;
      return Math.floor(ranValue * satoshiInBtc);
    case 'LTC':
      const litoshiInLtc = 100000000;
      ranValue = Math.random() * 5;
      if (ranValue < 0.13) ranValue = 0.13;
      return Math.floor(ranValue * litoshiInLtc);
    default:
  }
};

const randomNumOfTransactions = () => {
  const numOfTransactions = [
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    2,
    2,
    2,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
  ];
  return numOfTransactions[
    Math.floor(Math.random() * Math.floor(numOfTransactions.length))
  ];
};

const randomICO = (address) => {
  const ranCurrency = randomCurrency();
  const ico = {
    address: address,
    currency: ranCurrency,
    value: randomValue(ranCurrency),
    txid: randomChars(64),
    date: randomDate(new Date(2018, 2, 2), new Date()),
  };
  return ico;
};

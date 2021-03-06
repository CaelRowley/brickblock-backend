/* eslint-disable */
/* @flow weak */
import '@babel/polyfill';
import mongoose from 'mongoose';
import logger from '../config/winston';
import models from '../services/graphql/models/root-model';

const connectDb = () =>
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
  });

connectDb().then(async () => {
  await createICOs(200);
  await createExchangeRates();
  logger.info('Finished generating mock data');
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

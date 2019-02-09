/* @flow weak */
/* eslint-disable
  no-underscore-dangle,
  no-param-reassign,
  array-callback-return,
  consistent-return
*/
export default {
  Query: {
    ExchangeRate: async (parent, { currency }, { models }) => {
      const exchangeRates = await models.exchangeRate.find();
      const rate = exchangeRates.filter((exchangeRate) => {
        if (exchangeRate.currency === currency) {
          exchangeRate._id = exchangeRate._id.toString();
          return exchangeRate;
        }
      });
      return rate[0];
    },
  },

  Mutation: {
    createExchangeRate: async (
      parent,
      { currency, euro, dollar },
      { models },
    ) => {
      const exchangeRate = await new models.exchangeRate({
        currency,
        euro,
        dollar,
      }).save();
      exchangeRate._id = exchangeRate._id.toString();
      return exchangeRate;
    },

    deleteExchangeRate: async (parent, { _id }, { models }) => {
      const exchangeRate = await models.exchangeRate.findById(_id);
      if (exchangeRate) {
        await exchangeRate.remove();
        return true;
      }
      return false;
    },
  },
};

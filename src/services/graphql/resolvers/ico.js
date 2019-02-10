/* @flow weak */
/* eslint-disable no-underscore-dangle, no-param-reassign, no-await-in-loop */

const smallUnitValue = {
  BTC: 100000000,
  ETH: 1000000000000,
  LTC: 100000000,
};

export default {
  Query: {
    ICOs: async (parent, { cursor, limit }, { models }) => {
      const cursorOptions = cursor
        ? {
          value: {
            $lt: cursor,
          },
        }
        : {
        };

      let icos;
      if (limit) {
        icos = await models.ico.find(cursorOptions, null, {
          sort: {
            value: -1,
          },
          limit,
        });
      } else {
        icos = await models.ico.find();
      }

      return icos.map((ico) => {
        ico._id = ico._id.toString();
        return ico;
      });
    },

    ICO: async (parent, { _id }, { models }) => models.ico.findById(_id),

    averageValue: async (
      parent,
      { currency, exchange },
      { models, loaders },
    ) => {
      let icos = await models.ico.find();
      let total = 0;
      let exchangeRate;

      if (!exchange) exchange = 'euro';

      if (currency) {
        icos = icos
          .map((ico) => {
            if (ico.currency === currency) return ico;
            return null;
          })
          .filter(ico => ico != null);
      }

      for (let i = 0; i < icos.length; i += 1) {
        const ico = icos[i];
        exchangeRate = await loaders.exchangeRate.load(ico.currency);
        total
          += (ico.value / smallUnitValue[ico.currency]) * exchangeRate[exchange];
      }
      return total / icos.length;
    },

    highestValue: async (
      parent,
      { currency, exchange },
      { models, loaders },
    ) => {
      let icos = await models.ico.find();
      let exchangeRate;
      if (!exchange) exchange = 'euro';
      if (currency) {
        icos = icos
          .map((ico) => {
            if (ico.currency === currency) return ico;
            return null;
          })
          .filter(ico => ico != null);
      }

      for (let i = 0; i < icos.length; i += 1) {
        exchangeRate = await loaders.exchangeRate.load(icos[i].currency);
        icos[i].euroValue = (icos[i].value / smallUnitValue[icos[i].currency])
          * exchangeRate[exchange];
      }

      const maxValue = Math.max(...icos.map(ico => ico.euroValue));

      return icos
        .map((ico) => {
          if (ico.euroValue === maxValue) {
            ico._id = ico._id.toString();
            return ico;
          }
          return null;
        })
        .filter(ico => ico != null);
    },

    mostTransactions: async (parent, { currency }, { models }) => {
      let icos = await models.ico.find();
      if (currency) {
        icos = icos
          .map((ico) => {
            if (ico.currency === currency) return ico;
            return null;
          })
          .filter(ico => ico != null);
      }

      const icoMap = {
      };
      let mostTransactions = icos[0].address;
      let maxCount = 1;

      for (let i = 0; i < icos.length; i += 1) {
        const currentIco = icos[i];
        if (icoMap[currentIco.address] == null) icoMap[currentIco.address] = 1;
        else icoMap[currentIco.address] += 1;

        if (icoMap[currentIco.address] > maxCount) {
          mostTransactions = currentIco.address;
          maxCount = icoMap[currentIco.address];
        }
      }

      return {
        address: mostTransactions,
        amount: maxCount,
      };
    },
  },

  Mutation: {
    createICO: async (
      parent,
      { address, currency, value, txid },
      { models },
    ) => {
      // const { address, currency, value, txid } = args;
      const ico = await new models.ico({
        address,
        currency,
        value,
        txid,
      }).save();
      ico._id = ico._id.toString();
      return ico;
    },

    deleteICO: async (parent, { _id }, { models }) => {
      const ico = await models.ico.findById(_id);
      if (ico) {
        await ico.remove();
        return true;
      }
      return false;
    },
  },
};

/* @flow weak */
/* eslint-disable no-underscore-dangle, no-param-reassign */
export default {
  Query: {
    ICOs: async (parent, { limit }, { models }) => {
      let icos;
      if (limit) {
        icos = await models.ico.find(null, null, {
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

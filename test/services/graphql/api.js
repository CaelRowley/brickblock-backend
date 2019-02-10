import axios from 'axios';

export const ICOs = async () => axios.post(process.env.TEST_API_URL, {
  query: `
    query {
      ICOs {
        _id
          address
          currency
          value
          txid
      }
    }
  `,
});

export default {
  ICOs,
};

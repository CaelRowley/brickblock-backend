export const exchangeBatchRates = async (currencies, models) => {
  const exchangeRates = await models.exchangeRate.find({
    currency: {
      $in: currencies,
    },
  });
  return exchangeRates.map(exchangeRate => exchangeRates.find(rateToFind => rateToFind === exchangeRate));
};

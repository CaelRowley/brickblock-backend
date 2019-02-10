/* eslint-disable */

const port = process.env.PORT || 8000;

const connectDb = () =>
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
  });

connectDb().then(async () => {
  createICOs(1000);
  app.listen(port, () => {
    logger.debug(`Server be jammin' on http://localhost:${port}`);
  });
});

const createICOs = async (amount) => {
  for (let i = 0; i < amount; i++) {
    const ranCurrency = randomCurrency();
    const ico = new models.ico({
      address: randomChars(34),
      currency: ranCurrency,
      value: randomValue(ranCurrency),
      txid: randomChars(64),
      date: randomDate(new Date(2018, 2, 2), new Date()),
    });
    await ico.save();
  }
};

const randomDate = (start, end) =>
  new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

const randomChars = (length) => {
  let text = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
};

const randomCurrency = () => {
  const currencies = ['ETH', 'BTC', 'LTC'];
  return currencies[Math.floor(Math.random() * Math.floor(3))];
};

const randomValue = (currency) => {
  let ranValue = 0;
  switch (currency) {
    case 'ETH':
      // const weiInEth = 1000000000000000000;
      const mweiInEth = 1000000000000;

      ranValue = Math.random() * 3;
      if (ranValue < 0.05) ranValue = 0.05;
      return Math.floor(ranValue * mweiInEth);
    case 'BTC':
      const satoshiInBtc = 100000000;
      ranValue = Math.random() * 0.09;
      if (ranValue < 0.0016) ranValue = 0.0016;
      return Math.floor(ranValue * satoshiInBtc);
    case 'LTC':
      const litoshiInLtc = 100000000;
      ranValue = Math.random() * 6;
      if (ranValue < 0.13) ranValue = 0.13;
      return Math.floor(ranValue * litoshiInLtc);
    default:
  }
};

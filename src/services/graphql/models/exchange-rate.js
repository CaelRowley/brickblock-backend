/* @flow */
import mongoose from 'mongoose';

const exchangeRateSchema = new mongoose.Schema({
  currency: {
    type: String,
    required: true,
  },
  euro: {
    type: Number,
    required: true,
  },
  dollar: {
    type: Number,
    required: true,
  },
});

const exchangeRate = mongoose.model('ExchangeRate', exchangeRateSchema);

export default exchangeRate;

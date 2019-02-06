/* @flow weak */
import healthcheckRouter from './healthcheck/router';

const addRouters = (app) => {
  app.use(healthcheckRouter);
};

export default addRouters;

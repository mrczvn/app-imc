import express, { urlencoded } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import routes from './routes';
import './database';
import authorization from './middleware/auth';

class App {
  constructor() {
    this.app = express();
    this.middleware();
    this.initRoutes();
  }

  middleware() {
    this.app.use(express.json());
    this.app.use(urlencoded({ extended: true }));
    this.app.use(morgan('dev'));
    this.app.use(cors());  
    this.auth = authorization();
    this.app.use(this.auth.initialize());
  }

  initRoutes() {
    this.routes = routes(this.app, this.auth);
  }
}

export default new App().app;

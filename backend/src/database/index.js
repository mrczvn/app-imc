import Sequelize from 'sequelize';

import dbConfig from '../config/database';
import User from '../models/user';

const models = [User];

class Database {
  constructor() {
    this.init();
  }

  async init() {
    this.connection = new Sequelize(dbConfig);

    try {
      await this.connection.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
    models.map((model) => model.init(this.connection));
  }
}

export default new Database();

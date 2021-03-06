import * as mongoose from 'mongoose';
import * as session from 'express-session';
const MongoStore = require('connect-mongo')(session);

import { transports } from 'winston';
import { MongoDB } from 'winston-mongodb';

const winston = require('winston');
require('winston-mongodb').MongoDB;


import { IDatabase } from '../interfaces/dal/iDatabase';

/**
 * Class for handling MongoDb
 */
export class MongoDatabase implements IDatabase {
  /**
   * Method for open a connection to mongodb
   * @param connectionString string for connection to the database
   */
  openConnection(connectionString: string): void {
    //workaround for https://github.com/Automattic/mongoose/issues/4951#issuecomment-283327958
    (<any>mongoose).Promise = global.Promise;
    mongoose.connect(connectionString);
    mongoose.set('debug', true);
  }

  /**
   * Method for closing connection to mongodb
   */
  closeConnectionEvent() : void {
    mongoose.connection.close(() => {
      console.log('Mongoose default connection disconnected through app termination');
      process.exit(0);
    });
  }

  /**
   * Method for getting store for express sessions
   */
  getStoreForSessions(): any {
    return new MongoStore({ mongooseConnection: mongoose.connection });
  }

  /**
   * Get an appender for JSNLog logger for logging errors in the application
   * @param connectionString string for connection to the database
   */
  getJSNLogAppenderForErrorLogging(connectionString: string): any {
    let dbName = mongoose.connection.db.databaseName;
    return new winston.transports.MongoDB({ db: connectionString, collection: 'errorLog' }); 
  }
}

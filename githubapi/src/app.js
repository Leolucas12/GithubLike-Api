import express from 'express';
import session from 'express-session';
import routes from './routes';

import './database';

class App {
    constructor() {
        this.server = express();

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(express.json());
        this.server.use(session({
            secret: 'githubapi',
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: 86400000,
            }
        }))
    }

    routes() {
        this.server.use(routes);
    }
}

export default new App().server;
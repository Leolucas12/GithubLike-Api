import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import User from '../app/models/User';
import Token from '../app/models/Token';
import Repository from '../app/models/Repository';
import Follower from '../app/models/Follower';
import Following from '../app/models/Following';
import Star from '../app/models/Star';

const models = [User, Token, Repository, Follower, Following, Star];

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(databaseConfig);

        models
            .map(model => model.init(this.connection))
            .map(model => model.associate && model.associate(this.connection.models));
    }
}

export default new Database();
import Sequelize, { Model } from 'sequelize';

class User extends Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
            username: Sequelize.STRING,
            email: Sequelize.STRING,
            bio: Sequelize.STRING,
            avatar: Sequelize.STRING,
            local: Sequelize.STRING,
        },
        {
            sequelize,
        });
    return this;
    }
}

export default User;
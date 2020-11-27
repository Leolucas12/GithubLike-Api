import Sequelize, { Model } from 'sequelize';

class Repository extends Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
            description: Sequelize.STRING,
            is_private: Sequelize.BOOLEAN,
            slug: Sequelize.STRING,
        },
        {
            sequelize,
        });
    return this;
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
        this.belongsTo(models.Star, { foreignKey: 'follower_id', as: 'follower' });
    }
}

export default Repository;
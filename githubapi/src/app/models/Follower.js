import Sequelize, { Model } from 'sequelize';

class Follower extends Model {
    static init(sequelize) {
        super.init({
            
        },
        {
            sequelize,
        });
    return this;
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
        this.belongsTo(models.User, { foreignKey: 'follower_id', as: 'follower' });
    }
}

export default Follower;
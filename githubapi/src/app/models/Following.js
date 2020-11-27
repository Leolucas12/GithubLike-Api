import Sequelize, { Model } from 'sequelize';

class Following extends Model {
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
        this.belongsTo(models.User, { foreignKey: 'following_id', as: 'following' });
    }
}

export default Following;
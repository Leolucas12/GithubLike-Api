import Sequelize, { Model } from 'sequelize';

class Token extends Model {
    static init(sequelize) {
        super.init({
            date: Sequelize.DATE,
        },
        {
            sequelize,
        });
    return this;
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    }
}

export default Token;
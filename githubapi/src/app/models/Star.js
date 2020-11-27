import Sequelize, { Model } from 'sequelize';

class Star extends Model {
    static init(sequelize) {
        super.init({
            
        },
        {
            sequelize,
        });
    return this;
    }

    static associate(models) {
        this.belongsTo(models.Repository, { foreignKey: 'repository_id', as: 'repository' });
        this.belongsTo(models.User, { foreignKey: 'follower_id', as: 'follower' });
    }
}

export default Star;
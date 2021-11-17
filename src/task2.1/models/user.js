import { DataTypes, Model } from 'sequelize';


class User extends Model {
    static initModel(sequelize) {
        User.init({
            id: {
                type: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true
            },
            login: {
                type: DataTypes.STRING,
                unique: true
            },
            password: DataTypes.STRING,
            age: DataTypes.INTEGER
        }, { sequelize, tableName: 'user' });
    }
}

export default User;

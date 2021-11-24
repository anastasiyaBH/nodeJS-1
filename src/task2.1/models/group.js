import { DataTypes, Model } from 'sequelize';

class Group extends Model {
    static initModel(sequelize) {
        Group.init({
            id: {
                type: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                unique: true
            },
            permissions: DataTypes.ARRAY(DataTypes.ENUM('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'))
        }, { sequelize, tableName: 'group' });
    }
}

export default Group;

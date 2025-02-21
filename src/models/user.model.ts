import { DataTypes, Model, CreationOptional } from "@sequelize/core";
import {Table, Attribute, ColumnName} from '@sequelize/core/decorators-legacy';

@Table
class User extends Model {

    @Attribute(DataTypes.STRING)
    firstName?: string;

    @Attribute(DataTypes.STRING)
    lastName?: string;

    @Attribute(DataTypes.STRING)
    loginId?: string;

    @Attribute(DataTypes.STRING)
    photo?: string;

    @Attribute(DataTypes.STRING)
    declare password: string;

}

export default User;
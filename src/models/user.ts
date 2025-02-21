import { DataTypes, Model, CreationOptional } from "@sequelize/core";
import {Table, Attribute, ColumnName} from '@sequelize/core/decorators-legacy';

@Table
class User extends Model {

    @Attribute(DataTypes.STRING)
    declare name: string;

    @Attribute(DataTypes.STRING)
    declare loginId: string;

    @Attribute(DataTypes.STRING)
    declare password: string;

}

export default User;
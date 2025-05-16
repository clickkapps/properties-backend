import {CreationOptional, DataTypes, Model, NonAttribute} from "@sequelize/core";
import {Attribute, AutoIncrement, BelongsTo, Default, PrimaryKey, Table} from "@sequelize/core/decorators-legacy";
import User from "./User";

@Table
class PasswordAttempt extends Model {

    @Attribute(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    // 'CreationOptional' is a special type that marks the attribute as optional
    // when creating an instance of the model (such as using Model.create()).
    declare id: CreationOptional<number>;

    @Attribute(DataTypes.INTEGER)
    declare userId: number

    @BelongsTo(() => User, 'userId')
    declare user?: NonAttribute<User>;

    @Attribute(DataTypes.INTEGER)
    @Default(0)
    declare attempts: CreationOptional<number>

}

export default PasswordAttempt;
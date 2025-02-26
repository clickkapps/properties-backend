import {CreationOptional, DataTypes, Model, NonAttribute} from "@sequelize/core";
import {Table, Attribute, PrimaryKey, AutoIncrement, BelongsTo} from '@sequelize/core/decorators-legacy';
import User from "./User";

@Table
export class Agent extends Model {
    @Attribute(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    // 'CreationOptional' is a special type that marks the attribute as optional
    // when creating an instance of the model (such as using Model.create()).
    declare id: CreationOptional<number>;

    @Attribute(DataTypes.INTEGER)
    declare userId: number

    @Attribute(DataTypes.INTEGER)
    declare packageId: number

    @BelongsTo(() => User, 'userId')
    declare user?: NonAttribute<User>;

}
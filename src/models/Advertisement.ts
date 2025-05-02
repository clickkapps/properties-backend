import {CreationOptional, DataTypes, Model, NonAttribute} from "@sequelize/core";
import {Attribute, AutoIncrement, BelongsTo, PrimaryKey, Table} from "@sequelize/core/decorators-legacy";
import User from "./User";

@Table
class Advertisement extends Model{

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

    @Attribute(DataTypes.STRING)
    declare status?: string //  active, completed

    @Attribute(DataTypes.DATE)
    declare startFrom?: Date

    @Attribute(DataTypes.DATE)
    declare endAt?: Date

    @Attribute(DataTypes.STRING)
    declare contactPhone?: string

    @Attribute(DataTypes.STRING)
    declare imagePath?: string

    @Attribute(DataTypes.STRING)
    declare contactEmail?: string

    @Attribute(DataTypes.STRING)
    declare link?: string

}

export default Advertisement
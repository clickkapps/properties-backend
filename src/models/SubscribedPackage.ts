import {CreationOptional, DataTypes, Model} from "@sequelize/core";
import {Attribute, AutoIncrement, BelongsTo, PrimaryKey} from "@sequelize/core/decorators-legacy";
import User from "./User";
import Package from "./Package";

class SubscribedPackage extends Model {

    @PrimaryKey
    @AutoIncrement
    @Attribute(DataTypes.INTEGER)
    declare id: CreationOptional<number>;

    @Attribute(DataTypes.INTEGER)
    declare userId: number

    @BelongsTo(() => User, 'userId')
    declare user: User

    @Attribute(DataTypes.INTEGER)
    declare packageId: number

    @BelongsTo(() => Package, 'packageId')
    declare package: Package
}

export default SubscribedPackage;
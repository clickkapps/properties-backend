import {CreationOptional, DataTypes, Model, NonAttribute} from "@sequelize/core";
import {Attribute, AutoIncrement, BelongsTo, PrimaryKey, Table} from "@sequelize/core/decorators-legacy";
import User from "./User";
import Subscription from "./Subscription";

@Table({ tableName: "UserEntitlements" })
class UserEntitlement extends Model {

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
    declare subscriptionId: number

    @BelongsTo(() => Subscription, 'subscriptionId')
    declare subscription?: NonAttribute<Subscription>;

    @Attribute(DataTypes.STRING) // same as package slug
    declare entitlement?: "basic" | "standard"

    @Attribute(DataTypes.STRING) // same as package slug
    declare entitlementAmountPaid?: string

    @Attribute(DataTypes.STRING) // same as package slug
    declare currency?: string

    @Attribute(DataTypes.STRING) // same as package slug
    declare status?: string


}

export default UserEntitlement
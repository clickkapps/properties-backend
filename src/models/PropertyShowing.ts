import {
    BelongsToGetAssociationMixin,
    CreationOptional,
    DataTypes,
    HasOneGetAssociationMixin,
    Model,
    NonAttribute
} from "@sequelize/core";
import {Attribute, AutoIncrement, BelongsTo, PrimaryKey, Table} from "@sequelize/core/decorators-legacy";
import User from "./User";
import Property from "./Property";
import Subscription from "./Subscription";

@Table
class PropertyShowing extends Model {

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
    declare propertyId: number

    @BelongsTo(() => Property, 'propertyId')
    declare property?: NonAttribute<Property>;

    @Attribute(DataTypes.INTEGER)
    declare subscriptionId: number

    @BelongsTo(() => Subscription, 'subscriptionId')
    declare subscription?: NonAttribute<Subscription>;

    declare getSubscription: BelongsToGetAssociationMixin<Subscription>;

    @Attribute(DataTypes.DATE)
    declare appointmentDate: Date

    @Attribute(DataTypes.STRING)
    declare status: "completed" | "cancelled" | "pending"

}

export default PropertyShowing;
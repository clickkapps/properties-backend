import {DataTypes, Model, NonAttribute} from "@sequelize/core";
import {Attribute, AutoIncrement, BelongsTo, PrimaryKey} from "@sequelize/core/decorators-legacy";
import User from "./User";
import Subscription from "./Subscription";
import Property from "./Property";

class PromotedProperty extends Model{

    @AutoIncrement
    @PrimaryKey
    @Attribute(DataTypes.INTEGER)
    declare id: number

    @Attribute(DataTypes.INTEGER)
    declare userId: number

    @BelongsTo(() => User, 'userId')
    declare user: NonAttribute<User>;

    @Attribute(DataTypes.INTEGER)
    declare subscriptionId: number

    @BelongsTo(() => Subscription, 'subscriptionId')
    declare subscription: NonAttribute<Subscription>

    @Attribute(DataTypes.INTEGER)
    declare propertyId: number

    @BelongsTo(() => Property, 'propertyId')
    declare property: NonAttribute<Property>


}

export default PromotedProperty;
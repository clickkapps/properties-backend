import {CreationOptional, DataTypes, Model, NonAttribute} from "@sequelize/core";
import {Attribute, AutoIncrement, BelongsTo, PrimaryKey, Table} from "@sequelize/core/decorators-legacy";
import User from "./User";

@Table({ tableName: "Subscriptions" })
class Subscription extends Model {

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
    declare serviceType?: CreationOptional<string>

    @Attribute(DataTypes.STRING)
    declare status?: CreationOptional<string>

    @Attribute(DataTypes.STRING)
    declare subscriptionType?: CreationOptional<string>

    @Attribute(DataTypes.DOUBLE)
    declare amountPayable?: CreationOptional<number>;

    @Attribute(DataTypes.DOUBLE)
    declare amountPaid?: CreationOptional<number>;

    @Attribute(DataTypes.DATE)
    declare startDate?: CreationOptional<Date>;

    @Attribute(DataTypes.DATE)
    declare endDate?: CreationOptional<Date>;


}

export default Subscription;
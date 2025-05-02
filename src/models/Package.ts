import {CreationOptional, DataTypes, Model} from "@sequelize/core";
import {Table, Attribute, PrimaryKey, AutoIncrement} from "@sequelize/core/decorators-legacy";

@Table
class Package extends Model {

    @Attribute(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    // 'CreationOptional' is a special type that marks the attribute as optional
    // when creating an instance of the model (such as using Model.create()).
    declare id: CreationOptional<number>;

    @Attribute(DataTypes.STRING)
    slug?: string;

    @Attribute(DataTypes.STRING)
    name?: string;

    @Attribute(DataTypes.STRING)
    description?: string;

    @Attribute(DataTypes.DOUBLE)
    price?: number;

    @Attribute(DataTypes.STRING)
    frequency?: "daily" | "one_time";

    @Attribute(DataTypes.STRING)
    group?: "default" | "properties_promotion" | "advertisement";

}

export default Package;
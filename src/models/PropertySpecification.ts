import {CreationOptional, DataTypes, Model, NonAttribute} from "@sequelize/core";
import {Attribute, AutoIncrement, BelongsTo, PrimaryKey} from "@sequelize/core/decorators-legacy";
import Property from "./Property";

class PropertySpecification extends Model {

    @Attribute(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    // 'CreationOptional' is a special type that marks the attribute as optional
    // when creating an instance of the model (such as using Model.create()).
    declare id: CreationOptional<number>;

    @Attribute(DataTypes.INTEGER)
    declare propertyId: number;

    @BelongsTo(() => Property, 'propertyId')
    declare property?: NonAttribute<Property>;

    @Attribute(DataTypes.STRING)
    declare title?: string;

    @Attribute(DataTypes.STRING)
    declare value?: string

}

export default PropertySpecification;
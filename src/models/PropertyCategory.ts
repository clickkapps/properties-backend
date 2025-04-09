import {CreationOptional, DataTypes, Model, NonAttribute} from "@sequelize/core";
import {Attribute, AutoIncrement, BelongsTo, PrimaryKey} from "@sequelize/core/decorators-legacy";
import {Property} from "./Property";

class PropertyCategory extends Model {

    @Attribute(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    // 'CreationOptional' is a special type that marks the attribute as optional
    // when creating an instance of the model (such as using Model.create()).
    declare id: CreationOptional<number>;

    @Attribute(DataTypes.STRING)
    declare title?: string; // category title

    @Attribute(DataTypes.STRING)
    declare slug?: string;

    @Attribute(DataTypes.STRING)
    declare description?: string; // description of the category if any


}

export default PropertyCategory;
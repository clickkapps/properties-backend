import {CreationOptional, DataTypes, Model} from "@sequelize/core";
import {Attribute, AutoIncrement, PrimaryKey, Table} from "@sequelize/core/decorators-legacy";

@Table
class FeatureView extends Model {

    @Attribute(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    // 'CreationOptional' is a special type that marks the attribute as optional
    // when creating an instance of the model (such as using Model.create()).
    declare id: CreationOptional<number>;

    @Attribute(DataTypes.INTEGER)
    declare propertyId?: CreationOptional<number>;

    @Attribute(DataTypes.INTEGER)
    declare advertisementId?: CreationOptional<number>

    @Attribute(DataTypes.INTEGER)
    declare dailyViews?: number

    @Attribute(DataTypes.STRING)
    declare feature?: string

}

export default FeatureView;
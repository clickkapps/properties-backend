import {CreationOptional, DataTypes, Model, NonAttribute} from "@sequelize/core";
import {
    Attribute,
    AutoIncrement,
    BelongsTo,
    ColumnName,
    Default, HasMany,
    PrimaryKey,
    Table
} from "@sequelize/core/decorators-legacy";
import User from "./User";
import PropertyCategory from "./PropertyCategory";
import PropertySpecification from "./PropertySpecification";
import PropertyGallery from "./PropertyGallery";

@Table({ tableName: "Properties" })
export class Property  extends  Model {
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
    declare creatorId: number

    @BelongsTo(() => User, 'creatorId')
    declare creator?: NonAttribute<User>;

    @Attribute(DataTypes.INTEGER)
    @ColumnName('categoryId')
    declare categoryId?: number

    @BelongsTo(() => PropertyCategory, 'categoryId')
    declare category?: NonAttribute<PropertyCategory>;

    @Attribute(DataTypes.STRING)
    declare title?: CreationOptional<string>

    @Attribute(DataTypes.STRING)
    declare description?: CreationOptional<string>

    @Attribute(DataTypes.STRING)
    declare mainImagePath?: string

    @Attribute(DataTypes.ENUM(['rent', 'sale']))
    declare offerType?: 'rent' | 'sale'

    @Attribute(DataTypes.STRING)
    @Default('USD')
    declare currency?: CreationOptional<string>;

    @Attribute(DataTypes.DOUBLE)
    declare amount?: CreationOptional<number>;

    @Attribute(DataTypes.BOOLEAN)
    @Default(false)
    declare published: CreationOptional<boolean>

    @Attribute(DataTypes.INTEGER)
    declare publisherId: number

    @BelongsTo(() => User, 'publisherId')
    declare publisher?: NonAttribute<User>;

    @Attribute(DataTypes.DATE)
    declare publishedAt?: Date

    @HasMany(() => PropertySpecification, 'propertyId')
    declare specifications?: NonAttribute<PropertySpecification[]>;

    @HasMany(() => PropertyGallery, 'propertyId')
    declare gallery?: NonAttribute<PropertyGallery[]>;

    @Attribute(DataTypes.STRING)
    declare address?: string;

    @Attribute(DataTypes.STRING)
    @Default('Ghana')
    declare country?: CreationOptional<string>;

    @Attribute(DataTypes.STRING)
    declare region?: string;

    @Attribute(DataTypes.INTEGER)
    declare rooms?: number

    @Attribute(DataTypes.INTEGER)
    declare washrooms?: number

    @Attribute(DataTypes.INTEGER)
    declare kitchens?: number

    @Attribute(DataTypes.BOOLEAN)
    @Default(false)
    declare promoted: CreationOptional<boolean>

}

export default Property;
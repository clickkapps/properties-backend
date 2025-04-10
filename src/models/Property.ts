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
    declare propertyCategoryId?: number

    @BelongsTo(() => PropertyCategory, 'categoryId')
    declare propertyCategory?: NonAttribute<PropertyCategory>;

    @Attribute(DataTypes.STRING)
    declare title?: CreationOptional<string>

    @Attribute(DataTypes.STRING)
    declare description?: CreationOptional<string>

    @Attribute(DataTypes.STRING)
    declare mainImagePath?: string

    @Attribute(DataTypes.ENUM(['rent', 'rent']))
    declare offerType?: 'rent' | 'sale'

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

}

export default Property;
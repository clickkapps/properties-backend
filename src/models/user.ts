import {CreationOptional, DataTypes, Model} from "@sequelize/core";
import {Table, Attribute, PrimaryKey, AutoIncrement} from '@sequelize/core/decorators-legacy';

@Table
class User extends Model {

    @Attribute(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    // 'CreationOptional' is a special type that marks the attribute as optional
    // when creating an instance of the model (such as using Model.create()).
    declare id: CreationOptional<number>;

    @Attribute(DataTypes.STRING)
    declare loginId: string;

    @Attribute(DataTypes.STRING)
    firstName?: string;

    @Attribute(DataTypes.STRING)
    lastName?: string;

    @Attribute(DataTypes.STRING)
    photo?: string;

    @Attribute(DataTypes.STRING)
    password?: string;

    @Attribute(DataTypes.STRING)
    publicKey?: string

    @Attribute(DataTypes.STRING)
    secreteKey?: string

    @Attribute(DataTypes.STRING)
    contactEmail?: CreationOptional<string>

    @Attribute(DataTypes.STRING)
    contactPhone?: CreationOptional<string>

    @Attribute(DataTypes.DATE)
    lastLoginAt?: Date;

    @Attribute(DataTypes.DATE)
    currentLoginAt?: Date;

    @Attribute(DataTypes.DATE)
    basicInfoUpdatedAt?: Date;

    // Hide sensitive fields when serializing
    toJSON() {
        const values = { ...this.get() };
        delete values.password; // Remove password from output
        delete values.secreteKey;
        return values;
    }

}

export default User;
import {
    CreationOptional,
    DataTypes,
    Model, Sequelize,
} from "@sequelize/core";
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
    declare role: string;

    @Attribute(DataTypes.STRING)
    lastName?: string;

    @Attribute(DataTypes.STRING)
    photo?: string;

    @Attribute(DataTypes.STRING)
    declare password?: string;

    @Attribute(DataTypes.STRING)
    publicKey?: string

    @Attribute(DataTypes.STRING)
    declare secreteKey?: string

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

    @Attribute(DataTypes.BOOLEAN)
    requiresPasswordUpdate?: boolean;

    static sensitiveProperties: string[] = [ 'password', 'secreteKey' ]
    static optionalForAssociations: string[] = [ ...User.sensitiveProperties, 'lastLoginAt', 'currentLoginAt', 'publicKey', 'loginId', 'currentLoginAt','createdAt', 'updatedAt', 'basicInfoUpdatedAt' ]

    // // Hide sensitive fields when serializing
    // toJSON() {
    //     const values = { ...this.get() };
    //
    //     for (const field of Array.isArray((this.constructor as typeof User).sensitiveProperties) ? (this.constructor as typeof User).sensitiveProperties : []) {
    //         delete values[field];
    //     }
    //
    //     return values;
    // }



}


export default User;
import {
    CreationOptional,
    DataTypes,
    Model, NonAttribute, Sequelize,
} from "@sequelize/core";
import {Table, Attribute, PrimaryKey, AutoIncrement, HasMany, HasOne} from '@sequelize/core/decorators-legacy';
import PropertySpecification from "./PropertySpecification";
import UserEntitlement from "./UserEntitlement";
import Permission from "./Permission";

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
    declare role: "guest" | "agent" | "admin" | "system";

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

    @Attribute(DataTypes.STRING)
    companyName?: CreationOptional<string>

    @Attribute(DataTypes.STRING)
    companyLocation?: CreationOptional<string>

    @HasMany(() => UserEntitlement, 'userId')
    declare entitlementHistory?: NonAttribute<UserEntitlement[]>;

    @HasMany(() => Permission, 'userId')
    declare permissions?: NonAttribute<Permission[]>;

    @HasOne(() => UserEntitlement, {
        foreignKey: 'userId',
        scope: {
            status: 'active',
        },
    })
    declare activeEntitlement?: NonAttribute<UserEntitlement>;

    static sensitiveProperties: string[] = [ 'password', 'secreteKey' ]
    static optionalForAssociations: string[] = [ ...User.sensitiveProperties, 'lastLoginAt', 'currentLoginAt', 'publicKey', 'loginId', 'currentLoginAt','createdAt', 'updatedAt', 'basicInfoUpdatedAt' ]

    // // Hide sensitive fields when serializing
    toJSON() {
        const values = { ...this.get() };

        for (const field of Array.isArray((this.constructor as typeof User).sensitiveProperties) ? (this.constructor as typeof User).sensitiveProperties : []) {
            delete values[field];
        }

        return values;
    }



}


export default User;
import {CreationOptional, DataTypes, Model} from "@sequelize/core";
import {Attribute, AutoIncrement, Default, PrimaryKey, Table} from "@sequelize/core/decorators-legacy";

@Table({ tableName: "OTPs" })
class OTP extends Model {

    @PrimaryKey
    @AutoIncrement
    @Attribute(DataTypes.INTEGER)
    declare id: CreationOptional<number>

    @Attribute(DataTypes.STRING)
    declare phone?: string

    @Attribute(DataTypes.STRING)
    declare serverId?: string

    @Attribute(DataTypes.STRING)
    declare code?: string

    @Attribute(DataTypes.INTEGER)
    @Default(0)
    declare attempts: CreationOptional<number>

    @Attribute(DataTypes.ENUM(['pending', 'verified', 'canceled']))
    @Default('pending')
    declare status: CreationOptional<'pending' | 'verified' | 'canceled'>
}

export default OTP;
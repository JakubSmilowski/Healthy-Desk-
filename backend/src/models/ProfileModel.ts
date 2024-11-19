import { Model, DataTypes } from "sequelize";
import sequelize from "../config/sequelize";
import { User } from "./UserModel";

class Profile extends Model {
    profileid!: number;
    userid!: number;
    title!: string;
    desk_height!: number;
    timer_standing!: number;
    timer_sitting!: number;
}

Profile.init(
    {
        profileid: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userid: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
        },
        deskHeight: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        timer_standing: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        timer_sitting: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'Profile',
        timestamps: false,
    }
);

export default Profile;
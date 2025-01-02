import { Model, DataTypes, Sequelize } from "sequelize";
import sequelize from "../config/sequelize";
import Profile from "./ProfileModel";
import jwt from "jsonwebtoken";

interface IUser {
    username: string;
    email: string;
    password: string;
}

class User extends Model implements IUser {
    public userid!: number;
    public username!: string;
    public email!: string;
    public password!: string;
    public height!: number;
    public mot_lvl!: 'low' | 'medium' | 'high';
    public score!: number;
    public score_date!: Date;
    public alert_streak!: number;
    public longest_streak!: number;
    public cur_profile!: number;

    public generateToken(): string {
        console.log("Generating token for user:", this.email);
        const payload = { userid: this.userid, email: this.email, username: this.username, isManager: false,
            alert_streak: this.alert_streak, longest_streak: this.longest_streak, height: this.height, score: this.score
         };
        const secret = "123456";
        console.log("Token data:", JSON.stringify(payload));
        return jwt.sign(payload, secret);
    }
}

User.init(
    {
        userid: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        height: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        mot_lvl: {
            type: DataTypes.ENUM('low', 'medium', 'high'),
            allowNull: false,
        },
        score: {
          type: DataTypes.INTEGER,
          defaultValue: 0, 
        },
        score_date: {
            type: DataTypes.DATE,
            defaultValue: new Date(),
        },
        alert_streak: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        longest_streak: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        cur_profile: { 
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'User',
        timestamps: false,
    }
);

class Manager extends Model implements IUser {
    managerid!: number;
    username!: string;
    email!: string;
    password!: string;

    public generateToken(): string {
        console.log("Generating token for user:", this.email);
        const payload = { userid: this.managerid, email: this.email, username: this.username, isManager: true };
        const secret = "123456";
        return jwt.sign(payload, secret);
    }
}

Manager.init(
    {
        managerid: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize,
        tableName: 'Manager',
        timestamps: false,
    }
);

User.hasMany(Profile, { foreignKey: 'userid' });

export { Manager, User };
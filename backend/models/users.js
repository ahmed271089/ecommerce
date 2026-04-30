import sequelize from "../config/index.js";
import { DataTypes } from "sequelize";

 const Users=sequelize.define('Users',{
    name:{
        allowNull:false,
        type:DataTypes.STRING
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    }
})

export default Users;
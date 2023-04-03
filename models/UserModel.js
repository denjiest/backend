import db from "../config/Database.js"
import Sequelize from 'sequelize'

const User = db.define('user',{
    id:{
        primaryKey : true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:{
            value:"name",
            msg:"Nama sudah ada !"
        }
    },
    username:{
        type: Sequelize.STRING,
        allowNull: false,
        unique:{
            value:"username",
            msg:"Username sudah ada !"
        }
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false,
        unique:{
            value:"email",
            msg:"Email sudah ada !"
        }
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false
    },
    image:{
        type: Sequelize.STRING,
        defaultValue:"images/default.jpg"
    }
},{
    freezeTableName:true,
    timestamps:true
})

export default User;

(async()=>{
    await db.sync();
})();
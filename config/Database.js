import {Sequelize} from "sequelize"

const db = new Sequelize('persero','root','',{
    host : 'localhost',
    dialect : 'mysql'
})

export default db
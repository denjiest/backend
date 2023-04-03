import {Sequelize} from "sequelize"

const db = new Sequelize('persero','root','',{
    host : 'localhost',
    dialect : 'mysql',
    port: '/var/run/mysqld/mysqld.sock'
})

export default db
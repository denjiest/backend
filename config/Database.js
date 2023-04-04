import {Sequelize} from "sequelize"

const db = new Sequelize('persero','root','',{
    host : '127.0.0.1',
    dialect : 'mysql',
    port:"3307",
    socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
})

export default db
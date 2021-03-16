import mysql from 'mysql'

const { HOST, USER, PASSWORD, DATABASE } = process.env

const config: mysql.PoolConfig = {
	host: HOST,
	port: 3306,
	user: USER,
	password: PASSWORD,
	database: DATABASE,
	connectionLimit: 10,
}

export default config

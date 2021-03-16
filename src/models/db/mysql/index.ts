import mysql from 'mysql'
import config from '../../../config/mysql.config'

/**
 * @description
 * mysql 客户端
 *
 * mysql client
 *
 * @class MysqlClient
 */
class MysqlClient {
	pool: mysql.Pool
	constructor(config: mysql.PoolConfig) {
		this.pool = mysql.createPool(config)
	}
	/**
	 * @description
	 * 执行 sql
	 *
	 * Execute sql
	 *
	 * @param {(string | mysql.QueryOptions)} sql
	 * @param {*} [values]
	 * @returns
	 *
	 * @memberOf MysqlClient
	 */
	query(sql: string | mysql.QueryOptions, values?: any) {
		return new Promise((resolve, reject) => {
			this.pool.getConnection((err, connection) => {
				if (err) {
					reject(err)
				} else {
					connection.query(sql, values, (err, rows) => {
						if (err) {
							reject(err)
						}
						resolve(rows || null)
						connection.release()
					})
				}
			})
		})
	}
}

export default new MysqlClient(config)

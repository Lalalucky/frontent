/**
 * DB
 */
const MongoClient = require('mongodb').MongoClient;
const config = require('./config.js');
const { dbUrl, dbName } = config;

class Db {
	constructor() {
		this.dbClient = ''; // db对象
		this.connect(); // 连接数据库
	}

	/** 实现单例模式 */
	static getInstance() {
		if (!Db.instance) {
			Db.instance = new Db();
		}
		return Db.instance;
	}

	connect() {
		return new Promise((resolve, reject) => {
			/** 数据库多次连接的问题 */
			// { useNewUrlParser: true, useUnifiedTopology: true },
			if (!this.dbClient) {
				MongoClient.connect(dbUrl, (err, client) => {
					if (err) {
						reject(err);
					} else {
						let db = client.db(dbName);
						this.dbClient = db;
						// console.log(db);
						resolve(db);
					}
				});
			} else {
				resolve(this.dbClient);
			}
		});
	}
	find(collectionName, json) {
		return new Promise((resolve, reject) => {
			this.connect().then(db => {
				// console.log(db);
				console.log(collectionName, json);
				let result = db.collection(collectionName).find(json);
				// console.log(result);
				result.toArray((error, docs) => {
					if (error) {
						reject(error);
						return;
					}
					resolve(docs);
				});
			});
		});
	}
	insert() {}
}

// let myDb = new Db();
// myDb.find('user', {}).then(data => {
// 	console.log(data);
// });
module.exports = Db.getInstance();

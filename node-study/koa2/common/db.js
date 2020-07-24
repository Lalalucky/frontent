/**
 * DB
 */
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
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
	remove(collectionName, json) {
		return new Promise((resolve, reject) => {
			this.connect().then(db => {
				db.collection(collectionName).removeOne(json, (err, result) => {
					if (err) {
						reject(err);
					} else {
						resolve(result);
					}
				});
			});
		});
	}
	update(collectionName, json1, json2) {
		return new Promise((resolve, reject) => {
			this.connect().then(db => {
				db.collection(collectionName).updateOne(
					json1,
					{
						$set: json2
					},
					(err, result) => {
						if (err) {
							reject(err);
							console.log(1);
						} else {
							resolve(result);
							console.log(2);
						}
					}
				);
			});
		});
	}
	insert(collectionName, json) {
		return new Promise((resolve, reject) => {
			this.connect().then(db => {
				db.collection(collectionName).insertOne(json, (err, result) => {
					if (err) {
						reject(err);
					} else {
						resolve(result);
					}
				});
			});
		});
	}
	getObjectID(id) {
		return new ObjectID(id);
	}
}

// let myDb = new Db();
// myDb.find('user', {}).then(data => {
// 	console.log(data);
// });
module.exports = Db.getInstance();

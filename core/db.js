var mysql = require('mysql');
var settings = require('./settings.json');
var db;

function connectDatabase() {
    if (!db) {
        db = mysql.createPool(settings);

        db.getConnection(function(err, connection){
            if(!err) {
                console.log('Database is connected!');
                connection.release();
            } else {
                console.log('Error connecting database!');
            }
        });
    }
    return db;
}

module.exports = connectDatabase();
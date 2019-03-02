//methods to execute mysql commands
var connection = require("../config/connection.js");

//questionMark function

function objToSql(ob){
    var arr = [];

    for (var key in ob){
        var value = ob[key];
        if(Object.hasOwnProperty.call(ob, key)){
            if(typeof value === "string" && value.indexOf(" ") >=0){
                value = "'" + value +"'";
            }

            arr.push(key + "=" + value);
        }
    }
    return arr.toString();
}

var orm = {
    selectAll: function(table, cb){
        var queryString = "SELECT * FROM " + table + ";";
        connection.query(queryString, function(err, result){
            if(err){
                throw err;
            }
            cb(result);
        });
    },

    insertOne: function(table, col, val, cb){
        var queryString = "INSERT INTO " + table; //forming sql query
        queryString +=" (";
        queryString += col.toString();
        queryString +=") ";
        queryString +="VALUES (?,?)";

        console.log(queryString);
        connection.query(queryString, val, function(err, result){
            if(err){
                throw err;
            }
            cb(result);
        });
    },

    update: function(table, objColVals, condition, cb){
        var queryString = "UPDATE "+table;
        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);
        connection.query(queryString, function(err,result){
            if(err){
                throw err;
            }
            cb(result);
        });
    }

};

module.exports = orm;
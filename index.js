var express = require('express');
var app = express();
var http = require('http').Server(app);
var cluster = require('cluster');
var numCPUs = require('os').cpus().length;
var request = require('request');

var hash = {
    "574e5cf7e4b0c51ccdeeb5a5": 5001,
    "58dc73cae4b000b12bdc2448": 5001,
    "571ebf81e4b0291be332a981": 5002,
    "56cd20a6e4b03efbf74e2273": 5002,
    "5a87063be4b0939dfec452e1": 5003,
    "5b1e42a3e4b049c7306df713": 5003,
    "592e3ca1e4b02d972b20e5fe": 5004,
    "5922bea6e4b022c95ab48d97": 5005,
    "5922c033e4b022c95ab48d9a": 5006,
    "5922bf61e4b022c95ab48d99": 5007,
    "57174496e4b0291be332a94d": 5008,
    "57c50176e4b0f5579cb1e7ba": 5009,
    "5b5a7c5de4b0abe08fe5fd30": 5019,
    "5b348931e4b0eed19dd48d9f": 5011,
    "5ae7f565e4b0d944e3a1ea77": 5012,
    "5b068a05e4b090818dbeafce": 5013,
    "59e9b0dfe4b04a9dd7494f18": 5012,
    "59e9ad82e4b04a9dd7494f17": 5014,
    "59e9b146e4b04a9dd7494f19": 5015,
    "5a24ab36e4b0aedf60904d94": 5016,
    "57ac4414e4b0911ae0baaeb8": 5019,
    "58536450e4b0245b01fa5361": 5019,
    "5acc3ab1e4b08474e63d7ce9": 5003,
    "5acc3b02e4b08474e63d7cea": 5003,
    "595ca94ae4b0ce45a76255c7": 5002,
    "center": 5019,
}

if (cluster.isMaster) {
    for (var i = 0; i < numCPUs - 1; i++) {
        cluster.fork();
    }
} else {
    app.get('*', function(req, res){
        var zoneId = req.query.zoneId || 5002;        
        var url = req.url;
        var newUrl = "http://localhost:"+hash[zoneId]+req.url;
        newUrl = newUrl.replace("&fleetId="+req.query.fleetId, "");
        newUrl = newUrl.replace("&bookId="+req.query.bookId, "");
        newUrl = newUrl.replace("&zoneId="+req.query.zoneId, "");
        console.log(new Date().toISOString() + " : " + url);
        request({url: newUrl, json: true}, function(error, response, body){
                res.set('Content-Type', 'application/json');
           res.send(body);
        })
    })
    http.listen(5000, function () {
        console.log(new Date().toISOString() + ' worker ' + process.pid + ' listen on: ' + 5000)
    })
}
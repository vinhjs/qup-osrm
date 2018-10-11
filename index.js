var express = require('express');
var app = express();
var http = require('http').Server(app);
var cluster = require('cluster');
var numCPUs = require('os').cpus().length;
var request = require('request');

var hash = {
    "574e5cf7e4b0c51ccdeeb5a5": {"port": 5001, "zone": "VN", "fleetId": ""},
    "58dc73cae4b000b12bdc2448": {"port": 5001, "zone": "VN", "fleetId": ""},
    "571ebf81e4b0291be332a981": {"port": 5002, "zone": "Calgary, Alberta, Canada.", "fleetId": "tappcar"},
    "56cd20a6e4b03efbf74e2273": {"port": 5002, "zone": "Edmonton, Alberta, Canada.", "fleetId": "tappcar"},
    "5a87063be4b0939dfec452e1": {"port": 5003, "zone": "Winnipeg, Manitoba, Canada.", "fleetId": "tappcar"},
    "5b1e42a3e4b049c7306df713": {"port": 5003, "zone": "Steinbech, Manitoba, Canada.", "fleetId": "tappcar"},
    "592e3ca1e4b02d972b20e5fe": {"port": 5004, "zone": "Bordeaux, France.", "fleetId": "compagny"},
    "5922bea6e4b022c95ab48d97": {"port": 5005, "zone": "Paris, France.", "fleetId": "compagny"},
    "5922c033e4b022c95ab48d9a": {"port": 5006, "zone": "Strasbourg, France.", "fleetId": "compagny"},
    "5922bf61e4b022c95ab48d99": {"port": 5007, "zone": "Marseille, France.", "fleetId": "compagny"},
    "57174496e4b0291be332a94d": {"port": 5008, "zone": "London, Ontario, Canada.", "fleetId": "mygreen"},
    "57c50176e4b0f5579cb1e7ba": {"port": 5009, "zone": "Southern Pines, Moore County, North Carolina, United States.", "fleetId": "tcabz"},
    "5b5a7c5de4b0abe08fe5fd30": {"port": 5019, "zone": "Guadeloupe, France.", "fleetId": "batche"},
    "5b348931e4b0eed19dd48d9f": {"port": 5011, "zone": "Seville, Andalusia, Spain.", "fleetId": "looloo"},
    "5ae7f565e4b0d944e3a1ea77": {"port": 5012, "zone": "Los Angeles, California, United States.", "fleetId": "apparo"},
    "5b068a05e4b090818dbeafce": {"port": 5013, "zone": "Chicago, United States.", "fleetId": "apparo"},
    "59e9b0dfe4b04a9dd7494f18": {"port": 5012, "zone": "Bakersfield, Los Angeles, United States.", "fleetId": "apparo"},
    "59e9ad82e4b04a9dd7494f17": {"port": 5014, "zone": "Phoenix_Remove", "fleetId": "apparo"},
    "59e9b146e4b04a9dd7494f19": {"port": 5015, "zone": "Las Vegas, Nevada, United States.", "fleetId": "apparo"},
    "5a24ab36e4b0aedf60904d94": {"port": 5016, "zone": "New York, United States.", "fleetId": "javerrides"},
    "57ac4414e4b0911ae0baaeb8": {"port": 5019, "zone": "Panama City, Panama.", "fleetId": "javerrides"},
    "58536450e4b0245b01fa5361": {"port": 5019, "zone": "San Carlos, Panama.", "fleetId": "javerrides"},
    "5acc3ab1e4b08474e63d7ce9": {"port": 5003, "zone": "Winnipeg, Manitoba, Canada.", "fleetId": "cowboytaxi"},
    "5acc3b02e4b08474e63d7cea": {"port": 5003, "zone": "Brandon, Manitoba, Canada.", "fleetId": "cowboytaxi"},
    "595ca94ae4b0ce45a76255c7": {"port": 5002, "zone": "Calgary, Alberta, Canada.", "fleetId": "cowboytaxi"},
    "center": {"port": 5019, "zone": "", "fleetId": ""},
}

if (cluster.isMaster) {
    for (var i = 0; i < numCPUs - 1; i++) {
        cluster.fork();
    }
} else {
    app.get('/info', function(req, res){
        res.send("OK");
    })
    app.get('*', function(req, res){
        console.log(req.query);
        var zoneId = req.query.zoneId || 5002;        
        if (zoneId && hash[zoneId]) {
            var url = req.url;
            var newUrl = "http://localhost:"+hash[zoneId].port+req.url;
            newUrl = newUrl.replace("&fleetId="+req.query.fleetId, "");
            newUrl = newUrl.replace("&bookId="+req.query.bookId, "");
            newUrl = newUrl.replace("&zoneId="+req.query.zoneId, "");
            console.log(new Date().toISOString() + " : " + url);
            request({url: newUrl, json: true}, function(error, response, body){
                    res.set('Content-Type', 'application/json');
            res.send(body);
            })
        } else {
            console.log("NO DATA");
        }
        
    })
    http.listen(5000, function () {
        console.log(new Date().toISOString() + ' worker ' + process.pid + ' listen on: ' + 5000)
    })
}
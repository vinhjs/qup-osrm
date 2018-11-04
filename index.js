var express = require('express');
var app = express();
var http = require('http').Server(app);
var cluster = require('cluster');
var numCPUs = require('os').cpus().length;
var request = require('request');
app.set('view engine', 'ejs');
var auth = require('http-auth');
var basic = auth.basic({
    realm: 'LOGIN WITH JIRA ACCOUNT'
}, function(username, password, callback) {
    var url = 'http://issues.qup.vn/rest/api/2/user?username=' + username;
    request.get({url: url, body: {}, json: true, timeout: 30000, auth: {username: username, password: password}}, function(error, response, body){
        console.log("INFO", "api fleet", "request.get: - response body", {url, body}, null);
        if (body && body.active) {
            callback(true);
        } else {
            callback(false);
        }
    })
});
var authMiddleware = auth.connect(basic);
var hash = {
    "559f71aee4b078015fe5427c": {"port": 5001, "server": "AWS", "zone": "DN", "fleetId": "zinzo", "map": "http://download.geofabrik.de/asia/vietnam.kml"},
    "567cc386e4b0d61df244d4a1": {"port": 5001, "server": "AWS", "zone": "DN", "fleetId": "qa", "map": ""},
    "574e5cf7e4b0c51ccdeeb5a5": {"port": 5001, "server": "LAB, BETA", "zone": "VN", "fleetId": "migratecard", "map": ""},
    "58dc73cae4b000b12bdc2448": {"port": 5001, "server": "LAB, BETA", "zone": "VN", "fleetId": "migratecard", "map": ""},
    "571ebf81e4b0291be332a981": {"port": 5002, "server": "AWS", "zone": "Calgary, Alberta, Canada.", "fleetId": "tappcar", "map": "https://download.geofabrik.de/north-america/canada/alberta.kml"},
    "56cd20a6e4b03efbf74e2273": {"port": 5002, "server": "AWS", "zone": "Edmonton, Alberta, Canada.", "fleetId": "tappcar", "map": ""},
    "5a87063be4b0939dfec452e1": {"port": 5003, "server": "AWS", "zone": "Winnipeg, Manitoba, Canada.", "fleetId": "tappcar", "map": "https://download.geofabrik.de/north-america/canada/manitoba.kml"},
    "5b1e42a3e4b049c7306df713": {"port": 5003, "server": "AWS", "zone": "Steinbech, Manitoba, Canada.", "fleetId": "tappcar", "map": ""},
    "592e3ca1e4b02d972b20e5fe": {"port": 5004, "server": "AWS", "zone": "Bordeaux, France.", "fleetId": "compagny", "map": "https://download.geofabrik.de/europe/france/aquitaine.kml"},
    "5922bea6e4b022c95ab48d97": {"port": 5005, "server": "AWS", "zone": "Paris, France.", "fleetId": "compagny", "map": "https://download.geofabrik.de/europe/france/ile-de-france.kml"},
    "5922c033e4b022c95ab48d9a": {"port": 5006, "server": "AWS", "zone": "Strasbourg, France.", "fleetId": "compagny", "map": "https://download.geofabrik.de/europe/france/alsace.kml"},
    "5922bf61e4b022c95ab48d99": {"port": 5007, "server": "AWS", "zone": "Marseille, France.", "fleetId": "compagny", "map": "https://download.geofabrik.de/europe/france/provence-alpes-cote-d-azur.kml"},
    "57174496e4b0291be332a94d": {"port": 5008, "server": "AWS", "zone": "London, Ontario, Canada.", "fleetId": "mygreen", "map": "https://download.geofabrik.de/north-america/canada/ontario.kml"},
    "57c50176e4b0f5579cb1e7ba": {"port": 5009, "server": "AWS", "zone": "Southern Pines, Moore County, North Carolina, United States.", "fleetId": "tcabz", "map": "https://download.geofabrik.de/north-america/us/north-carolina.kml"},
    "5b5a7c5de4b0abe08fe5fd30": {"port": 5019, "server": "AWS", "zone": "Guadeloupe, France.", "fleetId": "batche", "map": "https://download.geofabrik.de/central-america.kml"},
    "5b348931e4b0eed19dd48d9f": {"port": 5011, "server": "AWS", "zone": "Seville, Andalusia, Spain.", "fleetId": "looloo", "map": ""},
    "5ae7f565e4b0d944e3a1ea77": {"port": 5012, "server": "AWS", "zone": "Los Angeles, California, United States.", "fleetId": "apparo", "map": "https://download.geofabrik.de/north-america/us/california.kml"},
    "5b068a05e4b090818dbeafce": {"port": 5013, "server": "AWS", "zone": "Chicago, United States.", "fleetId": "apparo", "map": "https://download.geofabrik.de/north-america/us/illinois.kml"},
    "59e9b0dfe4b04a9dd7494f18": {"port": 5012, "server": "AWS", "zone": "Bakersfield, Los Angeles, United States.", "fleetId": "apparo", "map": ""},
    "59e9ad82e4b04a9dd7494f17": {"port": 5014, "server": "AWS", "zone": "Phoenix_Remove", "fleetId": "apparo", "map": "https://download.geofabrik.de/north-america/us/arizona.kml"},
    "59e9b146e4b04a9dd7494f19": {"port": 5015, "server": "AWS", "zone": "Las Vegas, Nevada, United States.", "fleetId": "apparo", "map": "https://download.geofabrik.de/north-america/us/nevada.kml"},
    "5a24ab36e4b0aedf60904d94": {"port": 5016, "server": "AWS", "zone": "New York, United States.", "fleetId": "javerrides", "map": "https://download.geofabrik.de/north-america/us/new-york.kml"},
    "57ac4414e4b0911ae0baaeb8": {"port": 5019, "server": "AWS", "zone": "Panama City, Panama.", "fleetId": "javerrides", "map": ""},
    "58536450e4b0245b01fa5361": {"port": 5019, "server": "AWS", "zone": "San Carlos, Panama.", "fleetId": "javerrides", "map": ""},
    "5acc3ab1e4b08474e63d7ce9": {"port": 5003, "server": "AWS", "zone": "Winnipeg, Manitoba, Canada.", "fleetId": "cowboytaxi", "map": ""},
    "5acc3b02e4b08474e63d7cea": {"port": 5003, "server": "AWS", "zone": "Brandon, Manitoba, Canada.", "fleetId": "cowboytaxi", "map": ""},
    "595ca94ae4b0ce45a76255c7": {"port": 5002, "server": "AWS", "zone": "Calgary, Alberta, Canada.", "fleetId": "cowboytaxi", "map": ""},
    "5a81451ce4b0939dfec451cf": {"port": 5017, "server": "AWS", "zone": "Brighton London", "fleetId": "tad", "map": "https://download.geofabrik.de/europe/great-britain/england.kml"},
    "595469c2e4b0ce45a76254eb": {"port": 5018, "server": "AWS", "zone": "Ghana", "fleetId": "uru", "map": "https://download.geofabrik.de/africa/ghana.kml"},
    "59b66847e4b0ab1233e442e4": {"port": 5020, "server": "AWS", "zone": "Abuja, FCT, Nigeria", "fleetId": "uru", "map": "https://download.geofabrik.de/africa/nigeria.kml"},
    "5af01560e4b0d944e3a1f02d": {"port": 5020, "server": "AWS", "zone": "Rivers State, Nigeria", "fleetId": "uru", "map": ""},
    "5af0163de4b0d944e3a1f030": {"port": 5020, "server": "AWS", "zone": "Enugu State, Nigeria", "fleetId": "uru", "map": ""},
    "5af016b6e4b0d944e3a1f031": {"port": 5020, "server": "AWS", "zone": "Anambra State", "fleetId": "uru", "map": ""},
    "5af01755e4b0d944e3a1f032": {"port": 5020, "server": "AWS", "zone": "Cross River State", "fleetId": "uru", "map": ""},
    "5af017dae4b0d944e3a1f033": {"port": 5020, "server": "AWS", "zone": "Akwa Ibom State", "fleetId": "uru", "map": ""},
    "5a288567e4b0974db584c0a4": {"port": 5020, "server": "AWS", "zone": "IMO State", "fleetId": "uru", "map": ""},
    "5af015a8e4b0d944e3a1f02e": {"port": 5020, "server": "AWS", "zone": "Lagos State", "fleetId": "uru", "map": ""},
    "center": {"port": 5019, "server": "AWS", "zone": "", "fleetId": "", "map": ""},
};
var server = {
    aws: "https://dispatch.qupworld.com",
    sea: "https://dispatch-sea.qupworld.com",
    avis: "https://dispatch-avis.qupworld.com",
    beta: "https://dispatch.beta.qup.vn",
    lab: "https://dispatcher.lab.qup.vn",
}

if (cluster.isMaster) {
    for (var i = 0; i < numCPUs - 1; i++) {
        cluster.fork();
    }
} else {
    app.get('/maps', authMiddleware, function(req, res){
        if (req.query.fleetId && req.query.server) {
            var url = server[req.query.server] + '/api/find?collection=Zone&conditions={%22fleetId%22:%22'+req.query.fleetId+'%22}';
            request({url: url, json: true, headers: {
                "Authorization": req.headers.authorization
            }}, function(error, response, body){
                if (body) {
                    res.render('pages/index', {
                        hash: hash,
                        zones: body
                    });
                } else {
                    res.render('pages/index', {
                        hash: hash,
                        zones: {}
                    });
                }
            })
        } else {
            res.render('pages/index', {
                hash: hash,
                zones: {}
            });
        }        
    })
    app.get('/info', function(req, res){
        var html = '<html><head><title>Zone info</title></head><body><table border="1">';
        html+= '<tr><th>Server</th><th>zoneId</th><th>port</th><th>zone</th><th>fleetId</th><th>Map</th></tr>';
        var keys = Object.keys(hash);
        for(var i in keys){
            html+='<tr><td>'+hash[keys[i]].server+'</td><td>'+keys[i]+'</td><td>'+hash[keys[i]].port+'</td><td>'+hash[keys[i]].zone+'</td><td>'+hash[keys[i]].fleetId+'</td><td><a href="'+hash[keys[i]].map+'">Map</a></td></tr>';
        }
        html+= '</table></body></html>';
        res.send(html);
    })
    app.get('*', function(req, res){
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
            //
            console.log("NO DATA");
            var url = req.url;
            var newUrl = "http://router.project-osrm.org"+req.url;
            newUrl = newUrl.replace("&fleetId="+req.query.fleetId, "");
            newUrl = newUrl.replace("&bookId="+req.query.bookId, "");
            newUrl = newUrl.replace("&zoneId="+req.query.zoneId, "");
            console.log(new Date().toISOString() + " : " + url);
            request({url: newUrl, json: true}, function(error, response, body){
                res.set('Content-Type', 'application/json');
                res.send(body);
            })
        }
        
    })
    http.listen(5000, function () {
        console.log(new Date().toISOString() + ' worker ' + process.pid + ' listen on: ' + 5000)
    })
}
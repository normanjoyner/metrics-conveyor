var influx = require("influx");
var util = require("util");
var Backend = require([__dirname, "..", "lib", "backend"].join("/"));

function InfluxDB(options){
    this.initialize(options.name);
    this.client = influx(options);
}

util.inherits(InfluxDB, Backend);

InfluxDB.prototype.write = function(metric, fn){
    this.client.writePoint(metric.key, { value: metric.value, time: new Date() }, null, {}, fn);
}

module.exports = InfluxDB;

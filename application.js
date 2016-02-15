#!/usr/bin/env node
var _ = require("lodash");
var async = require("async");
var datasources = require([__dirname, "datasources"].join("/"));
var backends = require([__dirname, "backends"].join("/"));
var schedule = require("node-schedule");

var config = {
    datasource: {
        name: process.env.DATASOURCE_NAME
    },
    backend: {
        name: process.env.BACKEND_NAME || "stdout"
    }
}

if(_.isUndefined(config.datasource.name)){
    process.stderr.write("Datasource name must be provided!");
    process.exit(1);
}

config.datasource.name = config.datasource.name.toLowerCase();
config.backend.name = config.backend.name.toLowerCase();

if(config.datasource.name == "haproxy"){
    config.datasource.base_url = process.env.HAPROXY_BASE_URL;
    config.datasource.status_path = process.env.HAPROXY_STATUS_PATH || "/";
    config.datasource.delimiter  = process.env.HAPROXY_METRIC_KEY_DELIMITER || ".";
}

if(config.datasource.name == "mixpanel"){
    config.datasource.api_key = process.env.MIXPANEL_API_KEY;
    config.datasource.api_secret = process.env.MIXPANEL_API_SECRET;
    config.datasource.events = process.env.MIXPANEL_EVENTS || "";
}

var datasource = new datasources[config.datasource.name](config.datasource);

if(config.backend.name == "graphite"){
    config.backend.host = process.env.GRAPHITE_HOST || "localhost";
    config.backend.port = process.env.GRAPHITE_PORT || 2003;
}

if(config.backend.name == "influxdb"){
    config.backend.host = process.env.INFLUXDB_HOST || "localhost";
    config.backend.port = process.env.INFLUXDB_PORT || 8086;
    config.backend.username = process.env.INFLUXDB_USERNAME;
    config.backend.password = process.env.INFLUXDB_PASSWORD;
    config.backend.database = process.env.INFLUXDB_DATABASE || "metrics-conveyor";
}

var backend = new backends[config.backend.name](config.backend);

schedule.scheduleJob("0 * * * * *", function(){
    datasource.get_metrics(function(err, metrics){
        if(err)
            process.stderr.write(["Error fetching metrics from", config.datasource.name].join(" "));
        else{
            _.each(metrics, function(metric, fn){
                backend.write(metric, function(err){
                    if(err)
                        process.stderr.write(["Error writing metric to", config.backend.name].join(" "));
                });
            });
        }
    });
});

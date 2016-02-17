#!/usr/bin/env node
var _ = require("lodash");
var MetricsConveyor = require([__dirname, "..", "application"].join("/"));
var schedule = require("node-schedule");

var options = {
    datasource: {
        name: process.env.DATASOURCE_NAME
    },
    backend: {
        name: process.env.BACKEND_NAME || "stdout"
    },
    processing_interval: process.env.PROCESSING_INTERVAL || "*/1 * * * *"
}

if(_.isUndefined(options.datasource.name)){
    process.stderr.write("Datasource name must be provided!");
    process.exit(1);
}

if(options.datasource.name == "memory")
    options.datasource.global_variable_name = process.env.MEMORY_GLOBAL_VARIABLE_NAME || "metrics";

if(options.datasource.name == "haproxy"){
    options.datasource.base_url = process.env.HAPROXY_BASE_URL;
    options.datasource.status_path = process.env.HAPROXY_STATUS_PATH || "/";
    options.datasource.delimiter  = process.env.HAPROXY_METRIC_KEY_DELIMITER || ".";
}

if(options.datasource.name == "mixpanel"){
    options.datasource.api_key = process.env.MIXPANEL_API_KEY;
    options.datasource.api_secret = process.env.MIXPANEL_API_SECRET;
    options.datasource.events = process.env.MIXPANEL_EVENTS || "";
}

if(options.backend.name == "graphite"){
    options.backend.host = process.env.GRAPHITE_HOST || "localhost";
    options.backend.port = process.env.GRAPHITE_PORT || 2003;
}

if(options.backend.name == "influxdb"){
    options.backend.host = process.env.INFLUXDB_HOST || "localhost";
    options.backend.port = process.env.INFLUXDB_PORT || 8086;
    options.backend.username = process.env.INFLUXDB_USERNAME;
    options.backend.password = process.env.INFLUXDB_PASSWORD;
    options.backend.database = process.env.INFLUXDB_DATABASE || "metrics-conveyor";
}

var metrics_conveyor = new MetricsConveyor(options);

metrics_conveyor.on("error", function(err){
    process.stderr.write(err.message + "\n");
});

schedule.scheduleJob(options.processing_interval, function(){
    metrics_conveyor.process();
});

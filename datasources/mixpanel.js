var _ = require("lodash");
var util = require("util");
var MixpanelExport = require('mixpanel-data-export');
var Datasource = require([__dirname, "..", "lib", "datasource"].join("/"));

function Mixpanel(options){
    this.initialize(options.name);
    this.options = options;
    this.options.events = this.options.events.split(",");
    this.client = new MixpanelExport({
        api_key: this.options.api_key,
        api_secret: this.options.api_secret
    });
}

util.inherits(Mixpanel, Datasource);

Mixpanel.prototype.get_metrics = function(fn){
    this.client.events({
        event: this.options.events,
        type: "average",
        unit: "minute",
        interval: 1
    }, function(response){
        var metrics = [];
        if(response && response.data && response.data.values){
            _.each(response.data.values, function(series, key){
                var metric = {};
                metric.key = key.replace(/ /g, ".");
                var earliest = null;
                _.each(series, function(value, timestamp){
                    timestamp = new Date(timestamp).valueOf();
                    if(_.isNull(earliest) || timestamp < earliest){
                        earliest = timestamp;
                        metric.value = value;
                    }
                });
                metrics.push(metric);
            });

            return fn(null, metrics);
        }
        else
            return fn(new Error("Error returned from Mixpanel!"));
    });
}

module.exports = Mixpanel;

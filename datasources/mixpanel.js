var _ = require("lodash");
var util = require("util");
var moment = require("moment-timezone");
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

    moment.tz.add("America/Los_Angeles|PST PDT|80 70|0101|1Lzm0 1zb0 Op0");
}

util.inherits(Mixpanel, Datasource);

Mixpanel.prototype.get_metrics = function(fn){
    this.client.events({
        event: this.options.events,
        type: "general",
        unit: "minute",
        interval: 1
    }, function(response){
        var metrics = [];
        if(response && response.data && response.data.values){
            var now = moment();
            now.tz("America/Los_Angeles");
            now.seconds(0);
            now.subtract(1, "hours");
            now.subtract(1, "minutes");
            var timestamp = now.format("YYYY-MM-DD HH:mm:00");
            _.each(response.data.values, function(series, key){
                var metric = {};
                metric.key = key.replace(/ /g, ".");
                metric.value = series[timestamp];
                metrics.push(metric);
            });

            return fn(null, metrics);
        }
        else
            return fn(new Error("Error returned from Mixpanel!"));
    });
}

module.exports = Mixpanel;

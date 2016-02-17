var _ = require("lodash");
var util = require("util");
var EventEmitter = require("events").EventEmitter;
var datasources = require([__dirname, "datasources"].join("/"));
var backends = require([__dirname, "backends"].join("/"));

function MetricsConveyor(options){
    EventEmitter.call(this);

    _.defaults(options, {
        datasource: {},
        backend: {}
    });

    _.defaults(options.backend, {
        name: "stdout"
    });

    this.options = options;

    this.options.datasource.name = this.options.datasource.name.toLowerCase();
    this.options.backend.name = this.options.backend.name.toLowerCase();

    this.datasource = new datasources[this.options.datasource.name](this.options.datasource);
    this.backend = new backends[this.options.backend.name](this.options.backend);
}

MetricsConveyor.prototype.process = function(){
    var self = this;

    this.datasource.get_metrics(function(err, metrics){
        if(err)
            process.stderr.write(["Error fetching metrics from", self.options.datasource.name].join(" "));
        else{
            _.each(metrics, function(metric, fn){
                self.backend.write(metric, function(err){
                    if(err)
                        process.stderr.write(["Error writing metric to", self.options.backend.name].join(" "));
                });
            });
        }
    });
}

util.inherits(MetricsConveyor, EventEmitter);
module.exports = MetricsConveyor;

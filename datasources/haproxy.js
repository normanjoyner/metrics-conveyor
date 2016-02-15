var csv = require("csv");
var _ = require("lodash");
var request = require("request");
var util = require("util");
var Datasource = require([__dirname, "..", "lib", "datasource"].join("/"));

function HAProxy(options){
    this.initialize(options.name);
    this.options = options;
    this.request_options = {
        url: [this.options.base_url, this.options.status_path, ";csv"].join(""),
        method: "GET",
        timeout: 5000
    }
}

util.inherits(HAProxy, Datasource);

HAProxy.prototype.get_metrics = function(fn){
    var self = this;

    request(this.request_options, function(err, response){
        if(err)
            return fn(err);
        else if(response.statusCode != 200)
            return fn(new Error(["HAProxy status route returned", response.statusCode].join(" ")));
        else{
            csv.parse(response.body, function(err, data){
                var metrics = [];

                _.each(_.tail(data), function(line){
                    var name = [line[0], line[1]].join(self.options.delimiter);

                    metrics.push({
                        key: [name, "queue", "current"].join(self.options.delimiter),
                        value: _.parseInt(line[2])
                    });
                    metrics.push({
                        key: [name, "queue", "max"].join(self.options.delimiter),
                        value: _.parseInt(line[3])
                    });
                    metrics.push({
                        key: [name, "sessions", "current"].join(self.options.delimiter),
                        value: _.parseInt(line[4])
                    });
                    metrics.push({
                        key: [name, "sessions", "max"].join(self.options.delimiter),
                        value: _.parseInt(line[5])
                    });
                    metrics.push({
                        key: [name, "bytes", "in"].join(self.options.delimiter),
                        value: _.parseInt(line[8])
                    });
                    metrics.push({
                        key: [name, "bytes", "out"].join(self.options.delimiter),
                        value: _.parseInt(line[9])
                    });
                    metrics.push({
                        key: [name, "rate", "current"].join(self.options.delimiter),
                        value: _.parseInt(line[33])
                    });
                    metrics.push({
                        key: [name, "rate", "max"].join(self.options.delimiter),
                        value: _.parseInt(line[35])
                    });
                    metrics.push({
                        key: [name, "response", "1xx"].join(self.options.delimiter),
                        value: _.parseInt(line[28])
                    });
                    metrics.push({
                        key: [name, "response", "2xx"].join(self.options.delimiter),
                        value: _.parseInt(line[29])
                    });
                    metrics.push({
                        key: [name, "response", "3xx"].join(self.options.delimiter),
                        value: _.parseInt(line[30])
                    });
                    metrics.push({
                        key: [name, "response", "4xx"].join(self.options.delimiter),
                        value: _.parseInt(line[31])
                    });
                    metrics.push({
                        key: [name, "response", "5xx"].join(self.options.delimiter),
                        value: _.parseInt(line[32])
                    });
                });

                return fn(null, metrics);
            });
        }
    });
}

module.exports = HAProxy;

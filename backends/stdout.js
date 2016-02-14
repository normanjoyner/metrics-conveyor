var util = require("util");
var Backend = require([__dirname, "..", "lib", "backend"].join("/"));

function Stdout(options){
    this.initialize(options.name);
}

util.inherits(Stdout, Backend);

Stdout.prototype.write = function(metric, fn){
    console.log(metric.key, metric.value);
    return fn();
}

module.exports = Stdout;

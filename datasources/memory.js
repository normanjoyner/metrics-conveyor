var _ = require("lodash");
var util = require("util");
var Datasource = require([__dirname, "..", "lib", "datasource"].join("/"));

function Memory(options){
    this.initialize(options.name);
    this.options = options;
}

util.inherits(Memory, Datasource);

Memory.prototype.get_metrics = function(fn){
    return fn(null, global[this.options.global_variable_name]);
}

module.exports = Memory;

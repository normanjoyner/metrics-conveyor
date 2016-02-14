function Datasource(){};

Datasource.prototype.initialize = function(name){
    this.name = name;
}

Datasource.prototype.get_metrics = function(fn){
    return fn();
}

module.exports = Datasource;

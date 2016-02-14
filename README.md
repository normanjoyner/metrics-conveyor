metrics-conveyor
====================

## About

### Description
Ship metrics from a datasource to various backends. Every minute, metrics-conveyor will pull metrics from your datasource of choice and ship them to the backend of your choice.

### Author
* Norman Joyner - norman.joyner@gmail.com

## Getting Started

### Installing via NPM
`npm install -g metrics-conveyor`

### Running locally
`metrics-conveyor`

## Configuration

### Environment Variables
* `AWS_ACCESS_KEY_ID` - AWS access key id (required)
* `AWS_SECRET_ACCESS_KEY` - AWS secret access key (required)
* `AWS_REGION` - AWS region to pull metrics from (defaults to us-east-1)
* `BACKEND_NAME` - backend to ship metrics to (defaults to stdout)
* `GRAPHITE_HOST` - graphite server host (defaults to localhost)
* `GRAPHITE_PORT` - graphite server port (defaults to 2003)
* `INFLUXDB_HOST` - influxdb server host (defaults to localhost)
* `INFLUXDB_PORT` - influxdb server port (defaults to 8086)
* `INFLUXDB_USERNAME` - influxdb username (required for use with influxdb backend)
* `INFLUXDB_PASSWORD` - influxdb password (required for use with influxdb backend)
* `INFLUXDB_DATABASE` - influxdb database (defaults to metrics-conveyor)

### Available Datasources
* Mixpanel
    * Event

### Available Backends
* Graphite
* InfluxDB
* Stdout

## Contributing
Please feel free to contribute by opening issues and creating pull requests!

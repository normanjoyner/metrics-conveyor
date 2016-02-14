metrics-conveyor
====================

## About

### Description
Ship metrics from a datasource to various backends. Every minute, metrics-conveyor will pull metrics from your datasource of choice and ship them to the chosen backend.

### Author
* Norman Joyner - norman.joyner@gmail.com

## Getting Started

### Installing via NPM
`npm install -g metrics-conveyor`

### Running locally
`metrics-conveyor`

## Configuration

### Environment Variables
* `BACKEND_NAME` - backend to ship metrics to (defaults to stdout)
* `GRAPHITE_HOST` - graphite server host (defaults to localhost)
* `GRAPHITE_PORT` - graphite server port (defaults to 2003)
* `INFLUXDB_HOST` - influxdb server host (defaults to localhost)
* `INFLUXDB_PORT` - influxdb server port (defaults to 8086)
* `INFLUXDB_USERNAME` - influxdb username (required for use with influxdb backend)
* `INFLUXDB_PASSWORD` - influxdb password (required for use with influxdb backend)
* `INFLUXDB_DATABASE` - influxdb database (defaults to metrics-conveyor)
* `MIXPANEL_API_KEY` -  mixpanel api key (required for use with mixpanel datasource)
* `MIXPANEL_API_SECRET` - mixpanel api secret (required for use with mixpanel datasource)
* `MIXPANEL_EVENTS` - comma delimited list of mixpanel events to pull

### Available Datasources
* Mixpanel

### Available Backends
* Graphite
* InfluxDB
* Stdout

## Contributing
Please feel free to contribute by opening issues and creating pull requests!

module.exports = {
    haproxy: require([__dirname, "haproxy"].join("/")),
    memory: require([__dirname, "memory"].join("/")),
    mixpanel: require([__dirname, "mixpanel"].join("/"))
}

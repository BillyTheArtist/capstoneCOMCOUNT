let path = require("path")

module.exports = {
    home: (req, res) => {
        res.sendFile(path.join(__dirname, "../../client/index.html"))
    },
    styles: (req, res) => {
        res.sendFile(path.join(__dirname, "../../client/styles.css"))
    },
    js: (req, res) => {
        res.sendFile(path.join(__dirname, "../../client/main.js"))
    }
}
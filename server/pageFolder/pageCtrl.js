let path = require("path")

module.exports = {
    home: (req, res) => {
        res.sendFile(path.join(__dirname, "../../client/index.html"))
    }
}
const express = require("express");
const port = process.env.PORT || 3000;
const app = express();
const history = require("connect-history-api-fallback");

app.use(history());
app.use(express.static(__dirname + "/dist/"));
app.get('/', function(req, res) {
    res.sendFile(__dirname + "/dist/index.html");
});
app.listen(port,()=>console.log(`Server started on port ${port}`));
var express = require('express');
var path = require('path');

var app = express();

var port = process.env.PORT || 3000;

// path.join(__dirname, '/dirname')
app.use(express.static(path.resolve(__dirname)));

app.listen(port, () => {
    console.log(`Server Listening on port ${port}`);
});

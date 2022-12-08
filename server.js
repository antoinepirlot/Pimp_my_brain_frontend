const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(__dirname + '/dist/pfe-frontend'));
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname +
        '/dist/pfe_frontend/index.html'));
});
app.listen(process.env.PORT || 3000);
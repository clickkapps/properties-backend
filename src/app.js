"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var body_parser_1 = require("body-parser");
require("dotenv/config");
var auth_routes_js_1 = require("./routes/auth.routes.js");
var app = (0, express_1.default)();
app.use(body_parser_1.default.json());
// Handling Cors Headers
app.use(function (_, res, next) {
    res.setHeader("Access-Control-Allow-Origin", 'localhost:3000, localhost:5000');
    res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, Accept");
    next();
});
// Authentication routes
app.use(auth_routes_js_1.default);
app.get('/', function (req, res, next) {
    res.status(200).json({ message: 'Service is running now!' });
});
app.listen(3000, function () {
    console.log('Server running on port 8000');
});

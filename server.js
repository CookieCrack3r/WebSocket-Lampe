"use strict";

// Express
const express = require("express");
const server = express();
const ip = "127.0.0.1";
const port = 8081;
server.use(express.static("public"));

// Socket
let http = require("http");
let webServer = http.Server(server);
let socketIo = require("socket.io");
let io = socketIo(webServer);

// globalen Zustand der Lampe für alle Clients festlegen
// let light = false;
io.on("connection", socket => {
    // globaler Zustand der Lampe für einen Clients festlegen
    let light = false;

    socket.on("getLight", () => {
        socket.emit("setLight",light);
    });
    socket.on("toggleLight", () => {
        light = !light;
        socket.emit("setLight",light);
    });

    socket.on("disconnect", () => {
        console.log("Client hat Verbindung unterbrochen");
    });
})

webServer.listen(port, ip, () => {
    console.log(`Server rennt auf http://${ip}:${port}/`)
});
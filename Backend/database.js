import mongoose from "mongoose";
import { config } from "./config.js";

mongoose.connect(config.db.URI);
const connection = mongoose.connection;

connection.once("connected", () => {
    console.log("Conexión a la DB establecida");
});

connection.on("disconnected", () => {
    console.log("Conexión a la DB perdida");
});

connection.on("error", (error) => {
    console.log("Error en la conexión a la DB: " + error);
});

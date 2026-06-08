import app from "./app.js";
import "./database.js";
import { config } from "./config.js";

const main = async () => {
    app.listen(config.port.PORT, () => {
        console.log(`Servidor iniciado en el puerto ${config.port.PORT}`);
    });
};

main();
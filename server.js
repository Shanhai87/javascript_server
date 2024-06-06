const http = require("http");

//обработчик маршрутов
const {routeHandler} = require("./routehandler");

//создание сервера
const server = http.createServer(routeHandler);

//запуск сервера (localhost:PORT)
const PORT = 3000;
server.listen(PORT, "127.0.0.1", () => {
    console.log(`\x1b[30mListening on \x1b[35m127.0.0.1\x1b[0m:\x1b[34m${PORT}\x1b[0m`);
});
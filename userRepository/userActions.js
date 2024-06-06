const {userRepository} = require("./userRepository");


module.exports.userActions = {

    createUser(req, res) {
        let body = "";
        req.on("data", chunk => body += chunk);
        req.on("end", async () => {
            const obj = createObjFromUrlencoded(body);
            let user = await userRepository.createUser(obj);
            setResParameters(res, user, 201);
        });
    },

    async getAllUsers(res) {
        const users = await userRepository.getAllUsers();
        setResParameters(res, users, 200);
    },

    async getUser(res, id) {
        const user = await userRepository.getUser(id);
        setResParameters(res, user, 200);
    },

    updateUser(req, res, id) {
        let body = "";
        req.on("data", chunk => body += chunk);
        req.on("end", async () => {
            const obj = createObjFromUrlencoded(body);
            const user = await userRepository.updateUser(id, obj);
            setResParameters(res, user, 201);
        });
    },

    async deleteUser(res, id) {
        const isDeleted = await userRepository.deleteUser(id);
        // код 204 не возвращает ответ
        setResParameters(res, isDeleted, 204);
    },

    notFound(res) {
        createRes(res);
    }
}

function setResParameters(res, user, code, mes) {
    if (user === null) {
        mes = {message: "server error"};
        code = 503;
    } else if (user === undefined) {
        mes = {message: "incomplete(incorrect) data"};
        code = 406;
    } else {
        mes = user;
    }
    createRes(res, code, mes);
}

function createRes(res, code = 404, end = {message: "404 Not Found"}, type = "application/json") {
    res.writeHead(code, {"Content-Type": type});
    res.end(JSON.stringify(end));
}

function createObjFromUrlencoded(data) {
    data = ("{\"" + data + "\"}").replace(/\&/g, "\",\"").replace(/\=/g, "\":\"");
    data = decodeURIComponent(data);
    let obj = JSON.parse(data);
    return obj;
}


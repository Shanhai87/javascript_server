const url = require("url");
const {userActions} = require("./userRepository/userActions");

module.exports.routeHandler = (req, res) => {
    //обрабатываемые страницы
    const allowedPaths = ["/users", "/users/"];
    
    //структура url
    const parsedUrl = url.parse(req.url, true);
    
    //адрес посещенной страницы
    const path = parsedUrl.path;

    //http-метод
    const method = req.method;

    if (allowedPaths.includes(path)) {
        if (method === "GET") userActions.getAllUsers(res); //получить всех пользователей
        else if (method === "POST") userActions.createUser(req, res); //создать пользователя
        else userActions.notFound(res); //страница не найдена
    } else if (path.startsWith(allowedPaths[1]) && (curId = checkPath(path))) {
        if (method === "GET") userActions.getUser(res, curId); //получить пользователя по id
        else if (method === "PUT") userActions.updateUser(req, res, curId); //изменить пользователя
        else if (method === "DELETE") userActions.deleteUser(res, curId); //удалить пользователя
        else userActions.notFound(res); //страница не найдена
    } else {
        userActions.notFound(res); //страница не найдена
    }

    //обрабатывается путь вида "/users/*" или "/users/*/", где * - положительное целое (user id)
    function checkPath(path) {
        const parts = path.split("/");
        if ((parts.length == 3 || parts.length == 4 && !parts[3]) && +parts[2] > 0)
            return +parts[2];
        return 0;
    }
}
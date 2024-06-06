const User = require("./user");

module.exports.userRepository = {

    users : [],
    id : 1,

    getAllUsers() {return this.users; },

    getUser(id) { return this.users.find(u => u.id === id); },

    createUser(obj) {
        const user = new User(this.id++, obj.name, obj.age);
        this.users.push(user);
        return user;
    },

    updateUser(id, obj) {
        const index = this.users.findIndex(u => u.id === id);
        if (index !== -1) {
            this.users[index].update(obj);
            return this.users[index];
        }
        return null;
    },

    deleteUser(id) {
        const index = this.users.findIndex(u => u.id === id);
        if (index !== -1) {
            this.users.splice(index, 1);
            return true;
        }
        return false;
    }
}

// module.exports = UserRepository;
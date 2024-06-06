class User {
    id;
    name;
    age;
    constructor(id, name, age) {
        this.id = id;
        this.name = name;
        this.age = age;
    }

    update(otherUser) {
        if (otherUser.name) this.name = otherUser.name;
        if (otherUser.age) this.age = otherUser.age;
    }

    toString() {
        return `id: ${this.id}, name: ${this.name}, age: ${this.age}`;
    }
}

module.exports = User;
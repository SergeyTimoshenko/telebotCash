module.exports = class Store {
    constructor() {
        this.total = 0
    }

    getTotal() {
        return this.total;
    }

    add(v) {
        this.total += v
    }

    remove(v) {
        this.total -= v
    }
}
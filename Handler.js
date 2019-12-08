const Store = require('./Store')
module.exports = class Handler {
    constructor(bot) {
        this.bot = bot;
        this.store = new Store()
        this.init()

    }

    init() {
        this.textHandler()
    }

    textHandler() {
        this.bot.on('text', (msg) => {
            let res;
            switch (msg.text[0]) {
                case '+':
                    res = this.addMoney(msg.text.substr(1));
                    break;
                case '-':
                    res = this.removeMoney(msg.text.substr(1))
                    break;
                case '=':
                    res = this.getTotal();
                    break;
                default: 
                    res = {text: 'Undefined command!'};
            }

            msg.reply.text(res.text)

        })
    }

    addMoney(text) {
        const number = Number(text)
        if (String(number) === 'NaN') {
            return this.result('Введите корректно. Например: +12.5')
        }
        this.store.add(number)
        return this.result('Ok')
    }

    removeMoney(text) {
        const number = Number(text)
        if (String(number) === 'NaN') {
            return this.result('Введите корректно. Например: +12.5')
        }
        this.store.remove(number)
        return this.result('Ok')
    }

    getTotal() {
        const count = this.store.getTotal()
        return this.result(count)
    }

    result(text) {
        return {text}
    }
}
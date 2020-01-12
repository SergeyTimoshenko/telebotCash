const Store = require('./Store')

const markupEvent = {
    keyboard: [
        ['-', '+', '=', '?']
    ]
}
const markupNUmbers = {
    keyboard: [
        [{text:'1', request_location: true},'2','3']
    ]
}
const opt = {
        reply_markup: markupEvent
           
      };

module.exports = class Handler {
    constructor(bot) {
        this.bot = bot;
        this.store = new Store()
        this.init()

    }

    init() {
        this.store.initRepo().then(() => {
            this.textHandler()
        }).catch(err => {
            console.log('initError', err)
        })
        
    }

    textHandler() {
        this.bot.on('message', async (msg) => {
            // console.log(msg.text)
            let res;
            switch (msg.text[0]) {
                case '+':
                    res = await this.addMoney(msg.text.substr(1), msg.from);
                    break;
                case '-':
                    res = await this.removeMoney(msg.text.substr(1), msg.from)
                    break;
                case '=':
                    res = await this.getTotal(msg.from);
                    console.log('yay')
                    break;
                case '?':
                    res = await this.total();
                    break;
                default:
                    res = {text: 'Undefined command!'};
            }

            this.bot.sendMessage(msg.chat.id, res.text, opt)

        })
    }

    async addMoney(v, user) {
        const number = Number(v)
        
        if(String(number) === 'NaN' || !v) {
            return {text: 'Не корректный формат'}
        }

        try {
            await this.store.addMoney(v, user);
            return {text: 'OK'}
        } catch (e) {
            return {text: 'Store error'}
        }
    }

    async removeMoney(v, user) {
        const number = Number(v)

        if(String(number) === 'NaN' || !v) {
            return {text: 'Не корректный формат'}
        }

        try {
            await this.store.removeMoney(v, user);
            return {text: 'OK'}
        } catch (e) {
            return {text: 'Store error'}
        }
    }
    async getTotal(u) {
        try {
            // console.log(this.store)
            return await this.store.total(u)
        } catch (e) {
            console.log(e)
            return {text: 'Error get total'}
        }
    }

    async total() {
        return await this.store.totalAll()
    }
}
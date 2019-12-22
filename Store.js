const Repo = require('./Repositoriy')
module.exports = class Store {
    constructor() {
        // this.total = 0
        this.repository = new Repo()
    }

    initRepo() {
        return this.repository.init()
    }

    async addMoney(v, u) {
        return await this.repository.saveTransaction({
            author: u.id,
            cost: v,
            type: '+'
        })
    }

    async removeMoney(v, u) {
        return await this.repository.saveTransaction({
            author: u.id,
            cost: v,
            type: '-'
        })
    }

    async total(u) {
        try {
            const res = await this.repository.countTotalByUserId(u.id);
            // console.log(res)
            

            return {text: this.calculateTotal(res)}
        } catch (e) {
            console.log('err', e)
        }
        

        return {text:'OkOkOk'}
    }

    async totalAll() {
        let res = await this.repository.çountTotal();
        return {text: this.calculateTotal(res)}
    }

    calculateTotal(res) {
        let allSumm = res.filter(v => v.type === '+').map(v=> v.cost)
            let allMin = res.filter(v => v.type === '-').map(v=> v.cost)

            let result = 0;
            allSumm.forEach(element => {
                result += element
            });
            allMin.forEach(el => { result -= el })
            return result
    }
}
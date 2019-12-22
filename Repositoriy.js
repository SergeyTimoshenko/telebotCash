const mongo = require('mongoose');

const transactionSchema = new mongo.Schema({
    author: Number,
    cost: Number,
    type: String
})


mongo.connect('mongodb://localhost/bot', {useNewUrlParser: true});

// var db = mongo.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   console.log('yay')
//   let tr = new transaction({
//       author:1,
//       cost: 12,
//       wallet: 'wallet'
//   })
//   tr.save()
// });

module.exports = class Repositoriy {
    constructor() {
        this.db = mongo.connection
        this.transaction = new mongo.model('Transaction', transactionSchema)

    }

    init() {
        return new Promise((r, j) => {
            this.db.on('error', () => {
                j('error')
            });
            this.db.once('open', () => {
                r(true)
            })
        })
    }

    saveTransaction(transaction) {
        return new Promise((r, j) => {
            let tr = new this.transaction(transaction);
            tr.save((err, res) => {
                if (err) return j(err)
                r(true)
            })
        })
    }

    countTotalByUserId(userId) {
        return new Promise((r, j) => {
            this.transaction.find({author: userId}).then(res => {
                r(res)
            })
        })
    }

    çountTotal(){
        return new Promise((r,j) => {
            this.transaction.find().then(res => {
                r(res)
            })
        })
    }
}

// var c = new module.exports()

// c.init().then(r => {
//     c.saveTransaction({author:2, cost: 3, wallet: 'test'}).then(res => {
//         console.log('yay')
//     }).catch(err => {
//         console.log('err saving', err)
//     })
// }).catch(err => {
//     console.log('ERROR', err)
// })
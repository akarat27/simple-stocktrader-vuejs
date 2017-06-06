const state = {
  funds: 10000,
  stocks: []
}

const mutations = {
  'BUY_STOCK' (state, {stockId, stockName, quantity, stockPrice}) {
    console.log('commit BUY_STOCK')
    const record = state.stocks.find(function (element) {
      return (element.name == stockName)
    })
    if(record) {
      record.quality += quantity
    } else {
      console.log('add new stock to portfolio')
      state.stocks.push({
        name:stockName,
        quantity: quantity
      })
    }
    state.funds -= stockPrice * quantity
  },
  'SELL_STOCKS' (state, {stockId, stockName, quantity, stockPrice}) {
    console.log('commit SELL_STOCKS')
    const record = state.stocks.find(function (element) {
      return (element.name == stockName)
    })
    if(record.quality > quantity) {
      record.quality -= quantity
    } else {
      state.stocks.splice(state.stocks.indexOf(record),1)
    }
    state.funds += stockPrice * quantity
  },
  'SET_PORTFOLIO' (state, portfolio) {
    state.funds = portfolio.funds
    state.stocks = portfolio.stockportfolio ? portfolio.stockportfolio : []
  }
}

const actions = {
  sellStock: function({commit}, order){
    commit('SELL_STOCKS', order)
  }
}

const getters = {
  // Tranform each record
  stockPortfolio: function(state, getters) {
    console.log('call getter stockPortfolio')
    const tranformRecord = state.stocks.map(function (stock) {
      const record = getters.stocks.find(function (element) {
        return element.name == stock.name
      })
      return {
        id: record.name,
        quantity: stock.quantity,
        name: record.name,
        price: record.price
      }
    })
    return tranformRecord
  },
  showFunds: function (state) {
    return state.funds
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}

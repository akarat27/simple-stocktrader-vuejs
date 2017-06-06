import Vue from 'vue'

export const loadData = function({commit}) {
  Vue.http.get('stocktrader')
    .then(function (response){
      // console.log(response.json())
      return response.json()
    }).then(function (data){
      if(data) {
        console.log(data)
        const stocks = data.message[0].stocks
        const funds = data.message[0].funds
        const stockportfolio = data.message[0].stockportfolio
        console.log(stocks)
        console.log(stockportfolio)
        const portfolio = {
          stockportfolio,
          funds
        }
        commit('SET_STOCKS', stocks);
        commit('SET_PORTFOLIO', portfolio);
      }
    })
}

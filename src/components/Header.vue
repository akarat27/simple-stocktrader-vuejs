<template>
  <el-row>
    <el-col :xs="9" :sm="11" :md="13" :lg="15" >
      <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1" ><router-link to="/">Stock Trader</router-link></el-menu-item>
        <el-menu-item index="2" ><router-link to="/portfolio">Portfolio</router-link></el-menu-item>
        <el-menu-item index="3"><router-link to="/stocks">Stocks</router-link></el-menu-item>
      </el-menu>
    </el-col>
    <el-col :xs="15" :sm="13" :md="11" :lg="9">
      <el-menu theme="dark"  class="el-menu-demo" mode="horizontal" @select="handleSelect" >
          <el-menu-item index="4">End Day</el-menu-item>
          <el-submenu index="5">
            <template slot="title">Save & Load</template>
            <el-menu-item index="5-1">save data</el-menu-item>
            <el-menu-item index="5-2">load data</el-menu-item>
          </el-submenu>
          <el-menu-item index="6"><a href="/" target="_self">Funds: {{ funds | currency }}</a></el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>
<script>
    export default {
      data() {
        return {
          activeIndex: '1'
        }
      },
      methods: {
        handleSelect(key, keyPath) {
          console.log(key, keyPath);
          if(key === '4'){
            console.log('will call endDay')
            this.endDay()
          } else if(key === '5-1') {
            this.saveData()
          } else if(key === '5-2') {
            this.loadData()
          }
        },
        saveData() {
          const data = {
            funds: this.$store.getters.showFunds,
            stockportfolio: this.$store.getters.stockPortfolio,
            stocks: this.$store.getters.stocks,
          }
          this.$http.get('stocktrader/remove',{headers: {'Content-Type': 'application/json; charset=UTF-8'}}).then(function (response) {
            console.log(response)
            this.$http.put('stocktrader', data, {headers: {'Content-Type': 'application/json; charset=UTF-8'}}).then(function (response) {
              console.log('Created ' + response.json())
            }).catch(function (response) {
              console.log(response)
            })
          }).catch(function (response) {})
        },
        loadData() {
          console.log('load data')
          return this.$store.dispatch('loadData')
        },
        endDay() {
          return this.$store.dispatch('randomizeStocks')
        }
      },
      computed: {
        funds() {
          return this.$store.getters.showFunds
        }
      }
    }
</script>
<style scoped>

</style>

<template>
  <div>
    <h1>Trade or view your portfolio</h1>
    <h6>You may save & load data</h6>
    <h6>You can click 'End day' to begin a random price for a new day</h6>
    <hr>
    <p>Your Funds {{ funds | currency }}</p>
  </div>
</template>
<script>
    export default {
      computed: {
        funds() {
          return this.$store.getters.showFunds
        }
      }
    }
</script>
<style scoped>

</style>

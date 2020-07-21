<template>
  <div class="container">
    <con-table />
  </div>
</template>

<script>
import conTable from './table'
export default {
  components: { conTable }
}
</script>

<style lang="css" scoped>
.container{
  margin: 30px;
}
@media screen and (min-width:1900px){
  .container{height: 800px;}
}
@media screen and (max-width:1400px){
  .container{height: 500px;}
}
</style>


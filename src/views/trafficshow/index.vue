<template>
  <div style="height:900px">
    <Map :series="seriesData" />
  </div>
</template>

<script>
import Map from '@/components/MigrationMap/index'
import series from './serise.js'
export default {
  components: { Map },
  data() {
    return {
      seriesData: series
    }
  }
}
</script>

<style>

</style>

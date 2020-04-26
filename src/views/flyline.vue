<template>
  <div>
    <div id="map_container"/>
    <background/>
    <go-home/>
  </div>
</template>
<script>
import Background from '@/components/background'
import GoHome from '@/components/go-home'
export default {
  name: 'Flyline',
  components: { GoHome, Background },
  data() {
    return {
      map: ''
    }
  },
  mounted() {
  },
  methods: {

  }
}
</script>

<style scoped>
  #map_container {
    width: 100%;
    height: 100%;
    margin: 0;
  }

</style>

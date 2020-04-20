<template>
  <div>
    <div class="map">
      <img src="favicon.ico">
    </div>
    <go-home/>
    <background/>

  </div>

</template>

<script>
import GoHome from '@/components/go-home'
import Background from '@/components/background'
export default {
  name: 'TestMap',
  components: { Background, GoHome }
}
</script>

<style scoped>
  .map{
    z-index: 100;
    position: fixed;
    margin-left: 50%;
    margin-top: 200px;
  }

</style>

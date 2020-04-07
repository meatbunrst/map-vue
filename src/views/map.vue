<template>
  <baidu-map
    :zoom="zoom"
    :center="center"
    :scroll-wheel-zoom="true"
    :min-zoom="9"
    :max-zoom="16"
    class="map">
    <!--  <bm-boundary :stroke-weight="2" name="北京" stroke-color="blue" stroke-style="dashed" fill-color="red"/>-->
    <bm-tile
      :is-transparent-png="true"
      tile-url-template="//developer.baidu.com/map/jsdemo/demo/tiles/{Z}/tile{X}_{Y}.png"/>
  </baidu-map>
</template>

<script>
export default {
  name: 'Map',
  data() {
    return {
      zoom: 12,
      center: {
        //    lng: 113.7840271,
      // lat: 23.05888449
        lng: 116.332782,
        lat: 40.007978
      }
    }
  },
  methods: {

  }
}
</script>

<style>
  .map {
    width: 100%;
    height: 700px;
  }
</style>

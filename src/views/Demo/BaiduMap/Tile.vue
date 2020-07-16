<template>
  <baidu-map :center="{lng: 113.930992, lat: 22.917301}" :zoom="14" class="map">
    <bm-tile
      :is-transparent-png="true"
      tile-url-template="@/assets/{14}/tile{X}_{Y}.png"/>
  </baidu-map>
</template>
<script>
export default {
  name: 'Tile'
}
</script>

<style scoped>

</style>

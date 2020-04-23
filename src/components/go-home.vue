<template>
  <div>
    <a class="home" @click="goHome"/>
    <div class="page-box">
      <a class="pre" @click="goHistory"/>
      <a class="next"/>
    </div>
  </div>

</template>

<script>

export default {
  name: 'GoHome',
  methods: {
    goHome() {
      this.$router.push({ path: '/' })
    },
    goHistory() {
      history.go(-1)
    }

  }
}
</script>

<style scoped>
  .home{ width:120px; height:120px;background: url(../assets/images/home-normal.png) no-repeat 0 0; position:fixed; left:20px; top:20px; z-index:100; }
  .home:hover{ background: url(../assets/images/home-hover.png) no-repeat 0 0; }

  .page-box{ width:159px; height:180px; position:fixed; left:180px; top:50px; z-index:100;}
  .page-box .pre{width:79px; height:60px; float:left;background: url(../assets/images/pre.png) no-repeat 0 0;}
  .page-box .next{width:80px; height:60px; float:left; background: url(../assets/images/next.png) no-repeat 0 0;}
  .page-box .pre:hover{background: url(../assets/images/pre-hover.png) no-repeat 0 0;}
  .page-box .next:hover{background: url(../assets/images/next-hover.png) no-repeat 0 0;}

</style>

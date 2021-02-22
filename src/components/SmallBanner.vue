<template>
  <section class="hero is-primary is-medium">
    <div class="hero-bg">
      <div class="hero-body"></div>  
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style scoped>
.hero {
  position: relative;
  margin-bottom: 40px;
}

.hero-bg {
  background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url("../assets/banner.jpeg");
  background-size: 100% auto;
  background-repeat: no-repeat;
  /* background-attachment: fixed; */
}
</style>
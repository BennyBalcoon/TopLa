<template>
  <section class="hero is-primary is-medium">
    <div class="hero-bg">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Bienvenue chez TopLa</h1>
          <h2 class="subtitle">Ne jetez plus ce que vous n'utilisez pas, donnez le!</h2>
        </div>
        <div class="container">
          <div class="buttons">
            <router-link v-bind:to="{ name: 'AdvertCreatePage' }" class="button is-block is-primary">Je donne</router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style scoped>
.hero {
  position: relative;
}
.hero-body {
  padding: 3rem 1.5rem;
}
.hero-bg {
  background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url("../assets/banner.jpeg");
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

.button {
  top: 4rem;
}

</style>



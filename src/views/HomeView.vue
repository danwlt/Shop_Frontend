<template>
  <div class="home space-y-8 h-screen flex flex-col items-center justify-center">
    <font-awesome-icon icon="fa-solid fa-basket-shopping" size="10x"/> 
    <p class="text-3xl font-bold">Welcome to your Bring it!</p>
    <p class="text-lg">Want to learn more about this project? Check out our<br>check out our <RouterLink class="text-main-green" to="/about">about</RouterLink> page</p>
    <p class="text-lg">Have any questions or problems? <br>check out our <RouterLink class="text-main-green" to="/contact">contact</RouterLink> page</p>
  </div>
</template>

<script>

export default {
  name: 'HomeView',
  components: {
  }
}
</script>
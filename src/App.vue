<template>
  <TopBar @logoutEvent="updateUsername" @searchEvent="updateSearchTerm" :username="username"/>
  <!--nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav-->
  <router-view @loginEvent="updateUsername" :search_term="search_term" class="pt-[84px]"/>
</template>

<script>
import TopBar from './components/TopBar.vue'

export default {
  name: 'App',
  components: {
    TopBar
  },
  data() {
    return {
      username: null,
      search_term: '',
    }
  },
  beforeMount() {
    this.username = localStorage.getItem('username');
  },
  methods: {
    updateUsername() {
      this.username = localStorage.getItem('username');
    },
    updateSearchTerm(search_term) {
      this.search_term = search_term;
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>

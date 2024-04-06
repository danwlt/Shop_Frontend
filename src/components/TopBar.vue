<template>
    <div class="bg-gray-800 text-white px-8 fixed w-full z-50">
  <div class="flex items-center justify-between">
    <div class="flex items-center space-x-4">
      <div class="text-xl font-bold">
        Bring it!
      </div>

      <nav class="space-x-4">
        <router-link to="/" class="text-gray-500 hover:text-gray-300">Home</router-link>
        <router-link to="/lists" class="text-gray-500 hover:text-gray-300">Lists</router-link>
        <router-link to="/recent" class="text-gray-500 hover:text-gray-300">Done</router-link>
        <router-link to="/about" class="text-gray-500 hover:text-gray-300">About</router-link>
        <router-link to="/contact" class="text-gray-500 hover:text-gray-300">Contact</router-link>
      </nav>
    </div>

    <div class="flex items-center space-x-4">
      <div v-if="username" class="flex items-center font-medium">
        <span class="mr-3">{{ username }}</span>
        <button @click="logout()">
          <font-awesome-icon icon="fa-solid fa-sign-out" size="xl"/>
        </button>
      </div>
      <router-link v-if="!username"  to="/login" class="flex items-center font-medium hover:font-bold hover:underline">
        <span class="mr-3">Login</span>
        <font-awesome-icon icon="fa-solid fa-circle-user" size="xl"/>
      </router-link>
    </div>
  </div>
</div>

</template>

<script>
import request from '../utils/request';

export default {
    props: {
        username: {
            type: String,
            required: true,
        },
    },
    methods: {
        async logout() {
            request.authenticatedPost('http://localhost:8081/logout', this.$cookies.get('token'), {});
            localStorage.removeItem('username');
            this.$cookies.remove('token');
            this.$emit('logoutEvent');
            this.$router.push('/login');
        }
    }
};
</script>
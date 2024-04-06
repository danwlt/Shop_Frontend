<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-12">
        <div>
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Register
          </h2>
        </div>
        <form class="mt-8 space-y-10" @submit.prevent="submit">
          <input type="hidden" name="remember" value="true">
          <div class="rounded-md shadow-sm -space-y-px">
            <div>
              <label for="username" class="sr-only">Username</label>
              <input id="username" name="username" type="text" v-model="username" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Username">
            </div>
            <div>
              <label for="password" class="sr-only">Password</label>
              <input id="password" name="password" type="password" v-model="password" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password">
            </div>
          </div>
  
          <!--div class="flex items-center justify-between">
            <div class="flex items-center">
              <input id="remember-me" name="remember_me" type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded">
              <label for="remember-me" class="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>
  
            <div class="text-sm">
              <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </a>
            </div>
          </div-->
  
          <div>
            <button type="submit" class="mb-4 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Register
            </button>
          </div>
        </form>
        <RouterLink to="/login" class="text-indigo-600">Log in</RouterLink>
      </div>
    </div>
  </template>
  
  <script>
import axios from 'axios';

  export default {
    emits: ['loginEvent'],
    data() {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      async submit() {
        
        const userData = {"username": this.username, "password": this.password};
        try{
            const response = await axios.post('http://localhost:8081/auth/register', userData,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            // Set true for secure cookie
            this.$cookies.set('token', response.data.access_token, '1d', null, null, false, 'Strict');
            this.$cookies.set('refresh_token', response.data.refresh_token, '1d', null, null, false, 'Strict');
            localStorage.setItem('username', this.username);
            this.$router.push('/lists')
            this.$emit('loginEvent');
            } catch (error) {
            console.log(error);
            alert('Invalid credentials');
        }

      },
    }
  }
  </script>
<template>
    <div>
        <div class="bg-white shadow-lg rounded-lg p-6 mx-10 my-2 grid">
            <div class="flex justify-between">
                <div>
                    <div :class="`${getBackgroundColor}-500`" class="rounded-full text-white">
                        <h2 class="text-xl font-bold mb-4">{{ shoppingList.name }}</h2>
                    </div>
                    <div class="my-7 space-y-3 text-left">
                        <p class="text-gray-600 font-bold">Owner: {{ computedOwner }}</p>
                        <p class="text-gray-600">Creation Date: {{ formattedDate }}</p>
                    </div>
                </div>
                
                <div class="space-y-5">
                    <div>
                        <span class="mx-3 font-bold">
                            {{ shoppingList.usernames.length }}
                            <font-awesome-icon icon="fa-solid fa-user" size="lg"/> 
                        </span>
                        <router-link :to="`/list/${shoppingList.shoppingListID}`" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                            <font-awesome-icon icon="fa-solid fa-magnifying-glass" size="lg"/> 
                        </router-link>
                        <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full" @click="deleteShoppingList()">
                            <font-awesome-icon icon="fa-solid fa-trash" size="lg"/> 
                        </button>
                    </div>
                    <ScoreCard :score="shoppingList.shoppingItems.length" />
                </div>
            </div>
            <TagBar :tags="shoppingList.tags" :shoppingListID="shoppingList.shoppingListID" :color="`${getBackgroundColor}-300`" />
        </div>
    </div>
</template>

<script>
import ScoreCard from './ScoreCard.vue';
import request from '../utils/request';
import { RouterLink } from 'vue-router';
import colorGenerator from '../utils/randomColor';
import TagBar from './TagBar.vue';

export default {
    emits: ['loginEvent', 'updateEvent'],
    components: {
    ScoreCard,
    RouterLink,
    TagBar
},
    props: {
        shoppingList: {
            type: Object,
            required: true,
            default: () => ({})
        },
    },
    computed: {
        formattedDate() {
            const date = new Date(this.shoppingList.creationDate);
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();
            return `${day}.${month}.${year}`;
        },
        getBackgroundColor() {
            return colorGenerator.randomColorName();
        },
        computedOwner() {
            if (this.shoppingList.owner_username === localStorage.getItem('username')) {
                return 'You';
            }
            return this.shoppingList.owner_username;
        }
    },
    methods:{
        async deleteShoppingList(){
            this.isLoading = true;
            try{
                const response = await request.authenticatedDelete(`http://localhost:8081/shoppingList/delete/${this.shoppingList.shoppingListID}`, this.$cookies.get('token'));
                if (response.status !== 200) {
                    console.log(response);
                    return;
                }
                else{
                    this.$emit('updateEvent');
                }
            }
            catch (error) {
                if (error.response && error.response.status === 403) {
                    alert('Forbidden: You do not have permission to access this resource.');
                    localStorage.removeItem('username');
                    this.$emit('loginEvent');
                    this.$router.push('/login');
                    this.$cookies.remove('token');
                } else {
                    console.log(error);
                    alert('Something went wrong. Please try again later.');
                }
            }
            finally {
                this.isLoading = false;
            }
        },
    }
}

</script>
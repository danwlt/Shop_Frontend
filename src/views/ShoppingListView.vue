<template>
    <div class="home">
        <div class="flex justify-between items-center">
            <h1 class="mx-14 my-7 text-3xl font-bold">Shopping Lists:</h1>
            <button class="mx-14 bg-gray-800 text-white rounded px-4 py-2 font-bold" @click="showDialog = true">
                NEW
                <font-awesome-icon class="mx-1" icon="fa-solid fa-plus" size="lg"/> 
            </button>
        </div>
        <LoadingScreen v-if="isLoading" />
        <div v-else-if="!isLoading && shoppingLists.length > 0">
            <div class="grid lg:grid-cols-2 gap-4">
                <ShoppingListCard @updateEvent="getShoppingLists()" v-for="list in shoppingLists" :key="list.shoppingListID" :shoppingList="list" />
            </div>
        </div>
        <div v-else>
            <p class="mx-14 my-7 text-left text-xl font-bold">You have no shopping lists yet.</p>
        </div>
        <div v-if="showDialog" class="fixed z-50 inset-0 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div class="bg-white rounded-lg px-4 pt-5 pb-4">
                <div>
                    <div class="mt-0 p-2 text-center sm:text-left">
                        <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                            Create new shopping list
                        </h3>
                        <hr>
                        <div>
                            <form>
                                <div class="my-5">
                                    <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
                                        Name
                                    </label>
                                    <input v-model="name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="flex justify-evenly">
                    <button class="w-full" @click="showDialog = false">Close</button>
                    <button class="bg-green-500 rounded w-full font-bold text-white" @click="createShoppingList()">Create</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import request from '../utils/request';
import LoadingScreen from '../components/LoadingScreen.vue';
import ShoppingListCard from '../components/ShoppingListCard.vue';

export default{
    emits: ['loginEvent'],
    components: {
        LoadingScreen,
        ShoppingListCard
    },
    data() {
        return {
            shoppingLists: {},
            isLoading: false,
            showDialog: false,
            name: '',
        }
    },
    beforeMount() {
        this.getShoppingLists();
    },
    methods:{
        async getShoppingLists(){
            this.isLoading = true;
            try{
                const response = await request.authenticatedGet('http://localhost:8081/shoppingList/getShoppingLists', this.$cookies.get('token'));
                if (response.status !== 200) {
                    console.log(response);
                    return;
                }
                else{
                    this.shoppingLists = response.data;
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
        async createShoppingList(){
            this.isLoading = true;
            try{
                const response = await request.authenticatedPost('http://localhost:8081/shoppingList/create', this.$cookies.get('token'), {
                    "name": this.name,
                });
                if (response.status !== 200) {
                    console.log(response);
                    return;
                }
                /*else{
                    this.shoppingLists = response.data;
                }*/
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
                this.showDialog = false;
                this.getShoppingLists();
            }
        },
    }
}

</script>
<template>
    <div class="home">
        <div class="flex justify-between items-center">
            <h1 class="mx-14 my-7 text-3xl font-bold">{{ list.name }}:</h1>
            <div>
                <button class="bg-gray-800 text-white rounded px-4 py-2 font-bold" @click="editMode = !editMode">
                    EDIT
                    <font-awesome-icon class="mx-1" icon="fa-solid fa-pen" size="lg"/> 
                </button>
                <button class="mr-14 ml-2 bg-gray-800 text-white rounded px-4 py-2 font-bold" @click="showDialog = true">
                    NEW
                    <font-awesome-icon class="mx-1" icon="fa-solid fa-plus" size="lg"/> 
                </button>
            </div>
        </div>
        <UserBar :users="list.usernames" :color="getBackgroundColor" :shoppingListID="list.shoppingListID" :editable="editMode"/>
        <div class="flex my-8 justify-center">
            <TagBar :editable="editMode" :shoppingListID="list.shoppingListID" :tags="list.tags" :color="`${getBackgroundColor}-300`" />
        </div>
        <hr>
        <LoadingScreen v-if="isLoading" />
        <div v-else-if="!isLoading && list.shoppingItems.length > 0">
            
            <div class="grid grid-cols-3 lg:grid-cols-7 2xl:grid-cols-12 gap-4 grid-flow-row-dense mt-5 mx-5">
                <ItemTile v-for="(item, index) in list.shoppingItems" :item="item" :key="index" :shoppingListID="list.shoppingListID" :isAddTile="false"/>
                <ItemTile :isAddTile="true" :shoppingListID="list.shoppingListID"/>
            </div>
        </div>
        <div v-else>
            <p class="mx-14 my-7 text-left text-xl font-bold">You have no items yet.</p>
        </div>
        <div v-if="showDialog" class="fixed z-50 inset-0 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="bg-white rounded-lg px-4 pt-5 pb-4 min-w-[18rem]">
            <div>
                <div class="mt-0 p-2 text-center sm:text-left">
                    <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                        Add new Item
                    </h3>
                    <hr>
                    <div>
                        <form @submit.prevent="validateForm">
                            <div class="my-5">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
                                    Name
                                </label>
                                <input v-model="name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                                <label class="block text-gray-700 text-sm font-bold my-2" for="amount">
                                    Amount
                                </label>
                                <input v-model.number="amount" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                                <p v-if="amount > 1000" class="text-red-500">Amount must be below 1000</p>
                                <label class="block text-gray-700 text-sm font-bold my-2" for="unit">
                                    Unit
                                </label>
                                <select v-model="unit" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                    <option v-for="validUnit in validUnits" :key="validUnit" :value="validUnit">
                                        {{ validUnit }}
                                    </option>
                                </select>
                            </div>
                            <div class="flex justify-evenly">
                                <button class="w-full" @click="showDialog = false">Close</button>
                                <button class="bg-green-500 rounded w-full font-bold text-white" type="submit">Add</button>
                            </div>
                        </form>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import request from '../utils/request';
import LoadingScreen from '../components/LoadingScreen.vue';
import TagBar from '../components/TagBar.vue';
import UserBar from '../components/UserBar.vue';
import randomColor from '../utils/randomColor';
import ItemTile from '../components/ItemTile.vue';

export default {
    components: {
        LoadingScreen,
        TagBar,
        UserBar,
        ItemTile
    },
    data() {
        return {
            list: {"shoppingListID":"1"},
            isLoading: true,
            showDialog: false,
            color: '',
            editMode: false,
            name: '',
            amount: 1,
            unit: '',
            validUnits: ['PIECE', 'GRAM', 'KILOGRAM', 'LITER', 'MILLILITER']
        }
    },
    async beforeMount(){
        await this.getList();
    },
    methods:{
        async getList(){
            this.isLoading = true;
            const listID = this.$route.params.id;
            try{
                const response = await request.authenticatedGet(`http://localhost:8081/shoppingList/getSingleShoppingList?shoppingListID=${listID}`, this.$cookies.get('token'));
                if (response.status !== 200) {
                    console.log(response);
                    return;
                }
                else{
                    this.list = response.data[0];
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
        validateForm() {
            if (this.amount <= 1000 && this.unit !== '' && this.name !== '') {
                this.addItem();
            }
        },
        async addItem(){
            try{
                const response = await request.authenticatedPost(`http://localhost:8081/shoppingList/addItem`, this.$cookies.get('token'), {
                    shoppingListID: this.list.shoppingListID,
                    shoppingItems: [{
                        name: this.name,
                        amount: this.amount,
                        unit: this.unit,
                    }],
                });
                if (response.status !== 200) {
                    console.log(response);
                    return;
                }
                else{
                    this.getList();
                    this.name = '';
                    this.amount = 1;
                    this.unit = '';
                    this.showDialog = false;
                }
            }
            catch (error) {
                if (error.response && error.response.status === 403) {
                    alert('Forbidden: You do not have permission to access this resource.');
                } else {
                    console.log(error);
                    alert('Something went wrong. Please try again later.');
                }
            }
        }
    },
    computed: {
        getBackgroundColor() {
            return randomColor.randomColorName();
        },
    },
};
</script>
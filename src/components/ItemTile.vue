<template>
    <div v-if="!isAddTile" class="bg-gray-800 text-white rounded-xl p-4 space-y-4 shadow-xl transform transition duration-500 ease-in-out hover:scale-105 hover:shadow-2xl space-y-1 font-mono" @mouseover="hover = true" @mouseleave="hover = false">
        <p v-if="!checked" class="font-bold">{{ item.name }}</p>
        <p v-if="!checked">{{ item.amount }} - {{ item.unit }}</p>
        <button :disabled="checked" @click="removeItem()" class="flex w-full justify-center items-center" :class="{ 'h-full': checked }">
            <font-awesome-icon class="px-12 py-2" :class="{ 'transform transition duration-500 ease-in-out bg-white rounded-2xl text-black': hover & !checked, 'rounded-2xl text-2xl transform transition duration-500 ease-in-out scale-y-100': checked }" icon="fa-check" :bounce="hover && !checked" />
        </button>
    </div>
    <div v-else class="bg-gray-800 text-white rounded-xl p-4 space-y-4 shadow-xl transform transition duration-500 ease-in-out hover:scale-105 hover:shadow-2xl space-y-1 font-mono" @mouseover="hover = true" @mouseleave="hover = false">
        <button :disabled="checked" @click="showDialog = true" class="flex w-full justify-center items-center h-full">
            <font-awesome-icon class="px-12 py-2" :class="{ 'transform transition duration-500 ease-in-out bg-white rounded-2xl text-black': hover & !checked, 'rounded-2xl text-2xl transform transition duration-500 ease-in-out scale-y-100': checked }" icon="fa-plus" :bounce="hover && !checked" size="lg"/>
        </button>
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
</template>

<script>
import request from '../utils/request';

export default {
    data() {
        return {
            hover: false,
            checked: false,
            showDialog: false,
            name: '',
            amount: 1,
            unit: '',
            validUnits: ['PIECE', 'GRAM', 'KILOGRAM', 'LITER', 'MILLILITER']
        }
    },
    props: {
        shoppingListID: {
            type: String,
            required: true,
        },
        item: {
            type: Object,
            required: false,
        },
        isAddTile: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        async removeItem() {
            this.checked = true;
            const data = {
                shoppingListID: this.shoppingListID,
                shoppingItems: [this.item],
            }
            try{
                const response = await request.authenticatedDeleteWithBody(`http://localhost:8081/shoppingList/removeItem`, data, this.$cookies.get('token'));
                if (response.status !== 200) {
                    console.log(response);
                    return;
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
        },
        validateForm() {
            if (this.amount <= 1000 && this.unit !== '' && this.name !== '') {
                this.addItem();
            }
        },
        async addItem(){
            try{
                const response = await request.authenticatedPost(`http://localhost:8081/shoppingList/addItem`, this.$cookies.get('token'), {
                    shoppingListID: this.shoppingListID,
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
                    location.reload();
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
    }
}
</script>
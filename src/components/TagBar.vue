<template>
    <div class="flex space-x-2 h-6 items-center" :class="{ 'cursor-wait': isLoading }">
        <div v-for="(tag, index) in tags" :key="index" class="min-w-16">
            <div class="flex rounded px-2" :class="color">#{{ tag }}
                <button v-if="editable" @click="deleteTag(index)">
                    <font-awesome-icon class="ml-2 mr-1 flex" icon="fa-solid fa-x" size="sm"/> 
                </button>
            </div>
        </div>
        <button v-if="editable" @click="showDialog = true" class="flex items-center">
            <font-awesome-icon class="rounded-3xl" icon="fa-solid fa-plus" size="lg"/>
        </button>
    </div>
    <div v-if="showDialog" class="fixed z-50 inset-0 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="bg-white rounded-lg px-4 pt-5 pb-4">
            <div>
                <div class="mt-0 p-2 text-center sm:text-left">
                    <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                        Add new Tag
                    </h3>
                    <hr>
                    <div>
                        <form>
                            <div class="my-5">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
                                    Name
                                </label>
                                <input v-model="newTag" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="flex justify-evenly">
                <button class="w-full" @click="showDialog = false">Close</button>
                <button class="bg-green-500 rounded w-full font-bold text-white" @click="addTag()">Add</button>
            </div>
        </div>
    </div>
</template>

<script>
import request from '../utils/request';

export default {
    data() {
        return {
            isLoading: false,
            newTag: '',
            showDialog: false,
        }
    },
    props: {
        shoppingListID:{
            type: String,
            required: true,
        },
        tags: {
            type: Object,
            default: () => ({}),
        },
        color:{
            type: String,
            default: 'bg-gray-300',
        },
        editable: {
            type: Boolean,
            default: false,
        },
    },
    methods:{
        async addTag(){
            this.isLoading = true;
            try{
                const response = await request.authenticatedPost(`http://localhost:8081/shoppingList/addTag`, this.$cookies.get('token'), {
                    shoppingListID: this.shoppingListID,
                    tags: [this.newTag],
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
            finally {
                this.isLoading = false;
            }
        },
        async deleteTag(index){
            this.isLoading = true;
            try{
                const response = await request.authenticatedDelete(`http://localhost:8081/shoppingList/removeTag/${this.shoppingListID}?tag=${this.tags[index]}`, this.$cookies.get('token'));
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
            finally {
                this.isLoading = false;
            }
        },
    }
};

</script>
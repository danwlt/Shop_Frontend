<template>
    <div class="home">
        <div class="flex justify-between items-center">
            <h1 class="mx-14 my-7 text-3xl font-bold">Top 6 most bought items:</h1>
        </div>
        <div v-if="!isLoading && topList.length > 0" class="grid grid-cols-3 lg:grid-cols-6 gap-4 grid-flow-row-dense mt-5 mx-5">
            <RecentTile v-for="(item, index) in topList" :item="item" :key="index"/>
        </div>
        <div v-else>
            <p class="mx-14 my-7 text-left text-xl font-bold">You have no items yet.</p>
        </div>
        <hr class="mt-5">
        <LoadingScreen v-if="isLoading" />
        <div v-else-if="!isLoading && list.length > 0">
            <div class="flex justify-between items-center">
                <h1 class="mx-14 my-7 text-3xl font-bold">Recently bought items:</h1>
            </div>
            
            <div class="grid grid-cols-3 lg:grid-cols-6 2xl:grid-cols-12 gap-4 grid-flow-row-dense mt-5 mx-5">
                <RecentTile v-for="(item, index) in list" :item="item" :key="index"/>
            </div>
        </div>
        <div v-else>
            <p class="mx-14 my-7 text-left text-xl font-bold">You have no items yet.</p>
        </div>
    </div>
</template>

<script>
import request from '../utils/request';
import LoadingScreen from '../components/LoadingScreen.vue';
import RecentTile from '../components/RecentTile.vue';

export default {
    components: {
        LoadingScreen,
        RecentTile
    },
    data() {
        return {
            topList: {},
            list: {},
            isLoading: true,
        }
    },
    beforeMount(){
        this.getTopList();
        this.getList();
    },
    methods:{
        async getTopList(){
            this.isLoading = true;
            try{
                const response = await request.authenticatedGet(`http://localhost:8081/recent/getTopRecentItems`, this.$cookies.get('token'));
                if (response.status !== 200) {
                    console.log(response);
                    return;
                }
                else{
                    this.topList = response.data;
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
        async getList(){
            this.isLoading = true;
            try{
                const response = await request.authenticatedGet(`http://localhost:8081/recent/getRecentItems`, this.$cookies.get('token'));
                if (response.status !== 200) {
                    console.log(response);
                    return;
                }
                else{
                    this.list = response.data;
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
};
</script>
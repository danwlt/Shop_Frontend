<template>
    <div class="flex justify-center mb-10 mt-5">
        <button @click="navigateToPage(currentPage - 1)" :disabled="currentPage === 1" class="w-8 h-8 m-1">
            &lt;
        </button>
        <div v-for="pageNumber in totalPages" :key="pageNumber">
            <button @click="navigateToPage(pageNumber)" :class="{ 'bg-main-green': currentPage === pageNumber }" class="w-8 h-8 m-1 border border-gray-300 hover:bg-gray-500">
            {{ pageNumber }}
            </button>
        </div>
        <button @click="navigateToPage(currentPage + 1)" :disabled="currentPage === totalPages" class="w-8 h-8 m-1">
            &gt;
        </button>
    </div>
</template>

<script>
export default {
    props: {
        currentPage: {
            type: Number,
            required: true
        },
        totalPages: {
            type: Number,
            required: true
        }
    },
    methods: {
        navigateToPage(newPage) {
            if (newPage >= 1 && newPage <= this.totalPages && newPage !== this.currentPage) {
                this.$emit('page-change', newPage);
            }
        },
    },
};
</script>
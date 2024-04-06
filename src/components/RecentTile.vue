<template>
    <div class="bg-gray-800 text-white rounded-xl p-4 space-y-4 shadow-xl transform transition duration-500 ease-in-out hover:scale-105 hover:shadow-2xl space-y-1 font-mono" @mouseover="hover = true" @mouseleave="hover = false">
        <p class="font-bold">{{ itemName }}</p>
        <p>Purchases: {{ item.purchases }}</p>
    </div>
</template>

<script>
export default {
    props: {
        item: {
            type: Object,
            required: true,
            default: () => ({})
        },
    },
    computed: {
        itemName(){
            return this.item.name.charAt(0).toUpperCase() + this.item.name.slice(1);
        }
    }
}
</script>
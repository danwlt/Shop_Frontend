<template>
    <div class="flex justify-center items-center">
        <div class="relative w-24 h-24">
            <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <div class="flex items-center justify-center">
                    <span class="text-3xl font-bold mr-1">{{ score }}</span>
                    <font-awesome-icon icon="fa-solid fa-basket-shopping" size="lg"/> 
                </div>
            </div>
            <div class="absolute top-0 left-0 w-full h-full">
                <svg class="w-full h-full" viewBox="0 0 100 100">
                    <circle class="text-gray-200" cx="50" cy="50" r="45" fill="none" stroke-width="10" />
                    <circle :class="ratingColor" cx="50" cy="50" r="45" fill="none" stroke-width="10" stroke-dasharray="283" :stroke-dashoffset="283 - (adjustedScore / 100 * 283)" />
                </svg>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        score: {
            type: Number,
            required: true,
        },
    },
    computed: {
        ratingColor() {
            if (this.score < 25) {
                return 'text-green-500 stroke-current';
            } else if (this.score < 50) {
                return 'text-yellow-500 stroke-current';
            } else {
                return 'text-red-500 stroke-current';
            }
        },
        adjustedScore() {
            if(this.score > 100){
                return 100;
            }
            return this.score;
        }
    }

};
</script>
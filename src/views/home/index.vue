<template>
    <div class="home">
        home

    </div>
</template>

<script setup>
import {getmajorType} from '@/api/training.js'
getmajorType().then(res =>{
    console.log(res)
})
</script>

<style lang="scss" scoped>
.home{
    position: relative;
}
</style>
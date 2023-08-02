<template>
    <div class="d-flex">
        <input type="text" v-model="google" placeholder="Click to search" class="form-control me-2">
        <button @click="seek" class="btn btn-primary">Search</button>
    </div>
</template>

<script>
export default {
    data(){
        return{
            google: "",
        }
    },
    methods:{
        seek(){
            this.$emit("search", this.google)
        }
    }
}
</script>

<style>
input{
    position: relative;
    display: flex;
    flex: 0.10 1 auto;
    justify-content: flex-end;
}
</style>
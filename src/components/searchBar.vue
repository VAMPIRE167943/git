<template>
    <div style="display: flex;">
        <input type="text" v-model="google" placeholder="Click to search">
        <button @click="seek">Search</button>
    </div>
</template>

<script>
export default {
    data(){
        return{
            google: "",
        }
    },
    props:[
        "test"
    ],
    methods:{
        seek(){
            this.$emit("look", this.google)
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
<template>
    <div>
        <h3>
            Filter Issues
        </h3>
        <label>
            <input type="radio" v-model="hide" value="open" @change="HideAndSeek">
            Open
        </label>
        <label>
            <input type="radio" v-model="hide" value="closed" @change="HideAndSeek">
            Closed
        </label>
    </div>
</template>

<script>
export default {
    data(){
        return{
            filter: "open"
        }
    },
    methods:{
        HideAndSeek(){
            this.$emit("seeker-swap", this.filter)
        }
    }
}
</script>

<style>

</style>
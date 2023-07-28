<template>
 <div>
    <ul v-if="repos.length > 0">
        <li v-for="repo in repos" :key="repo.id" @click="stalk(repo)" v-html="repo.name"></li>
    </ul>
    <div v-else>
        Found 0.
    </div>
 </div>
</template>

<script>
export default {
    props:{
        repos:{
            type: Array,
            required: true,
            default: function(){
                return []
            }
        }
    },
    methods:{
        stalk(repo){
            this.$emit("stalkem-repos", repo)
        }
    }
}
</script>

<style>

</style>
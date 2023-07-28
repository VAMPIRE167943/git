<template>
 <div>
    <ul v-if="repos.length > 0">
        <li v-for="repo in repos" :key="repo.id" @click="stalk(repo)" >
            <RouterLink :to="`/repository/${repo.owner}/${repo.name}`">
                {{ repo.name }}
            </RouterLink>
        </li>
    </ul>
    <div v-else>
        Found 0.
    </div>
 </div>
</template>

<script>
import {RouterLink} from "vue-router"
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
            this.$emit("stalkem-repo", repo)
        }
    },
    components:{
        RouterLink
    }
}
</script>

<style>

</style>
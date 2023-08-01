<template>
 <div>
    <ul v-if="repopages.length > 0">
        <li v-for="repo in repopages" :key="repo.id" @click="stalk(repo)" >
            <RouterLink :to="`/repository/${repo.owner}/${repo.name}`">
                {{ repo.name }}
            </RouterLink>
        </li>
    </ul>
    <div v-else>
        Found 0.
    </div>
    <div v-if="pages > 1">
        <button @click="back" :diabled="page === 1">Previous Page</button>
        <span>Page {{ page }} of {{ pages }}</span>
        <button @click="forward" :disabled="page === pages">Next</button>
    </div>
 </div>
</template>

<script>
import {RouterLink} from "vue-router"
export default {
    emits:["stalkrepo"],
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
            this.$emit("stalkrepo", repo)
        },
        back(){
            if(this.page > 1){
                this.page--
            }
        },
        forward(){
            if(this.page < this.pages){
                this.page++
            }
        }
    },
    components:{
        RouterLink
    },
    data(){
        return{
            page: 1,
            pagethings: 10
        }
    },
    computed:{
        pages(){
            return Math.ceil(this.repos.length / this.pagethings)
        },
        repopages(){
            var beninging = (this.page - 1) * this.pagethings
            return this.repos.slice(beninging, beninging + this.pagethings)
        }
    }
}
</script>

<style>

</style>
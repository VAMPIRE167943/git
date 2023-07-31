<template>
    <div>
        <h3>Issues List</h3>
        <div v-if="loading">Loading...</div>
        <ul v-else-if="problems.length > 0">
            <li v-for="problem in problemhider" :key="problem.id">
            <p>
                <strong>
                    Title:
                </strong>
                {{ problem.title }}
            </p>
            <p>
                <strong>
                    State:
                </strong>
                {{ problem.state }}
            </p>
        </li>
        </ul>
        <div v-else>
            0 problems...in your imagination
        </div>
        <RouterLink :to="`/repository/${owner}/${name}`">Back to Repo</RouterLink>
        <div v-if="error">{{ error.message }}</div>
    </div>
</template>

<script>
import {RouterLink} from "vue-router"
import axios from "axios"

export default {
    props:{
        owner: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        hider:{
            type: String,
            required: true
        }
    },
    components:{
        RouterLink
    },
    data(){
        return{
            problems: [],
            loading: false,
            error: null
        }
    },
    computed: {
        problemhider() {
            return this.problems.filter((problem) => problem.state === this.hider);
        }
    },
    watch: {
        owner: "getproblems",
        name: "getproblems",
        hider: "getproblems"
    },
    methods:{
        getproblems(){
            this.loading = true
            this.error = null
            this.problems = []
            if(this.owner && this.name && (this.hider === "open" || this.hider === "closed")){
                var url = `https://api.github.com/search/issues?q=repo:${this.owner}/${this.name}+state:${this.hider}`
                axios.get(url).then((res) => {
                    this.problems = res.data.items
                    this.loading = false
                }).catch((err) => {
                    console.log("Failure: ", err)
                    this.error = err
                    this.loading = false
                })
            }else{
                this.loading = false
            }
        }
    }
}
</script>

<style>

</style>
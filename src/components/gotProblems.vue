<template>
    <div>
        <div v-if="selecrepo">
            <h3>Issues List</h3>
            <div v-if="loading" class="alert alert-info">Loading...</div>
            <ul v-else-if="problemhider.length > 0" class="list-group">
                <li v-for="problem in problemhider" :key="problem.id" class="list-group-item">
                    <p><strong>Title:</strong> {{ problem.title }}</p>
                    <p><strong>State:</strong> {{ problem.state }}</p>
                </li>
            </ul>
            <div v-else class="alert alert-warning">0 problems... in your imagination</div>
            <router-link :to="`/repository/${selecrepo.owner.login}/${selecrepo.name}`">Back to Repo</router-link>            <div v-if="error">{{ error.message }}</div>
            <div v-if="error" class="alert alert-danger">{{ error.message }}</div>
        </div>
    </div>
</template>

<script>
// import axios from "axios"

export default {
    props:{
        selecrepo:{
            type: Object,
            required: true
        },
        hider:{
            type: String,
            required: true
        }
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
        selecrepo: {
            immediate: true,
            handler: "getproblems"
        },
        hider: {
            immediate: true,
            handler: "getproblems"
        }
    },
    methods:{
        async getproblems(){
            this.loading = true
            this.error = null
            this.problems = []
            if(this.selecrepo && this.hider === "open" || this.hider === "closed"){
                var url = `https://api.github.com/search/issues?q=repo:${this.selecrepo.owner.login}/${this.selecrepo.name}+state:${this.hider}`
                try{
                    var res = await fetch(url)
                    var data = await res.json()
                    this.problems = data.items
                    this.loading = false
                }catch(err){
                    console.log("Failure", err)
                    this.error = err
                    this.loading = false
                }
                // fetch(url).then((res) => {
                //     if(!res.ok){
                //         throw new Error("Bad network! Bad!")
                //     }
                //     return res.json()
                // }).then((data) => {
                //     this.problems = data.items
                //     this.loading = false
                // }).catch((err) => {
                //     console.log("Failure: ", err)
                //     this.error = err
                //     this.loading = false
                // })
            }else{
                this.loading = false
            }
        }
    },
    created(){
        this.getproblems()
    }
}
</script>
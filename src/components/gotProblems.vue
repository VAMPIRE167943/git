<template>
    <div>
        <h3>Issues List</h3>
        <ul v-if="problems.length > 0">
            <li v-for="problem in problems" :key="problem.id">
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
    </div>
</template>

<script>
import {RouterLink} from "vue-router"
export default {
    props:{
        problems:{
            type: Array,
            required: true,
            default: function(){
                return []
            }
        },
        owner: String,
        name: String
    },
    components:{
        RouterLink
    }
}
</script>

<style>

</style>
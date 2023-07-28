<template>
    <div v-if="repo">
        <h2 v-html="repo.name"></h2>
        <p>
            <strong>
                Description:
            </strong>
            {{ repo.description }}
        </p>
        <p>
            <strong>
                URL:
            </strong>
            <a :href="repo.html_url" target="_blank">{{ repo.html_url }}</a>
        </p>
        <p>
            <strong>
                Forks Count:
            </strong>
            {{ repo.forks_count }}
        </p>
        <p>
            <strong>
                Stargazers Count:
            </strong>
            {{ repo.stargazers_count }}
        </p>
        <p>
            <strong>
                Open Issues Count:
            </strong>
            {{ repo.open_issues_count }}
        </p>
        <div v-if="problems">

        </div>
        <div v-else>
            0 repos selected.
        </div>
        <RouterLink :to="`/repository/${owner}/${name}/issues`">View Issues</RouterLink>
    </div>
</template>

<script>
import {RouterLink} from "vue-router"
export default {
    props:{
        repo:{
            type: Object,
            required: true,
            default: null
        },
        problems:{
            type: Array,
            required: false,
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
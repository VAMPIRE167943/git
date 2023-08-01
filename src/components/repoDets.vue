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
        <p>
            <strong>
                Language:
            </strong>
            {{ repo.language }}
        </p>
        <p>
            <strong>
                License:
            </strong>
            {{ repo.license ? repo.license.name : "N/A" }}
        </p>
        <p>
            <strong>
                Last Updated:
            </strong>
            {{ repo.updated_at }}
        </p>
        <p>
            <strong>
                Watchers Count:
            </strong>
            {{ repo.watchers_count }}
        </p>
        <p>
            <strong>
                Default Branch:
            </strong>
            {{ repo.default_branch }}
        </p>
        <div v-if="problems">

        </div>
        <div v-else>
            0 repos selected.
        </div>
        <router-link :to="`/repository/${repo.owner.login}/${repo.name}/issues`">View Issues</router-link>
    </div>
</template>

<script>
// import {RouterLink} from "vue-router"
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
    // components:{
    //     RouterLink
    // },
    mounted(){
        console.log("Mounted", this.repo)
    }
}
</script>

<style>

</style>
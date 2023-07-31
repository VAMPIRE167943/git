<template>
  <div>
    <SearchBar @search="seek"></SearchBar>
    <RepoList :repos="searchres" @stalkrepo="handlechoice"></RepoList>
    <RepoDets v-if="selecrepo" :repo="selecrepo"></RepoDets>
    <GotProblems v-if="selecrepo" :owner="selecrepo.owner.login" :name="selecrepo.name" :hider="problemhider" @updateproblems="therapy"></GotProblems>
    <ProblemHider v-if="problemsvisible" @hideproblems="therapy"></ProblemHider>
    <div v-if="loadrepos">
      Loading...
    </div>
    <div v-if="loadproblems">
      Loading...
    </div>
    <div v-if="err.look">
      <p>
        Failed getting repos: {{ err.look.message }}
      </p>
    </div>
    <div v-if="err.problems">
      <p>
        Failed getting problems: {{ err.problems.message }}
      </p>
    </div>
  </div>
  <ProblemsChart :chartstats="chartdata"></ProblemsChart>
</template>

<script>
import GotProblems from './components/gotProblems.vue';
import ProblemHider from './components/problemHider.vue';
import ProblemsChart from './components/problemsChart.vue';
import RepoDets from './components/repoDets.vue';
import RepoList from './components/repoList.vue';
import SearchBar from './components/searchBar.vue';
// import axios from "axios"

export default {
  components: {
    SearchBar,
    RepoList,
    RepoDets,
    ProblemHider,
    GotProblems,
    ProblemsChart
},
  data(){
    return{
      chartdata: {
        labels: ["Open", "Closed"],
        datasets: [
          {
            data: [],

          }
        ]
      },
      searchres: [],
      selecrepo: null,
      problemsvisible: false,
      owner: "",
      reponame: "",
      problemhider: "open",
      loadrepos: false,
      loadproblems: false,
      err:{
        look: null,
        problems:null
      }
    }
  },
  methods:{
    seek(google, page = 1, perpage = 10){
      this.err.look = null
      this.loadrepos = true
      fetch(`https://api.github.com/search/repositories?q=${google}&page=${page}&per_page=${perpage}`).then((res) => res.json()).then((data) => {
        this.searchres = data.items
        this.loadrepos = false
      }).catch((err) => {
        console.log("Failed: ", err)
        this.err.look = err
        this.loadrepos = false
      })
    },
    handlechoice(repo){
      this.selecrepo = repo
      this.getproblems(repo.owner.login, repo.name, this.problemhider)
    },
    getproblems(owner, name, hide, page = 1, perpage = 10){
      this.err.problems = null
      this.loadproblems = true
      fetch(`https://api.github.com/repos/${owner}/${name}/issues?state=${hide}&page=${page}&per_page=${perpage}`).then((res) => res.json()).then((data) => {
        this.problems = data
        this.loadproblems = false
      }).catch((err) => {
        console.log("Failure: ", err)
        this.err.problems = err
        this.loadproblems = false
      })
    },
    therapy(hide){
      this.problemhider = hide
      if(this.selecrepo){
        this.getproblems(this.selecrepo.owner.login, this.selecrepo.name, hide)
      }
    },
    showdets(repo){
      this.selecrepo = repo
    },
    showproblems(owner, name){
      this.owner = owner,
      this.reponame = name,
      this.problemsvisible = true
    }
  }
}
</script>

<style>

</style>

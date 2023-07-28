<template>
<SearchBar></SearchBar>
<RepoList></RepoList>
<RepoDets></RepoDets>
<ProblemHider></ProblemHider>
<GotProblems></GotProblems>
</template>

<script>
import GotProblems from './components/gotProblems.vue';
import ProblemHider from './components/problemHider.vue';
import RepoDets from './components/repoDets.vue';
import RepoList from './components/repoList.vue';
import SearchBar from './components/searchBar.vue';


export default {
  components: {
    SearchBar,
    RepoList,
    RepoDets,
    ProblemHider,
    GotProblems
}
}
</script>

<style>

</style>

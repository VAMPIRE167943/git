<template>
  <div class="container mt-4">
    <SearchBar @search="seek"></SearchBar>
    <div class="row">
      <div class="col-md-6">
        <RepoList :repos="searchres" :pagethings="10" @stalkrepo="showproblems"></RepoList>
      </div>
      <div class="col-md-6">
        <RepoDets v-if="selecrepo" :repo="selecrepo"></RepoDets>
        <GotProblems v-if="selecrepo && problemsvisible" :key="allproblems.length" :selecrepo="selecrepo"
          :hider="problemhider" @hideproblems="updateProblemHider" @pagechange="handlePageChange"></GotProblems>
        <ProblemHider v-if="problemsvisible && selecrepo" :selecrepo="selecrepo" :hider="problemhider"
          @hideproblems="updateProblemHider"></ProblemHider>
      </div>
    </div>
    <div v-if="loadrepos">
      <div class="alert alert-info mt-3">Loading...</div>
    </div>
    <div v-if="loadproblems">
      <div class="alert alert-info mt-3">Loading...</div>
    </div>
    <div v-if="err.look">
      <div class="alert alert-danger mt-3">Failed getting repos: {{ err.look.message }}</div>
    </div>
    <div v-if="err.problems">
      <div class="alert alert-danger mt-3">Failed getting problems: {{ err.problems.message }}</div>
    </div>
    <!-- <ProblemsChart :selecrepo="selecrepo"></ProblemsChart> -->
  </div>
</template>

<script>
import GotProblems from './components/gotProblems.vue';
import ProblemHider from './components/problemHider.vue';
// import ProblemsChart from './components/problemsChart.vue';
import RepoDets from './components/repoDets.vue';
import RepoList from './components/repoList.vue';
import SearchBar from './components/searchBar.vue';

export default {
  components: {
    SearchBar,
    RepoList,
    RepoDets,
    ProblemHider,
    GotProblems,
    // ProblemsChart
  },
  data()
  {
    return {
      problems: [],
      searchres: [],
      selecrepo: null,
      problemsvisible: true,
      owner: "",
      reponame: "",
      problemhider: "open",
      loadrepos: false,
      loadproblems: false,
      err: {
        look: null,
        problems: null,
      },
      currentPage: 1,
      perPage: 10
    };
  },
  computed: {
    allproblems()
    {
      return this.problems
    },
    totalPages()
    {
      return Math.ceil(this.searchres.length / this.perPage);
    },
    paginatedRepos()
    {
      if (this.searchres.length === 0)
      {
        return [];
      }
      const start = (this.currentPage - 1) * this.perPage;
      return this.searchres.slice(start, start + this.perPage);
    },
  },
  methods: {
    // async seek(google, page = 1, perpage = 100)
    // {
    //   this.err.look = null;
    //   this.loadrepos = true;
    //   try{
    //     var allrepos = []
    //     var currentPage = 1
    //     var totalPages = 1
    //     var token = "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";
    //     while (currentPage <= totalPages)
    //     {
    //       var res = await fetch(
    //         `https://api.github.com/search/repositories?q=${google}&page=${page}&per_page=${perpage}`,
    //         {
    //           headers: {
    //             Authorization: `token ${token}`
    //           }
    //         }
    //         )
    //         if (!res.ok)
    //         {
    //           throw new Error("Failed to get repos")
    //         }
    //         var data = await res.json()
    //   // }

    //   // }
    //   // try
    //   // {
    //   //   this.searchres = data.items
    //   //   this.loadrepos = false;
    //   // } catch (err)
    //   // {
    //   //   console.log("Failed: ", err);
    //   //   this.err.look = err;
    //   //   this.loadrepos = false;
    //   // }
    // },
    async seek(google)
    {
      this.err.look = null;
      this.loadrepos = true;

      try
      {
        var token = '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';
        var currentPage = 1;
        var allrepos = [];
        var delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        //eslint-disable-next-line
        while (true)
        {
          var res = await fetch(
            `https://api.github.com/search/repositories?q=${google}&page=${currentPage}&per_page=${this.perPage}`,
            {
              headers: {
                Authorization: `token ${token}`,
              },
            }
          );
          if (!res.ok)
          {
            throw new Error('Failed to get repos');
          }
          var data = await res.json();
          allrepos.push(...data.items);
          currentPage++;
          var linkHeader = res.headers.get('Link');
          if (!linkHeader || !linkHeader.includes('rel="next"'))
          {
            break;
          }
          await delay(500);
        }
        this.searchres = allrepos.map((repo) => ({
          name: repo.name,
        }));
      } catch (err)
      {
        console.log('Failure: ', err);
        this.err.look = err;
      }
      this.loadrepos = false;
    },
    showproblems(repo)
    {
      this.selecrepo = repo
      this.problemhider = "open";
    },
    updateProblemHider(hide)
    {
      this.problemhider = hide
      if (this.selecrepo)
      {
        this.getproblems(this.selecrepo.owner.login, this.selecrepo.name, hide);
      }
    },
    async getproblems(owner, name, hide, page = 1, perpage = 10)
    {
      this.err.problems = null;
      this.loadproblems = true;
      try
      {
        var token = "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";
        var res = await fetch(`https://api.github.com/repos/${owner}/${name}/issues?state=${hide}&page=${page}&per_page=${perpage}`, {
          headers: {
            Authorization: `token ${token}`,
          },
        })
        if (!res.ok)
        {
          throw new Error("Failed to fetch issues.");
        }
        var data = await res.json()
        this.selecrepo.problems = data;
        this.loadproblems = false;
      } catch (err)
      {
        console.log("Failure: ", err);
        this.err.problems = err;
        this.loadproblems = false;
      }
    },
    handlePageChange(page)
    {
      this.currentPage = page;
      if (this.selecrepo)
      {
        this.getproblems(this.selecrepo.owner.login, this.selecrepo.name, this.problemhider, page);
      }
    }
  },
};
</script>
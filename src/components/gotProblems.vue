<template>
  <div class="container mt-4">
    <div v-if="selecrepo">
      <h3>Issues List</h3>
      <div v-if="loading" class="alert alert-info">Loading...</div>
      <ul v-if="visibleProblems.length > 0" class="list-group">
        <li v-for="problem in visibleProblems" :key="problem.id" class="list-group-item">
          <p><strong>Title:</strong> {{ problem.title }}</p>
          <p><strong>State:</strong> {{ problem.state }}</p>
        </li>
      </ul>
      <div v-else class="alert alert-warning">0 problems... in your imagination</div>
      <div v-if="visibleProblems.length > 0">
        <router-link :to="`/repository/${selecrepo.owner.login}/${selecrepo.name}`" class="btn btn-secondary mt-3">Back to
          Repo</router-link>
      </div>
      <div v-if="error" class="alert alert-danger">{{ error.message }}</div>
      <div class="pagination-container">
        <nav class="pagination-content" aria-label="Page navigation">
          <ul class="pagination justify-content-center">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <a class="page-link" href="#" @click="goToPage(currentPage - 1)" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
                <span class="sr-only"> Previous</span>
              </a>
            </li>
            <li class="page-item" v-for="pageNumber in totalPages" :key="pageNumber"
              :class="{ active: pageNumber === currentPage }">
              <a class="page-link" href="#" @click="goToPage(pageNumber)">{{ pageNumber }}</a>
            </li>
            <li class="page-item" :class="{ disabled: currentPage === totalPages }">
              <a class="page-link" href="#" @click="goToPage(currentPage + 1)" aria-label="Next">
                <span class="sr-only">Next </span>
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selecrepo: {
      type: Object,
      required: true,
    },
    hider: {
      type: String,
      required: true,
    },
  },
  data()
  {
    return {
      loading: false,
      currentPage: 1,
      perPage: 10,
      allproblems: [],
      error: null,
    };
  },
  computed: {
    hasPages()
    {
      return this.allproblems.length > 0
    },
    totalPages()
    {
      return Math.ceil(this.allproblems.length / this.perPage);
    },
    visibleProblems()
    {
      if (this.allproblems.length === 0)
      {
        return []
      }
      var startIndex = (this.currentPage - 1) * this.perPage;
      return this.allproblems.slice(startIndex, startIndex + this.perPage);
    }
  },
  methods: {
    async fetchProblems()
    {
      this.loading = true;
      this.error = null;
      try
      {
        var owner = this.selecrepo.owner.login;
        var name = this.selecrepo.name;
        var token = "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";
        var everyproblem = []
        var currentPage = 1
        var totalPages = 1
        while (currentPage <= totalPages)
        {
          var res = await fetch(
            `https://api.github.com/repos/${owner}/${name}/issues?state=${this.hider}&per_page=${this.perPage}&page=${this.currentPage}`,
            {
              headers: {
                Authorization: `token ${token}`,
              },
            }
          );
          if (!res.ok)
          {
            throw new Error("Failed to fetch issues.");
          }
          var data = await res.json();
          everyproblem.push(...data)
          currentPage++
          totalPages = Math.ceil(res.headers.get("Link").match(/page=(\d+)>; rel="last"/)[1])
        }
        this.allproblems = everyproblem.map((problem) => ({
          id: problem.id,
          title: problem.title,
          state: problem.state,
        }))
        // console.log("Issues fetched: ", this.allproblems.length)
        // console.log("All issues: ", this.allproblems)
        // console.log("perPage:", this.perPage);
        // console.log("allproblems.length:", this.allproblems.length)
      } catch (err)
      {
        console.log("Failure: ", err);
        this.error = err;
      } finally
      {
        this.loading = false;
      }
    },
    async goToPage(page)
    {
      if (page >= 1 && page <= this.totalPages)
      {
        this.currentPage = page;
        await this.fetchProblems();
      }
    },
    updatepages()
    {
      this.totalPages = Math.ceil(this.allproblems.length / this.perPage);
      console.log("Updating totalPages...", this.totalPages);
      console.log("allproblems.length:", this.allproblems.length);
      console.log("perPage:", this.perPage)
    },
    updateVisibleProblems()
    {
      this.$nextTick(() =>
      {
        console.log("Updating visibleProblems...");
        console.log("currentPage:", this.currentPage);
        console.log("perPage:", this.perPage);
        console.log("allproblems.length:", this.allproblems.length);
        console.log("visibleProblems:", this.visibleProblems);
      });
    },
    async countpages()
    {
      this.loading = true
      this.$nextTick(() =>
      {
        setTimeout(() =>
        {
          this.totalPages = Math.ceil(this.allproblems.length / this.perPage)
          this.loading = false
        }, 1000)
      });
    }
  },
  watch: {
    selecrepo: {
      immediate: true,
      handler()
      {
        this.currentPage = 1;
        this.allproblems = [];
        this.fetchProblems();
      },
    },
    hider()
    {
      this.currentPage = 1;
      this.allproblems = [];
      this.fetchProblems();
    },
    allproblems: {
      handler()
      {
        this.$nextTick(() =>
        {
          this.currentPage = 1
        })
      },
      deep: true,
    },
    perPage()
    {
      this.updatepages()
      this.updateVisibleProblems()
    },
    currentPage(newpage)
    {
      console.log("Current page: ", newpage)
    }
  },
  created()
  {
    this.currentPage = this.currentPageQueryParam;
    this.fetchProblems();
  }
};
</script>

<style>.pagination-container {
  overflow-x: auto;
  max-width: 100%;
  display: flex;
  align-items: center;
}

.pagination-nav {
  padding: 0 10px;
}</style>
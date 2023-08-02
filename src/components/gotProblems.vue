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
        <router-link :to="`/repository/${selecrepo.owner.login}/${selecrepo.name}`">Back to Repo</router-link>
      </div>
      <div v-if="error" class="alert alert-danger">{{ error.message }}</div>
      <nav v-if="hasPages" aria-label="Page navigation">
        <ul class="pagination">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <a class="page-link" href="#" @click="goToPage(currentPage - 1)" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
              <span class="sr-only">Previous</span>
            </a>
          </li>
          <li class="page-item" v-for="pageNumber in totalPages" :key="pageNumber" :class="{ active: pageNumber === currentPage }">
            <a class="page-link" href="#" @click="goToPage(pageNumber)">{{ pageNumber }}</a>
          </li>
          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <a class="page-link" href="#" @click="goToPage(currentPage + 1)" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
              <span class="sr-only">Next</span>
            </a>
          </li>
        </ul>
      </nav>
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
  data() {
    return {
      loading: false,
      currentPage: 1,
      perPage: 10,
      allproblems: [],
      error: null,
    };
  },
  computed: {
    hasPages() {
      return this.allproblems.length > 0
    },
    totalPages() {
      return Math.ceil(this.allproblems.length / this.perPage);
    },
    visibleProblems() {
      var startIndex = (this.currentPage - 1) * this.perPage;
      return this.allproblems.slice(startIndex, startIndex + this.perPage);
    },
  },
  methods: {
    // dosomemeth(){
    //   this.totalPages = Math.ceil(this.allproblems.length / this.perPage)
    // },
    async fetchProblems() {
      this.loading = true;
      this.error = null;
      try {
        var owner = this.selecrepo.owner.login;
        var name = this.selecrepo.name;
        var token = "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";
        var res = await fetch(
          `https://api.github.com/repos/${owner}/${name}/issues?state=${this.hider}&per_page=${this.perPage}&page=${this.currentPage}`,
          {
            headers: {
              Authorization: `token ${token}`,
            },
          }
        );
        if (!res.ok) {
          throw new Error("Failed to fetch issues.");
        }
        var data = await res.json();
        this.allproblems = data.map((problem) => ({
          id: problem.id,
          title: problem.title,
          state: problem.state,
        }));
        console.log("Issues fetched: ", this.allproblems.length)
        // this.dosomemeth()
      } catch (err) {
        console.log("Failure: ", err);
        this.error = err;
      } finally {
        this.loading = false;
      }
    },
    async goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        await this.fetchProblems();
      }
    },
  },
  watch: {
    selecrepo: {
      immediate: true,
      handler() {
        this.currentPage = 1;
        this.allproblems = [];
        this.fetchProblems();
      },
    },
    hider() {
      this.currentPage = 1;
      this.allproblems = [];
      this.fetchProblems();
    },
    // allproblems:{
    //   handler(){
    //     this.$nextTick(() => {
    //       this.currentPage = 1
    //     })
    //   },
    //   deep: true
    // }
  }
};
</script>

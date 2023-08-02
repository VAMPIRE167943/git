<template>
  <div>
    <h3>Repos List</h3>
    <ul v-if="repos.length > 0" class="list-group">
      <li v-for="repo in repos" :key="repo.id" @click="stalk(repo)" class="list-group-item">
        <RouterLink :to="`/repository/${repo.owner}/${repo.name}`">{{ repo.name }}</RouterLink>
      </li>
    </ul>
    <div v-else class="alert alert-info mt-3">Found 0.</div>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router';

export default {
  emits: ["stalkrepo"],
  props: {
    repos: {
      type: Array,
      required: true,
    },
  },
  methods: {
    stalk(repo) {
      this.$emit("stalkrepo", repo);
    },
  },
  components: {
    RouterLink,
  },
};
</script>

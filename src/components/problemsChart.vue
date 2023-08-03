<template>
  <div class="container mt-4">
    <div v-if="selecrepo">
      <h3>Open vs. Closed Issues</h3>
      <canvas ref="chartCanvas" width="300" height="300"></canvas>
    </div>
  </div>
</template>

<script>
import { Chart } from 'chart.js';

export default {
  props: {
    selecrepo: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      openproblems: 0,
      closedproblems: 0,
    };
  },
  watch: {
    selecrepo: {
      immediate: true,
      handler() {
        this.updatedoughnut();
      },
    },
  },
  methods: {
    async getproblems() {
      if (!this.selecrepo) return
      try {
        var owner = this.selecrepo.owner.login;
        var name = this.selecrepo.name;
        var token = "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";
        var openres = await fetch(
          `https://api.github.com/repos/${owner}/${name}/issues?state=open`,
          {
            headers: {
              Authorization: `token ${token}`,
            },
          }
        );
        var closedres = await fetch(
          `https://api.github.com/repos/${owner}/${name}/issues?state=closed`,
          {
            headers: {
              Authorization: `token ${token}`,
            },
          }
        );
        if (!openres.ok || !closedres.ok) {
          throw new Error("Failed to fetch issues.");
        }
        var openproblemstats = await openres.json();
        var closedproblemstats = await closedres.json();
        this.openproblems = openproblemstats.length;
        this.closedproblems = closedproblemstats.length;
      } catch (err) {
        console.log("Failure: ", err);
      }
    },
    updatedoughnut() {
      if (this.selecrepo) {
        this.getproblems().then(() => {
          this.renderChart();
        });
      }
    },
    renderChart() {
      var context = this.$refs.chartCanvas
      if(context){
        context = context.getContext("2d")
        new Chart(context, {
          type: "doughnut",
          data: {
            labels: ["Open Issues", "Closed Issues"],
            datasets: [
              {
                data: [this.openproblems, this.closedproblems],
                backgroundColor: ["#FF6384", "#36A2EB"],
                hoverBackgroundColor: ["#FF6384", "#36A2EB"],
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
          },
        })
      }
    }
  }
}
</script>

<!-- <template>
  <div class="container mt-4">
    <div v-if="selecrepo">
      <h3>Open vs. Closed Issues</h3>
      <canvas ref="chartCanvas" width="300" height="300"></canvas>
    </div>
  </div>
</template>

<script>
import { Chart, ArcElement, DoughnutController, CategoryScale } from 'chart.js';
Chart.register(ArcElement, DoughnutController, CategoryScale);

export default {
  props: {
    selecrepo: {
      type: Object,
      required: true,
      default: null
    },
  },
  data() {
    return {
      openproblems: 0,
      closedproblems: 0,
      chartInstance: null
    };
  },
  watch: {
    selecrepo: {
      immediate: true,
      handler(newRepo) {
        if (newRepo) {
          this.updateDoughnut();
        } else {
          this.clearChart();
        }
      },
    },
  },
  methods: {
    async getproblems() {
      if (!this.selecrepo) return;
      try {
        var owner = this.selecrepo.owner.login;
        var name = this.selecrepo.name;
        var token = "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";
        var [openres, closedres] = await Promise.all([
          fetch(`https://api.github.com/repos/${owner}/${name}/issues?state=open`, {
            headers:{
              Authorization: `token ${token}`
            }
          }),
          fetch(`https://api.github.com/repos/${owner}/${name}/issues?state=closed`, {
            headers:{
              Authorization: `token ${token}`
            }
          })
        ]);
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
    updateDoughnut() {
      if (this.selecrepo) {
        this.getproblems().then(() => {
          if (!this.chartInstance) {
            var context = this.$refs.chartCanvas;
            if (context) {
              context = context.getContext("2d");
              this.chartInstance = new Chart(context, {
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
              });
            }
          } else {
            this.chartInstance.data.datasets[0].data = [this.openproblems, this.closedproblems];
            this.chartInstance.update();
          }
        });
      }
    },
    clearChart() {
      if (this.chartInstance) {
        this.chartInstance.destroy();
        this.chartInstance = null;
      }
    },
    renderChart() {
      if (this.chartInstance) {
        this.chartInstance.data.datasets[0].data = [this.openproblems, this.closedproblems];
        this.chartInstance.update();
      } else {
        var context = this.$refs.chartCanvas.getContext('2d');
        this.chartInstance = new Chart(context, {
          type: 'doughnut',
          data: {
            labels: ['Open Issues', 'Closed Issues'],
            datasets: [
              {
                data: [this.openproblems, this.closedproblems],
                backgroundColor: ['#FF6384', '#36A2EB'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB'],
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
          },
        });
      }
    },
  },
};
</script> -->

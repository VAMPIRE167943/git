<template>
    <div>
        <canvas ref="mychart" width="400" height="200"></canvas>
    </div>
</template>

<script>
import Chart from "chart.js/auto"
import "chartjs-plugin-datalabels"

export default {
    props:{
        chartstats:{
            type: Object,
            required: true
        }
    },
    data(){
        return{
            Instance: null
        }
    },
    watch:{
        chartstats:{
            handler(newstats){
                this.update(newstats)
            },
            deep: true
        }
    },
    mounted(){
        this.displaychart()
    },
    methods:{
        displaychart(){
            var context = this.$refs.mychart.getContext("2d")
            this.Instance = new Chart(context, {
                type: "pie",
                data: this.chartstats,
                options:{
                    plugins:{
                        datalabels:{
                            color: "#ffffff",
                            formatter: (value, context) => {
                                return context.chart.data.labels[context.dataindex]
                            }
                        }
                    },
                    legend:{
                        display: true,
                        position: "bottom"
                    },
                    tooltips:{
                        callbacks:{
                            label: (tooltipItem, data) => {
                                var dataset = data.datasets[tooltipItem.datasetIndex]
                                var meta = dataset._meta[Object.keys(dataset._meta)[0]]
                                var total = meta.total
                                var currval = dataset.data[tooltipItem.index]
                                var perc = parseFloat(((currval / total) * 100).toFixed(1))
                                return currval + " ( " + perc + "%)"
                            },
                            title: (tooltipItem, data) => {
                                return data.labels[tooltipItem[0].index]
                            }
                        }
                    }
                }
            })
        },
        update(newstats){
            if(this.Instance){
                this.Instance.data = newstats
                this.Instance.update()
            }
        }
    }
}
</script>

<style>

</style>
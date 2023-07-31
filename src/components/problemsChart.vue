<template>
    <div>
        <canvas ref="mychart" width="400" height="200"></canvas>
    </div>
</template>

<script>
import Chart from "chart.js"

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
            var context = this.$refs.mychart.getcontext("2d")
            this.Instance = new Chart(context, {
                type: "pie",
                data: this.chartstats,
                options:{

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
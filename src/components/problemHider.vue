<template>
    <div class="container mt-4">
        <div v-if="selecrepo">
            <h3 class="mb-3">Filter Issues</h3>
            <div class="btn-group" role="group">
                <div class="radio-container">
                    <label class="btn btn-secondary" :class="{active: hide === 'open'}">
                        <input type="radio" v-model="hide" value="open" @change="HideAndSeek">
                        Open
                    </label>
                    <label class="btn btn-secondary" :class="{active: hide === 'closed'}">
                        <input type="radio" v-model="hide" value="closed" @change="HideAndSeek">
                        Closed
                    </label>
                </div>
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
    data(){
        return{
            problems: [],
            loading: false,
            error: null,
            hide: this.hider
        }
    },
    methods:{
        HideAndSeek(){
            if(this.problems){
                this.$emit("hideproblems", this.hide)
            }else{
                this.$emit("hideproblems", "")
            }
        }
    }
}
</script>

<style>
.radio-container{
    margin-bottom: 10px;
}
</style>
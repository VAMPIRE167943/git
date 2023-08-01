<template>
    <div>
        <div v-if="selecrepo">
            <h3>
                Filter Issues
            </h3>
            <label>
                <input type="radio" v-model="hide" value="open" @change="HideAndSeek">
                    Open
                </label>
            <label>
                <input type="radio" v-model="hide" value="closed" @change="HideAndSeek">
                    Closed
            </label>
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
            this.$emit("hideproblems", this.hide)
        }
    }
}
</script>

<style>
.radio-label {
  display: block;
  margin-bottom: 10px;
}

.radio-label input[type="radio"] {
  margin-right: 5px;
}
</style>
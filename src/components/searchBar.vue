<template>
    <div>
        <p v-html="test"></p>
    </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    props:[
        "test"
    ]
}
</script>
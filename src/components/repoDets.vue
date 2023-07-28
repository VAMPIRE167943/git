<template>
    <div v-if="repo">
        <h2 v-html="repo.name"></h2>
        <p>
            <strong>
                Description:
            </strong>
            {{ repo.description }}
        </p>
        <p>
            <strong>
                URL:
            </strong>
            <a :href="repo.html_url" target="_blank">{{ repo.html_url }}</a>
        </p>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
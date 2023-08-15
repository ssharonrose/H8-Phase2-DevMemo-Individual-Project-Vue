<script>

export default {
    name: 'Card',
    props: ['data']
}
</script>

<template>
    <!-- <div class="flex flex-wrap gap-4 ml-10 mt-5"> -->
    <div class="card card-compact w-50 bg-base-100 shadow-xl">
        <figure>
            <img :src="data.urlToImage" class="h-200 w-300" />
        </figure>
        <div class="card-body">
            <h2 class="card-title">{{ data.title }}</h2>
            <p>{{ data.description }}</p>
            <div class="card-actions justify-end">
                <a :href="data.url" class="btn btn-primary">
                    Detail
                </a>

            </div>
        </div>
    </div>
    <!-- </div> -->
</template>

<style scoped></style>

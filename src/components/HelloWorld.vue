<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <div v-for="item in names" :key="item.id">
            <span @click="changeName(item.id)">
                {{ item.name + ' ' + item.surname }}
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HelloWorld',
    props: ['msg'],
    data: () => ({
        names: [
            { id: 1, name: 'Ali', surname: 'Atabey' },
            { id: 1, name: 'Hamza', surname: 'Pamuk' },
            { id: 1, name: 'Sefa', surname: 'Büyük' },
        ],
    }),
    methods: {
        changeName(item) {
            item.name = 'Perihan'
        },
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
    margin: 40px 0 0;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}
</style>

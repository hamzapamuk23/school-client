<template>
    <div id="app">
        <div>
            <button style="margin-right:20px" @click="changeTab('tab1')">
                School
            </button>

            <button @click="changeTab('tab2')">Student</button>
        </div>
        <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
        <!-- <HelloWorld msg="Merhaba Hamza" /> -->
        <School v-if="tab === 'tab1'" />
        <Student v-if="tab === 'tab2'" />
    </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import School from './components/School.vue'
import Student from './components/Student.vue'
export default {
    name: 'App',
    data: () => ({
        tab: '',
    }),
    components: {
        // HelloWorld,
        School: School,
        Student: Student,
    },
    methods: {
        changeTab(tab) {
            this.tab = tab
        },
    },
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>

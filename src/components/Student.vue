<template>
    <div>
        <table>
            <tr>
                <th>Adı</th>
                <th>Soyadı</th>
                <th>Numarası</th>
                <th>Yaşı</th>
                <th>Ortalaması</th>
            </tr>
            <tr v-for="student in studens" :key="student.id">
                <td>student.name</td>
                <td>student.surname</td>
                <td>student.number</td>
                <td>student.age</td>
                <td>student.gpa</td>
                <td>student.school.name</td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
    Data: () => ({
        students: {},
    }),

    methods: {
        async getStudentList() {
            await this.axios
                .get('http://localhost:8080/student')
                .then(
                    (response) =>
                        (this.students = response.data._embedded.students)
                )
        },
    },

    mounted() {
        this.getSchoolList()
    },
}
</script>

<style scoped></style>

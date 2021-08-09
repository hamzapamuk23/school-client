<template>
    <div>
        <h1>Students Table</h1>
        <div>
            <table>
                <tr>
                    <th>Adı</th>
                    <th>Soyadı</th>
                    <th>Numarası</th>
                    <th>Yaşı</th>
                    <th>Ortalaması</th>
                    <th>Okulu</th>
                    <th>Operasyonlar</th>
                </tr>
                <tr>
                    <td>
                        <input
                            type="text"
                            v-model="studentSearch.name"
                            placeholder="Adı"
                            @input="getStudentList()"
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            v-model="studentSearch.surname"
                            placeholder="Soyadı"
                            @input="getStudentList()"
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            v-model="studentSearch.number"
                            placeholder="Numarası"
                            @input="getStudentList()"
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            v-model="studentSearch.age"
                            placeholder="Yaşı"
                            @input="getStudentList()"
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            v-model="studentSearch.gpa"
                            placeholder="Ortalaması"
                            @input="getStudentList()"
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            v-model="studentSearch.school"
                            placeholder="Okulu"
                            @input="getStudentList()"
                        />
                    </td>
                </tr>
                <tr v-for="(val, index) in students" :key="val.id">
                    <td>{{ val.name }}</td>
                    <td>{{ val.surname }}</td>
                    <td>{{ val.number }}</td>
                    <td>{{ val.age }}</td>
                    <td>{{ val.gpa }}</td>
                    <td v-if="val.school === null"></td>
                    <td v-else>{{ val.school.name }}</td>
                    <td>
                        <button type="button" @click="deleteStudent(val.id)">
                            Sil</button
                        ><button type="button" @click="inputUpdate(index)">
                            Güncelle
                        </button>
                    </td>
                </tr>
                <tr>
                    <td colspan="7">
                        <button
                            id="prevBtn"
                            type="prevBtn"
                            @click="changePage($event)"
                        >
                            &lsaquo;
                        </button>
                        <button
                            id="nextBtn"
                            type="button"
                            @click="changePage($event)"
                        >
                            &rsaquo;
                        </button>
                    </td>
                </tr>
            </table>

            <form @submit="saveStudent($event)">
                <input
                    type="text"
                    v-model="selectedStudent.name"
                    placeholder="Adı"
                    required
                />
                <input
                    type="text"
                    v-model="selectedStudent.surname"
                    placeholder="Soyadı"
                    required
                />
                <input
                    type="text"
                    v-model="selectedStudent.number"
                    placeholder="Numarası"
                    required
                />
                <input
                    type="number"
                    v-model="selectedStudent.age"
                    placeholder="Yaşı"
                    required
                />
                <input
                    type="number"
                    step="0.1"
                    v-model="selectedStudent.gpa"
                    placeholder="Ortalaması"
                    required
                />
                <select v-model="selectedStudent.school.id">
                    <option :value="null">Seçiniz</option>
                    <option
                        v-for="school in schools"
                        :key="school.id"
                        :value="school.id"
                        >{{ school.name }}</option
                    >
                </select>

                <input type="submit" value="Kaydet" />
                <input type="button" value="Temizle" @click="clean()" />
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data: () => ({
        studentSearch: {
            name: '',
            surname: '',
            number: '',
            age: '',
            gpa: '',
            school: '',
        },
        schools: [],
        selectedStudent: { id: null, name: '', school: { id: null } },
        students: [],
        options: { size: 2, totalElements: 0, totalPages: 0, sort: 0 },
        page: 0,
    }),

    methods: {
        async getStudentList() {
            await this.axios
                .get(
                    'http://localhost:8080/student/search/findAllSearch?name=' +
                        this.studentSearch.name +
                        '&surname=' +
                        this.studentSearch.surname +
                        '&number=' +
                        this.studentSearch.number +
                        '&age=' +
                        this.studentSearch.age +
                        '&gpa=' +
                        this.studentSearch.age +
                        '&schoolName=' +
                        this.studentSearch.school +
                        '&size=' +
                        this.options.size +
                        '&page=' +
                        this.page +
                        '&sort=' +
                        this.sort
                )
                .then(
                    (response) => (
                        (this.students = response.data._embedded.students),
                        (this.options = response.data.page)
                    )
                )
        },

        async getSchooltList() {
            await this.axios
                .get('http://localhost:8080/school/search/findByActiveTrue')
                .then(
                    (response) =>
                        (this.schools = response.data._embedded.schools)
                )
        },

        saveStudent(e) {
            e.preventDefault()
            if (this.selectedStudent.id === null) {
                this.addStudent()
            } else {
                this.updateStudent()
            }
        },

        inputUpdate(index) {
            this.selectedStudent.id = this.students[index].id
            this.selectedStudent.name = this.students[index].name
            this.selectedStudent.surname = this.students[index].surname
            this.selectedStudent.number = this.students[index].number
            this.selectedStudent.age = this.students[index].age
            this.selectedStudent.gpa = this.students[index].gpa
            this.selectedStudent.school = this.students[index].school
        },

        cleanForm() {
            this.selectedStudent = { id: null, name: '', school: { id: null } }
        },

        async deleteStudent(id) {
            await this.axios.delete('http://localhost:8080/student/' + id)
            this.getStudentList()
        },

        async addStudent() {
            await this.axios.post(
                'http://localhost:8080/student',
                this.selectedStudent
            )
            this.getStudentList()
            this.cleanForm()
        },

        async updateStudent() {
            console.log()
            await this.axios.put(
                'http://localhost:8080/student/' + this.selectedStudent.id,
                this.selectedStudent
            )
            this.getStudentList()
            this.cleanForm()
        },

        changePage(event) {
            if (
                event.path[0].id === 'nextBtn' &&
                this.page < this.options.totalPages - 1
            ) {
                this.page++
            } else if (event.path[0].id === 'prevBtn' && this.page > 0) {
                this.page--
            }
            this.getStudentList()
            console.log(event.path[0].id)
        },
    },

    mounted() {
        this.getStudentList()
        this.getSchooltList()
    },
}
</script>

<style scoped></style>

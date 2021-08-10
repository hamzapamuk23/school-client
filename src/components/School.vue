<template>
    <div>
        <h1>Okul Tablosu</h1>
        <div class="center">
            <table>
                <tr>
                    <th>Adı</th>
                    <th>Kodu</th>
                    <th>Durumu</th>
                    <th>Operasyonlar</th>
                </tr>
                <tr>
                    <td>
                        <input
                            type="text"
                            v-model="schoolSearch.name"
                            placeholder="Adı"
                            @input="getSchoolList()"
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            v-model="schoolSearch.code"
                            placeholder="Kodu"
                            @input="getSchoolList()"
                        />
                    </td>
                    <td></td>
                    <td></td>
                </tr>
                <tr v-for="(val, index) in schools" :key="val.id">
                    <td>{{ val.name }}</td>
                    <td>{{ val.code }}</td>
                    <td>{{ val.active }}</td>
                    <td>
                        <button type="button" @click="deleteSchool(val.id)">
                            Sil
                        </button>
                        <button type="button" @click="inputUpdate(index)">
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
        </div>

        <form @submit="saveSchool($event)">
            <input v-show="false" v-model="school.id" />
            <input
                type="text"
                v-model="school.name"
                placeholder="Ad giriniz"
                required
            />
            <input
                type="text"
                v-model="school.code"
                placeholder="Kod giriniz"
                required
            />
            <input type="checkbox" v-model="school.active" checked="false" />
            <input type="submit" value="Kaydet" />
            <button type="button" @click="clean()">Temizle</button>
        </form>
    </div>
</template>

<script>
export default {
    data: () => ({
        schoolSearch: { name: '', code: '' },
        school: { id: null, name: '', code: '', active: false },
        schools: [],
        options: { size: 5, totalElements: 0, totalPages: 0 },
        page: 0,
    }),

    mounted() {
        this.getSchoolList()
    },

    methods: {
        async getSchoolList() {
            await this.axios
                .get(
                    'http://localhost:8080/school/search/findBySchoolName?name=' +
                        this.schoolSearch.name +
                        '&code=' +
                        this.schoolSearch.code +
                        '&page=' +
                        this.page +
                        '&size=' +
                        this.options.size
                )
                .then(
                    (response) => (
                        (this.schools = response.data._embedded.schools),
                        (this.options = response.data.page)
                    )
                )
        },

        saveSchool(e) {
            e.preventDefault()
            if (this.school.id === null || this.school.id === '') {
                alert('added')
                this.addSchool()
                this.getSchoolList()
                this.clean()
            } else {
                alert('updated')
                this.updateSchool()
                this.getSchoolList()
            }
        },

        async addSchool() {
            await this.axios.post('http://localhost:8080/school/', this.school)
            this.getSchoolList()
        },

        inputUpdate(index) {
            this.school.id = this.schools[index].id
            this.school.name = this.schools[index].name
            this.school.code = this.schools[index].code
            this.school.active = this.schools[index].active
        },

        async updateSchool() {
            await this.axios.put(
                'http://localhost:8080/school/' + this.school.id,
                this.school
            )
            this.getSchoolList()
        },

        async deleteSchool(id) {
            await this.axios.delete('http://localhost:8080/school/' + id)
            this.getSchoolList()
        },

        clean() {
            this.school.id = ''
            this.school.name = ''
            this.school.code = ''
            this.school.active = false
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
            this.getSchoolList()
        },
    },
}
</script>

<style>
table {
    border: 1px solid darkgray;
    margin: auto;
}
tr th,
td {
    border: 1px solid darkgray;
}

.center {
    margin: 50px auto;
}
</style>

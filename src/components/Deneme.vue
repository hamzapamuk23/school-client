<template>
    <div>
        <h1>Okul Tablosu</h1>
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
                        v-model="school.name"
                        placeholder="Adı"
                    />
                </td>
                <td>
                    <input
                        type="text"
                        v-model="school.code"
                        placeholder="Kodu"
                    />
                </td>
                <td></td>
                <td></td>
            </tr>
            <tr v-for="(school, index) in schools" :key="school.id">
                <td>{{ school.name }}</td>
                <td>{{ school.code }}</td>
                <td>{{ school.active }}</td>
                <td>
                    <button type="button" @click="deleteSchool(school.id)">
                        Sil
                    </button>
                    <button type="button" @click="inputUpdate(index)">
                        Güncelle
                    </button>
                </td>
            </tr>
        </table>

        <form>
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
            <button type="text" @click="saveSchool()">Kaydet</button>
            <button type="text" @click="clean()">Temizle</button>
        </form>
    </div>
</template>

<script>
export default {
    data: () => ({
        school: { id: null, name: '', code: '' },
        schools: [],
        options: { size: 2, totalElements: 0, totalPages: 0 },
        page: 0,
    }),

    methods: {
        async deleteSchool(id) {
            await this.axios.delete('http://localhost:8080/school/' + id)
            this.getSchoolList()
        },

        inputUpdate(index) {
            this.school.id = this.schools[index].id
            this.school.name = this.schools[index].name
            this.school.code = this.schools[index].code
        },

        clean() {
            this.schoolId = ''
            this.schoolName = ''
            this.schoolCode = ''
        },

        saveSchool() {
            if (this.school.id === null || this.school.id === '') {
                alert('added')
                this.addSchool()
                this.getSchoolList()
            } else {
                alert('updated')
                this.updateSchool()
                this.getSchoolList()
            }
        },

        async updateSchool() {
            await this.axios.put(
                'http://localhost:8080/school/' + this.school.id,
                this.school
            )
            this.getSchoolList()
        },

        async addSchool() {
            await this.axios.post('http://localhost:8080/school/', this.school)
            this.getSchoolList()
        },

        async getSchoolList() {
            await this.axios
                .get(
                    'http://localhost:8080/school/search/findBySchoolName?name=' +
                        this.school.name +
                        '&code=' +
                        this.school.code +
                        '&page=' +
                        this.page +
                        '&size=' +
                        this.options.size
                )
                .then(
                    (response) =>
                        (this.schools = response.data._embedded.schools)
                )
        },
    },
    mounted() {
        this.getSchoolList()
    },
}
</script>

<style>
table {
    border: 1px solid darkgray;
}
tr th,
td {
    border: 1px solid darkgray;
}
</style>

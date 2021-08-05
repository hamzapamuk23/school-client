<template>
    <div>
        <table>
            <tr>
                <th>Adı</th>
                <th>Kodu</th>
                <th>Durumu</th>
                <th>Operasyonlar</th>
            </tr>
            <tr v-for="(school, index) in schools" :key="school.id">
                <td>{{ school.name }}</td>
                <td>{{ school.code }}</td>
                <td>{{ school.active }}</td>
                <td>
                    <button type="button" @click="deleteSchool(index)">
                        Sil
                    </button>
                    <button type="button" @click="updateSchool(index)">
                        Güncelle
                    </button>
                </td>
            </tr>
        </table>

        <form>
            <input v-show="false" v-model="schoolId" />
            <input
                type="text"
                v-model="schoolName"
                placeholder="Ad giriniz"
                required
            />
            <input
                type="text"
                v-model="schoolCode"
                placeholder="Kod giriniz"
                required
            />
            <button type="text" @click="saveSchool()">Kaydet</button>
            <button type="text" @click="clean()">Temizle</button>
        </form>
    </div>
</template>

<script>
export default {
    data: () => ({
        schoolId: null,
        schoolName: '',
        schoolCode: '',
        schools: [
            { id: 1, name: 'Fırat Üniversitesi', code: 'FÜ', active: true },
            { id: 2, name: 'İnönü Üniversitesi', code: 'İÜ', active: true },
            {
                id: 3,
                name: 'Cumhuriyet Üniversitesi',
                code: 'SCÜ',
                active: true,
            },
        ],
    }),

    methods: {
        deleteSchool(index) {
            this.schools.splice(index, 1)
        },

        updateSchool(index) {
            this.schoolId = this.schools[index].id
            this.schoolName = this.schools[index].name
            this.schoolCode = this.schools[index].code
        },

        clean() {
            this.schoolId = ''
            this.schoolName = ''
            this.schoolCode = ''
        },

        saveSchool() {
            if (this.schoolId === null || this.schoolId === '') {
                alert('added')
                // this.addStudent();
                // this.getList();
            } else {
                alert('updated')
                // this.updateStudent();
                // this.getList();
            }
        },

        getList() {
            this.axios
                .get('http://localhost:8080/school')
                .then((response) => (this.schools = response))
        },

        mounted() {
            this.getList()
        },
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

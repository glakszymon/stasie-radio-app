<template>
    <table>
        <tr class="stopka">
            <td>autor</td>
            <td>tytuł</td>
            <td>dzień tygodnia</td>
            <td>opis</td>
            <td>czas start</td>
            <td>czas koniec</td>
            <td>Edit</td>
            <td>Delete</td>
        </tr>
        <tr v-for="row in listItems">
            <td>{{ row.creator }}</td>
            <td>{{ row.title }}</td>
            <td>{{ weekDayWord(row.weekDayNumber) }}</td>
            <td>{{ row.opis }}</td>
            <td>{{ row.timeStart }}</td>
            <td>{{ row.timeEnd }}</td>
            <td><button>Edit</button></td>
            <td><button @click="deleteWydarzenie(row.id)">Delete</button></td>
        </tr>
    </table>
</template>


<script setup>
    import axios from 'axios';
    import { ref } from 'vue';
    const listItems = ref([]);
    
    function weekDayWord(weekNumber)
    {
        switch(weekNumber){
        case "0":
            return 'Poniedziałek';
        case "1":
            return 'Wtorek';
        case "2":
            return 'Środa';
        case "3":
            return 'Czwartek';
        case "4":
            return 'Piątek';
        case "5":
            return 'Sobota';
        case "6":
            return 'Niedziela';
        default:
            return 'Błąd';
        }
    }


    function fetchShowData(week) {
        //console.log("week");
        axios.get('https://stasieradio.pl/cgi-bin/phpAplikacja/ramowka_get.php')
        .then(response => {
            // console.log("ok");
            // console.log(response.data);
            listItems.value = response.data;
        })
        .catch(error => {
            console.log("error");

        });
    }


    function deleteWydarzenie(id) {
        //console.log(id);
        axios.post('https://stasieradio.pl/cgi-bin/phpAplikacja/ramowka_delete.php', {
            id: id  
        })
        .then(response => {
            fetchShowData(2);
        })
        .catch(error => {

        });
    }

    fetchShowData(2);
    console.log("ssssss");
</script>



<style>
    table, th, td {
        border-collapse: collapse;
        border: 1px solid;
        padding: 0.4rem;
    }

    .stopka{
        background-color: lightgray;
    }
</style>


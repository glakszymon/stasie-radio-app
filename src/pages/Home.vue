<template>
    <div v-if="!edit_mode">
        <table>
            <tr class="stopka">
                <td>autor</td>
                <td>tytuł</td>
                <td>dzień tygodnia</td>
                <td>opis</td>
                <td>czas 1</td>
                <td>czas 2</td>
                <td>czas 3</td>
                <td>czas 4</td>
                <td>Edit</td>
                <td>Delete</td>
            </tr>
            <tr v-for="row in listItems">
                <td>{{ row.creator }}</td>
                <td>{{ row.title }}</td>
                <td>{{ weekDayWord(row.weekDayNumber) }}</td>
                <td>{{ row.opis }}</td>
                <td>{{ row.time1 }}</td>
                <td>{{ row.time2 }}</td>
                <td>{{ row.time3 }}</td>
                <td>{{ row.time4 }}</td>
                <td><button @click="edit(row)">Edit</button></td>
                <td><button @click="deleteWydarzenie(row.id)">Delete</button></td>
            </tr>
        </table>
    </div>

    <div v-if="edit_mode">
        <form ref="form">
            <div class="">
                <label for="title">Tytuł</label>
                <input type="text" class="title_style" id="title" name="title" v-model="edit_title" >
            </div>
            <br/>

            <div class="Prowadzacy_style">
                <label for="creator">Prowadzący</label>
                <select class="dropDownMenu" id="creator" name="creator">
                    <option v-for="row in people" v-bind:value = "row.creator">{{ row.creator }}</option>
                </select>
            </div>

            <br/>

            <div class="weekDay_style">
                <label for="weekDay">Dzień tygodnia</label>
                <select class="dropDownMenu" id="weekDay" name="weekDay">
                    <option value="0">Poniedziałek</option>
                    <option value="1">Wtorek</option>
                    <option value="2">Środa</option>
                    <option value="3">Czwartek</option>
                    <option value="4">Piątek</option>
                    <option value="5">Sobota</option>
                    <option value="6">Niedziela</option>
                </select>
            </div>

            <br/>

            <!-- <div class="time_style">
                <label for="timeStart">Czas rozpoczęcia audycji według rozpiski</label>
                <input type="time" class="time_input_style" id="timeStart" name="timeStart">
            </div> -->

            <div class="time_style">
                <label for="time1">Czas 1</label>
                <input type="time" class="time_input_style" id="time1" name="time1" v-model="edit_time1">
            </div>

            <div class="time_style">
                <label for="time2">Czas 2</label>
                <input type="time" class="time_input_style" id="time2" name="time2" v-model="edit_time2">
            </div>

            <div class="time_style">
                <label for="time3">Czas 3</label>
                <input type="time" class="time_input_style" id="time3" name="time3" v-model="edit_time3">
            </div>

            <div class="time_style">
                <label for="time4">Czas 4</label>
                <input type="time" class="time_input_style" id="time4" name="time4" v-model="edit_time4">
            </div>


            <div class="opis_group">
                <label for="opis">Opis programu</label>
                <textarea class="opis_style" id="opis" name="opis" v-model="edit_opis"></textarea>
            </div>

            <br/>


            <div class="buttons_change">
                <!-- <button class="submitButton_edit" @click="submit_edit()" type="button">Submit</button> -->
                <button class="cancelButton" @click="cancel_edit()" type="button">Anuluj</button>
            </div>  
        </form>
    </div>
</template>


<script setup>
    import axios from 'axios';
    import { ref } from 'vue';
    const listItems = ref([]);
    const edit_mode = ref(false);
    const people = ref([]);

    const edit_title = ref();
    const edit_creator = ref();
    const edit_weekDay = ref();
    const edit_time1 = ref();
    const edit_time2 = ref();
    const edit_time3 = ref();
    const edit_time4 = ref();
    const edit_opis = ref();
    const edit_id = ref();

    function edit(data)
    {
        edit_mode.value = true;

        edit_title.value = data.title;
        edit_creator.value = data.creator;
        edit_weekDay.value = data.weekDayNumber;
        edit_time1.value = data.time1;
        edit_time2.value = data.time2;
        edit_time3.value = data.time3;
        edit_time4.value = data.time4;
        edit_opis.value = data.opis;
        edit_id.value = data.id;

        axios.get('https://stasieradio.pl/cgi-bin/phpAplikacja/people_import.php')
                .then(response => {
                    console.log(response.data);
                    people.value = response.data;
                })
                .catch(error => {
                    // Handle error

                });
    }

    function submit_edit()
    {
        const formData = new FormData(this.$refs.form);
    
        axios.post('https://stasieradio.pl/cgi-bin/phpAplikacja/edit_Ramowka.php', formData, {id: edit_id.value})
        .then(response => {
            edit_mode.value = false;
            fetchShowData();
        })
        .catch(error => {
            // Handle error

        });
    }

    function cancel_edit()
    {
        edit_mode.value = false;
    }
    
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


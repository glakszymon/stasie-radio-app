<template>
    <div v-if="!edit_mode">
        <table>
            <tr class="stopka">
                <td>Nagranie</td>
                <td>Tytuł</td>
                <td>autor</td>
                <td>Opis</td>
                <td>kategoria</td>
                <td>Edit</td>
                <td>Delete</td>
            </tr>
            <tr v-for="row in response">
                <!-- <td><img :src="getPhotoPeople(row.id)" class="imagePeople"/></td> -->
                <td>
                    <audio controls>
                        <source v-bind:src="getAudio(row.id)">
                    </audio>
                </td>
                <td>{{ row.title }}</td>
                <td>{{ row.autor }}</td>
                <td>{{ row.opis }}</td>
                <!-- <td>{{ row.idKategori }}</td> -->
                <td>{{ row.nazwaKategorii }}</td>
                <td><button @click="edit_audio(row)">Edit</button></td>
                <td><button @click="deleteElement(row.id)">Delete</button></td>
            </tr>
        </table>
    </div>

    <div v-if="edit_mode">
        <form ref="form" onsubmit="return false" id="myForm3">
            <!-- <audio controls> -->
                <!-- <source v-bind:src="getAudio(row.id)"> -->
            <!-- </audio> -->

            <label for="Title">Tytuł</label>
                <textarea class="text-input" id="Title" name="Title" placeholder="np. Wywiad z prezydentem" v-model="edit_title"></textarea>
            <br/>
            <label for="opis">Opis</label>
                <textarea class="text-input" id="opis" name="opis" placeholder="np. Wywiad z Prezydentem z dnia 22.05.2024" v-model="edit_opis"></textarea>
            <br/>
                <!-- <input type="file" name="audioHistory" id="audioHistory">
            <br/> -->
            <div style="display: flex; justify-content: space-between;">
                <button class="submitButton" @click="submit_edit">Submit</button>
                <button class="cancelButton" @click="cancel_edit">Anuluj</button>
            </div>
        </form>
    </div>
</template>

<script setup>
    import axios from 'axios';
    import { ref } from 'vue';
    const listItems = ref([]);
    const edit_mode = ref(false);
    const edit_id = ref();
    const edit_title = ref();
    const edit_opis = ref();

    const response = ref([]);

    function edit_audio(audio) {
        edit_mode.value = true;
        edit_id.value = audio.id;
        edit_title.value = audio.title;
        edit_opis.value = audio.opis;
    }

    function cancel_edit(){
        edit_mode.value = false;
    }

    function submit_edit()
    {
        axios.post('https://stasieradio.pl/cgi-bin/phpAplikacja/edit_Audio.php', {
            id: edit_id.value,
            title: edit_title.value,
            opis: edit_opis.value,
        })
        .then(response => {
            edit_mode.value = false;
            fetchShowData();
        })
        .catch(error => {
            // Handle error

        });
    }
    
    function getAudio(id)
    {
        console.log(id);
        return 'https://stasieradio.pl/cgi-bin/phpAplikacja/audio/audio_'+id+'.mp3';
    }

    async function fetchShowData()
    {
        const res = await fetch('https://stasieradio.pl/cgi-bin/phpAplikacja/audio_import.php?idKat=idKategori', {
            method: 'GET',
        });
            response.value = await res.json();
        return;
    }
        
    function deleteElement(id) {
                axios.post('https://stasieradio.pl/cgi-bin/phpAplikacja/delete_audio.php', {
                    id: id  
                })
                .then(response => {
                    fetchShowData();
                })
                .catch(error => {
                    // Handle error

                });
    }

    // getCategory();

    fetchShowData();
</script>


<style>
    table, th, td {
        border-collapse: collapse;
        border: 0;
        padding: 0.4rem;
        border-bottom: 1px solid #aaaaaa;
    }

    table{
        width: 100%;
    }

    .stopka{
        background-color: lightgray;
    }

    .submitButton_edit{
        background-color: #4CAF50; /* Green */
        border: none;
        color: white;
        padding: 16px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        /* -webkit-transition-duration: 0.4s; Safari */
        /* transition-duration: 0.4s; */
        cursor: pointer;
        width: 50%;
    }

    .submitButton_edit:hover{
      background-color: #388a3b;
    }

    .cancelButton{
        background-color: #f44336; /* Green */
        border: none;
        color: white;
        padding: 16px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        /* -webkit-transition-duration: 0.4s; Safari */
        /* transition-duration: 0.4s; */
        cursor: pointer;
        width: 50%;
    }

    .cancelButton:hover{
        background-color: #85231c;
    }

    .buttons_change{
        display: flex;
    }

    .imagePeople{
        height: 5rem;
        width: 5rem;
    }
</style>

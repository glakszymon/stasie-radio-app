<template>
     <div v-if="!edit_mode">
        <table>
            <tr class="stopka">
                <!-- <td>{{ row.id }}</td> -->
                <td>Zdjęcie</td>
                <td class="autor_info">Autor</td>
                <td class="title_info">Tytuł</td>
                <td class="tresc_info">Tresc</td>
                <td class="date_info">Data dodania</td>
                <td class="edit_info">Edit</td>
                <td class="delete_info">Delete</td>
            </tr>
            <tr v-for="row in listItems">
                <!-- <td>{{ row.id }}</td> -->
                <td><img :src="getPhotoInfo(row.id)" class="imageInfo"/></td>
                <td>{{ row.Autor }}</td>
                <td>{{ row.Title }}</td>
                <td>{{ row.Tresc }}</td>
                <td>{{ row.TimePlace }}</td>
                <td><button>Edit</button></td>
                <td><button @click="delete_Info(row.id)">Delete</button></td>
            </tr>
        </table>
    </div>

    <div v-if="edit_mode">
        <form ref="form">
            <div class="opis_group">
                <label for="title">Tytuł</label>
                <input type="text" class="opis_style" id="title" name="title">
            </div>
            <br/>
        
            <div class="Prowadzacy_style">
                <label for="Autor">Autor</label>
                <select class="dropDownMenu" id="Autor" name="Autor">
                    <option v-for="row in listItems" v-bind:value = "row.creator">{{ row.creator }}</option>
                </select>
            </div>
            
            <div class="opis_group">
                <label for="tekst">Tekst</label>
                <textarea class="opis_style" id="tekst" name="tekst"></textarea>
            </div>
                <br/>
        
            <button class="submitButton" @click="submitForm">Submit</button>
        </form>
    </div>
</template>



<script setup>
    import axios from 'axios';
    import { ref } from 'vue';
    const listItems = ref([]);

    const edit_mode = ref(false);
    const edit_id = ref();
    const edit_name = ref();
    const edit_opis = ref();

    function edit_person(person) {
        edit_mode.value = true;
        edit_id.value = person.id;
        edit_name.value = person.creator;
        edit_opis.value = person.opis;
    }

    function cancel_edit(){
        edit_mode.value = false;
    }

    function getPhotoInfo(id)
    {
        return 'https://stasieradio.pl/cgi-bin/phpAplikacja/info/Info_'+id+'.jpg';
    }

    // function submit_edit()
    // {
    //     axios.post('http://localhost/edit_People.php', {
    //         id: edit_id.value,
    //         creator: edit_name.value,
    //         opis: edit_opis.value
    //     })
    //     .then(response => {
    //         edit_mode.value = false;
    //         fetchShowData();
    //     })
    //     .catch(error => {
    //         // Handle error

    //     });
    // }


    function fetchShowData() {
        axios.get('https://stasieradio.pl/cgi-bin/phpAplikacja/showInfo.php')
        .then(response => {
            console.log(response.data);
            listItems.value = response.data;
        })
        .catch(error => {

        });
    }


    function delete_Info(id) {
        axios.post('https://stasieradio.pl/cgi-bin/phpAplikacja/delete_Info.php', {
            id: id  
        })
        .then(response => {
            fetchShowData();
        })
        .catch(error => {

        });
    }

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

    .autor_info{
        width: 1rem;
        max-width: 10rem;
    }

    .date_info{
        width: 6rem;
        max-width: 6rem;
    }

    .imageInfo{
        height: 8rem;
        /* width: 8rem; */
    }

</style>
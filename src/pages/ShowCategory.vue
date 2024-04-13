<template>
    <div v-if="!edit_mode">
        <table>
            <tr class="stopka">
          
                <td>id</td>
                <td>Nazwa</td>
                <td>Edit</td>
                <td>Delete</td>
            </tr>
            <tr v-for="row in listItems">
                <!-- <td>{{ row.id }}</td> -->

                <td>{{ row.id }}</td>
                <td>{{ row.nazwaKategorii }}</td>

                <td><button @click="edit_person(row)">Edit</button></td>
                <td><button @click="deleteElement(row.id)">Delete</button></td>
            </tr>
        </table>
    </div>

    <div v-if="edit_mode">
        <form ref="form">
            <label for="name">Nazwa Kategorii</label>
            <textarea class="text-input" id="name" name="name" placeholder="Nazwa" v-model="edit_name"></textarea>
        
            <div class="buttons_change">
                <button class="submitButton_edit" @click="submit_edit()" type="button">Submit</button>
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
    const edit_id = ref();
    const edit_name = ref();


    function edit_person(person) {
        edit_mode.value = true;
        edit_id.value = person.id;
        edit_name.value = person.nazwaKategorii;
    }

    function cancel_edit(){
        edit_mode.value = false;
    }

    function submit_edit()
    {
        axios.post('https://stasieradio.pl/cgi-bin/phpAplikacja/edit_Category.php', {
            id: edit_id.value,
            creator: edit_name.value,
        })
        .then(response => {
            edit_mode.value = false;
            fetchShowData();
        })
        .catch(error => {
            // Handle error

        });
    }
   

    function fetchShowData() {
                axios.get('https://stasieradio.pl/cgi-bin/phpAplikacja/importCategory.php')
                .then(response => {
                    console.log(response.data);
                    listItems.value = response.data;
                })
                .catch(error => {
  
                });
            }

    function deleteElement(id) {
                axios.post('https://stasieradio.pl/cgi-bin/phpAplikacja/delete_category.php', {
                    id: id  
                })
                .then(response => {
                    fetchShowData();
                })
                .catch(error => {
                    // Handle error

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

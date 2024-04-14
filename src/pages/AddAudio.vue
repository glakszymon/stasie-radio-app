<template>
    <form ref="form" onsubmit="return false" id="myForm3">
        <label for="Title">Tytuł</label>
        <textarea class="text-input" id="Title" name="Title" placeholder="np. Wywiad z prezydentem"></textarea>
        <!-- <br/> -->
        <label for="opis">Opis</label>
        <textarea class="text-input" id="opis" name="opis" placeholder="np. Wywiad z Prezydentem z dnia 22.05.2024"></textarea>
        <!-- <br/> -->
        <div class="Prowadzacy_style">
          <label for="Autor">Autor</label>
          <select class="dropDownMenu" id="Autor" name="Autor">
              <option v-for="one in people" v-bind:value = "one.creator">{{ one.creator }}</option>
          </select>
        </div>
        <!-- <br/> -->

        <div class="Prowadzacy_style">
          <label for="kategoria">Kategoria</label>
          <select class="dropDownMenu" id="kategoria" name="kategoria">
              <option v-for="row in listItems" v-bind:value = "row.id">{{ row.nazwaKategorii }}</option>
          </select>
        </div>
        <!-- <br/> -->
        <label for="playDate">Data publikacji:</label>
        <input type="date" class="dataInput" id="playDate" name="playDate" >
        <!-- <br/> -->
        <input type="file" class="fileInput" name="audioHistory" id="audioHistory">
        <!-- <br/> -->
        <button class="submitButton" @click="submitForm">Submit</button>
    </form>
    <div>{{ odp }}</div>
</template>

<script>
import axios from 'axios';


export default {
  data() {
    return{
      odp: "",
    }
  },

  methods: {
    submitForm() {
      this.odp = "dodawanie...";
      const formData = new FormData(this.$refs.form);

      axios.post('https://stasieradio.pl/cgi-bin/phpAplikacja/addAudio.php', formData)
        .then(response => {
          console.log(response.data);
          document.getElementById("myForm3").reset();
          this.odp = response.data;
          // this.successMessage = 'Dodane';
          //this.formSubmitted = true;
        })
        .catch(error => {
          console.error('Error:', error);
          this.error = error;  
        });
    }
  }
}
</script>

<script setup>
  import { ref } from 'vue';
  import axios from 'axios';

  const listItems = ref([]);
  const people = ref([]);

  async function getData() {
    const response = await axios.get('https://stasieradio.pl/cgi-bin/phpAplikacja/importCategory.php');
    listItems.value = response.data;
    const people_data = await axios.get('https://stasieradio.pl/cgi-bin/phpAplikacja/people_import.php');
    people.value = people_data.data;
  }

  getData();  
</script>


<style>
    .text-input{
        width: 100%;
        /* width: 100%; */
        padding: 12px 20px;
        margin: 8px 0;
        display: inline-block;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
        height: 3.1rem;
    }

    .submitButton{
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
        width: 100%;
    }

    .submitButton:hover{
      background-color: #388a3b;
    }

    .dataInput{
      width: 100%;
      margin: 8px 0px;
      padding: 9px;
      border-radius: 7px;
    }

    .fileInput{
      margin: 8px 0;
      width: 100%;
    }
</style>
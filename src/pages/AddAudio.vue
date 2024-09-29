<!-- <template>
    <form ref="form" onsubmit="return false" id="myForm3">
        <label for="Title">Tytuł</label>
        <textarea class="text-input" id="Title" name="Title" placeholder="np. Wywiad z prezydentem"></textarea>
        
        <label for="opis">Opis</label>
        <textarea class="text-input" id="opis" name="opis" placeholder="np. Wywiad z Prezydentem z dnia 22.05.2024"></textarea>
        
        <div class="Prowadzacy_style">
          <label for="Autor">Autor</label>
          <select class="dropDownMenu" id="Autor" name="Autor">
              <option v-for="one in people" v-bind:value = "one.creator">{{ one.creator }}</option>
          </select>
        </div>
        

        <div class="Prowadzacy_style">
          <label for="kategoria">Kategoria</label>
          <select class="dropDownMenu" id="kategoria" name="kategoria">
              <option v-for="row in listItems" v-bind:value = "row.id">{{ row.nazwaKategorii }}</option>
          </select>
        </div>
        
        <label for="playDate">Data publikacji:</label>
        <input type="date" class="dataInput" id="playDate" name="playDate" >
         <br/> -->
        <!-- <input type="file" class="fileInput" name="audioHistory" id="audioHistory"> -->
        <!-- <label for="playDate">Link do google drive po edycji:</label>
        <textarea class="text-input" id="link" name="link" ></textarea> -->
        <!-- <br/> -->
        <!-- <button class="submitButton" @click="submitForm">Submit</button> -->
    <!-- </form> -->
    <!-- <div>{{ odp }}</div> -->
<!-- </template> -->
<template>
    <form ref="form" onsubmit="return false" id="myForm3">
        <label for="Title">Tytuł</label>
        <textarea class="text-input" id="Title" name="Title" placeholder="np. Wywiad z prezydentem"></textarea>
        <label for="opis">Opis</label>
        <textarea class="text-input" id="opis" name="opis" placeholder="np. Wywiad z Prezydentem z dnia 22.05.2024"></textarea>
        <div class="Prowadzacy_style">
          <label for="Autor">Autor</label>
          <select class="dropDownMenu" id="Autor" name="Autor">
              <option v-for="one in people" v-bind:value="one.creator">{{ one.creator }}</option>
          </select>
        </div>
        <div class="Prowadzacy_style">
          <label for="kategoria">Kategoria</label>
          <select class="dropDownMenu" id="kategoria" name="kategoria">
              <option v-for="row in listItems" v-bind:value="row.id">{{ row.nazwaKategorii }}</option>
          </select>
        </div>
         <label for="playDate">Data publikacji:</label>
        <input type="date" class="dataInput" id="playDate" name="playDate">
        <!-- <label for="audioHistory">Plik ZIP z nagraniem:</label>
        <input type="file" class="fileInput" name="audioHistory" id="audioHistory" accept=".7z"> -->


        <div class="Prowadzacy_style">
          <label for="availableAudio">Dostępne pliki audio:</label>
          <select class="dropDownMenu" id="availableAudio" name="availableAudio">
            <option v-for="audio in availableAudioFiles" :key="audio" :value="audio">
              {{ audio }}
            </option>
          </select>
        </div>


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
      availableAudioFiles: [],
    }
  },

  mounted() {
    this.getAvailableAudioFiles();
  },

  methods: {
    submitForm() {
      this.odp = "dodawanie...";
      const formData = new FormData(this.$refs.form);

      axios.post('https://stasieradio.pl/cgi-bin/phpAplikacja/addAudioftp.php', formData)
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
    },

    async getAvailableAudioFiles() {
      try {
        const response = await axios.get('https://stasieradio.pl/cgi-bin/phpAplikacja/listftp_files.php');
        this.availableAudioFiles = response.data;
      } catch (error) {
        console.error('Error fetching available audio files:', error);
      }
    }
  }
}
</script>

<script setup>
  import { ref } from 'vue';
  import axios from 'axios';

  // import { readdir } from 'fs/promises';
  // import path from 'path';

  const listItems = ref([]);
  const people = ref([]);

  async function getData() {
    const response = await axios.get('https://stasieradio.pl/cgi-bin/phpAplikacja/importCategory.php');
    listItems.value = response.data;
    const people_data = await axios.get('https://stasieradio.pl/cgi-bin/phpAplikacja/people_import.php');
    people.value = people_data.data;
  }

  getData();  


  // async function getAvailableAudioFiles() {
  //   try {
  //     const directoryPath = path.join(__dirname, '~/Dokumenty/muza/');
  //     const files = await readdir(directoryPath);
  //     availableAudioFiles.value = files.map(file => ({
  //       id: file,
  //       name: file
  //     }));
  //   } catch (error) {
  //     console.error('Error reading audio files:', error);
  //   }
  // }


  // Add this function to fetch available audio files
  // async function getAvailableAudioFiles() {
  //   try {
  //     const response = await axios.get('https://stasieradio.pl/cgi-bin/phpAplikacja/audio/');
  //     this.availableAudioFiles = response.data;
  //   } catch (error) {
  //     console.error('Error fetching available audio files:', error);
  //   }
    
  // }

  // getAvailableAudioFiles();

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

    .dropDownMenu[multiple] {
      height: auto;
      min-height: 100px;
    }
</style>
<template>

  <form ref="form" onsubmit="return false" id="myForm1">
    <div class="">
        <label for="title">Tytuł</label>
        <input type="text" class="title_style" id="title" name="title">
    </div>
    <br/>

    <div class="Prowadzacy_style">
        <label for="creator">LLLLProwadzący</label>
        <select class="dropDownMenu" id="creator" name="creator">
            <option v-for="row in listItems" v-bind:value = "row.creator">{{ row.creator }}</option>
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

    <div class="time_style">
        <label for="timeStart">Czas start</label>
        <input type="time" class="time_input_style" id="timeStart" name="timeStart">
    </div>

    <br/>

    <div class="time_style">
        <label for="timeEnd">Czas stop</label>
        <input type="time" class="time_input_style" id="timeEnd" name="timeEnd">
    </div>

    <br/>
    
    <div class="opis_group">
        <label for="opis">Opis programu</label>
        <textarea class="opis_style" id="opis" name="opis"></textarea>
    </div>

    <br/>

    <button class="submitButton" @click="submitForm" >Submit</button>
    </form>
</template>


<script setup>
import { ref } from 'vue';
import axios from 'axios';

const listItems = ref([]);

async function getData() {
  const response = await axios.get('https://stasieradio.pl/cgi-bin/phpAplikacja/people_import.php');
  listItems.value = response.data;
}

getData();  
</script>

<script>
import axios from 'axios';

export default {

    methods: {
    submitForm() {
      const formData = new FormData(this.$refs.form);
    
      axios.post('https://stasieradio.pl/cgi-bin/phpAplikacja/ramowka_add.php', formData)
        .then(response => {
          console.log('Success:', response.data);
          document.getElementById("myForm1").reset();
          this.formSubmitted = true;
        })
        .catch(error => {
          console.error('Error:', error);
          this.error = error;
        });
    }
}
}
</script>


<style>
    .date-input{
        width: 100%;
        /* width: 100%; */
        padding: 12px 20px;
        margin: 8px 0;
        display: inline-block;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
    }

    .time_input_style{
      margin-left: 10rem;
      
    }

    .date-group{
        display: flex;
        /* flex-direction: column; */
        align-items: flex-start;
        width: 100%;
    }
    .start_time_style, .end_time_style{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 100%;
    }

    .Prowadzacy_style{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 100%;
        margin-top: 0.5rem;
    }

    .dropDownMenu{
        width: 100%;
        padding: 12px 20px;
        margin: 8px 0;
        display: inline-block;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
    }

    .opis_style{
        width: 100%;
        padding: 12px 20px;
        margin: 8px 0;
        display: inline-block;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
        height: 6rem;
    }

    .title_style{
        width: 100%;
        padding: 12px 20px;
        margin: 8px 0;
        display: inline-block;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
        height: 4rem;
    }

    .opis_group{
        margin-top: 0.5rem;
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

</style>

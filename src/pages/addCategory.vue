<template>
    <form ref="form" onsubmit="return false" id="myForm9">
        <label for="name">Nazwa Kategorii</label>
        <textarea class="text-input" id="name" name="name" placeholder="Nazwa"></textarea>
        <button class="submitButton" @click="submitForm">Submit</button>
    </form>
</template>

<script>
import axios from 'axios';

export default {

  methods: {
    submitForm() {
      const formData = new FormData(this.$refs.form);

      axios.post('https://stasieradio.pl/cgi-bin/phpAplikacja/addCategory.php', formData)
        .then(response => {
          document.getElementById("myForm9").reset();
          // this.successMessage = 'Dodane';
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
</style>
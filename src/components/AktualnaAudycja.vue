<script setup>
    import '@coreui/coreui/dist/css/coreui.min.css'

    import axios from 'axios';
    import { onMounted, ref } from 'vue';
    const listItems = ref([]);


    //----------------Aktualne programy----------------

    const aktulanaOpcja = ref([]);
    const zmienione = ref(false);

    
    const PeopleList = ref([]);

    function stop_program(){
        axios.post('http://localhost/stop_program_aktualny.php')
        .then(response => {
            zmienione.value = false;
            fetchAktualnaData();
        })
    }

    // function start_program(title_of_program, creator_of_program)
    // {
    //     axios.post('http://localhost/start_program_aktualna.php',{
    //         title: title_of_program,
    //         creator: creator_of_program,
    //     })
    //     .then(response => {
    //         zmienione.value = true;
    //         fetchAktualnaData();
    //     })
    // }

    function mounted(){
        setInterval(() => {
            fetchAktualnaData();  
        }, 10000);
    }

    function fetchAktualnaData(){

        axios.get('https://stasieradio.pl/cgi-bin/phpAplikacja/get_program_aktualny.php')
                .then(response => {
                    // console.log(response.data);
                    aktulanaOpcja.value = response.data;
                })
                .catch(error => {
                    // Handle error

                });
    }
    
    fetchAktualnaData();
    mounted();

</script>

<template>
    <!-- <footer class="actual_program_show" v-for="akt in aktulanaOpcja">
            <h3>Aktualnie grana audycja</h3>
            <div class="dane_aktualne">
                <p>Tytuł: {{ akt.title }}</p>
                <p>Autor: {{ akt.creator }}</p>
                <button @click="stop_program()">Ustaw domyślne</button>
            </div>
    </footer> -->
</template>

<style>
    .dane_aktualne{
        display: grid;
        grid-template-columns: auto auto auto;
        font-size: larger;
    }

    .actual_program_show{
        width: 100%;
        /*  position: absolute; */
         /* bottom: 0; */
        background-color: #67f56c;
        /* left: 0; */
        height: 8rem;
        padding: 1rem;
        padding-left: 2rem;
        position: fixed;
        bottom: 0;
        z-index: 1;
    }
</style>
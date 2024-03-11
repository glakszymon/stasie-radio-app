<script setup>
    // import { CSidebar, CSidebarBrand, CSidebarNav, CNavItem, CBadge, CSidebarToggler } from '@coreui/vue'
    // import { CIcon } from '@coreui/icons-vue';
    import '@coreui/coreui/dist/css/coreui.min.css'

</script>

<template>
    <nav>
        <div class="title">
            <img src="../assets/img/logo.png" class="logo">
            Stasie Radio
        </div>
        <div class="navigation">
            <!-- --------Audycje--------- -->
            <li class="mini_title_functions"><b>Audycje</b></li>
            <li class="option_of_navigation">
                <img src="../assets/img/timetable.png" class="picture_of_navigation">
                <router-link class="siteLink" to="/"><p class="textSite">Plan Audycji</p></router-link>
            </li>
            <!-- <li class="option_of_navigation">
                <img src="../assets/img/list.png" class="picture_of_navigation">
                <router-link class="siteLink" to="/programy"><p class="textSite">Programy</p></router-link>
            </li> -->
            <!-- <li class="option_of_navigation">
                <img src="../assets/img/clock.png" class="picture_of_navigation">
                <router-link class="siteLink" to="/planowanie"><p class="textSite">Zaplanuj program</p></router-link>
            </li> -->
            <li class="option_of_navigation">
                <img src="../assets/img/add.png" class="picture_of_navigation">
                <router-link class="siteLink" to="/form"><p class="textSite">Dodawanie programu</p></router-link>
            </li>
            <!-- ---------Redaktorzy--------- -->
            <li class="mini_title_functions"><b>Redaktorzy</b></li>
            <li class="option_of_navigation">
                <img src="../assets/img/people.png" class="picture_of_navigation">
                <router-link class="siteLink" to="/ShowPeople"><p class="textSite">Lista prowadzących</p></router-link>
            </li>
            <li class="option_of_navigation">
                <img src="../assets/img/add-user.png" class="picture_of_navigation">
                <router-link class="siteLink" to="/people"><p class="textSite">Dodaj prowadzącego</p></router-link>
            </li>
            <!-- ---------Blog--------- -->
            <li class="mini_title_functions"><b>Blog</b></li>
            <li class="option_of_navigation">
                <img src="../assets/img/news.png" class="picture_of_navigation">
                <router-link class="siteLink" to="/ShowInfo"><p class="textSite">Wstawione posty</p></router-link>
            </li>
            <li class="option_of_navigation">
                <img src="../assets/img/add-post.png" class="picture_of_navigation">
                <router-link class="siteLink" to="/AddInfo"><p class="textSite">Dodawanie Posta</p></router-link>
            </li>
            <!-- ---------Nagrania--------- -->
            <li class="mini_title_functions"><b>Nagrania</b></li>
            <li class="option_of_navigation">
                <img src="../assets/img/Nagrania.png" class="picture_of_navigation">
                <router-link class="siteLink" to="/ShowAudio"><p class="textSite">Wstawione Nagrania</p></router-link>
            </li>
            <li class="option_of_navigation">
                <img src="../assets/img/addHistory.png" class="picture_of_navigation">
                <router-link class="siteLink" to="/AddAudio"><p class="textSite">Dodawanie Nagrań</p></router-link>
            </li>
        </div>
        <div class="title">
        </div>

        

    </nav>
</template>

<style>
nav{
    background-color: #4f5d73;
    width: 16rem;
    /* position: fixed;
    top: 0; */
}

.mini_title_functions{
    background-color: rgba(61, 90, 134, 0.95);
    height: 2.4rem;
    width: 100%;
    color: rgba(255, 255, 255, 0.87);
    padding: 0.3rem;
    padding-left: 1rem;
    font-size: large;
}

.title{
    background-color: rgba(44, 56, 74, 0.95);
    width: 100%;
    height: auto;
    /* text-align: center; */
    color: rgba(255, 255, 255, 0.87);
    font-size: 1.3rem;
    padding: 1rem 0;
}
li{
    list-style: none;
    width: 16rem;
    cursor: pointer;
}
.siteLink{
    width: 16rem;
    text-decoration: none;
}
li:hover{
    background-color: rgba(0, 0, 0, 0.26);
}
.textSite{
    color: rgba(255, 255, 255, 0.87);
    padding-top: 1.2rem;
    padding-bottom: 1.2rem;
    padding-left: 1rem;
    margin: 0;
}
.logo{
    width: 3rem;
    height: 3rem;
    margin: 0 2rem 0 1rem;
}
.option_of_navigation{
    display: flex;
}
.picture_of_navigation{
    width: 2.5rem;
    height: 2.5rem;
    margin: auto;
    margin-left: 0.5rem;
}
</style>

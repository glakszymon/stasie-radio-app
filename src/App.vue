<script setup>
    import Sidebar from './components/Sidebar.vue';
    import Audycja from './components/AktualnaAudycja.vue';

    // export default {
    //     components: {
    //         Sidebar,
    //     },
    // }
</script>

<template>
    <div>
      <Sidebar class="Sidebar" />
      <Audycja class="AudycjaStyle" />
      <div class="wartosc">
        <router-view />
      </div>
    </div>
</template>
<style>
.wartosc{
  /* margin-left: 18rem;
  margin-top: 1rem;
  margin-right: 2rem; */
  position: absolute;
  right: 2rem;
  top: 1rem;
  left: 17rem;
  /* height: 100rem; */
  padding-bottom: 8rem;
}
.Sidebar{
  position: fixed;
  top: 0;
}

</style>

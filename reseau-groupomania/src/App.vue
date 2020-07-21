<template>
  
  <v-app>
    <v-main>
      <router-view><welcome/></router-view>
    </v-main>
  </v-app>


</template>

<script>
import welcome from './components/welcome.vue';
export default {
  name: 'App',
  components: {
    welcome,
  },
  data: () => ({
    //
  }),
};
</script>

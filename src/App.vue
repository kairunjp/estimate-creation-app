<template>
  <v-app>
    <HeaderBar />
    <v-main>
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </v-main>
  </v-app>
</template>

<style scoped>
.v-main {
  padding-top: 50px;
}
</style>

<script lang="ts">
import HeaderBar from './components/Header.vue';

export default {
  name: 'App',
  components: {
    HeaderBar
  }
};
</script>
<template>
  <v-app-bar app height="50px" fixed>
    <router-link to="/" class="logo-btn">
      <v-toolbar-title class="logo">
        <span class="logo-text">見積書作成WEBアプリ</span>
      </v-toolbar-title>
    </router-link>
    <v-spacer></v-spacer>
    <v-btn v-if="$route.path === '/editor'" @click="saveEstimate">保存 (Ctrl + S)</v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import * as XLSX from "xlsx";

export default defineComponent({
  setup() {
    window.addEventListener("keydown", (event) => {
      if (event.ctrlKey && event.key === "s") {
        event.preventDefault();
        saveEstimate();
      }
    });

    const saveEstimate = () => {
      const json = JSON.parse(localStorage.getItem("json") || "[]");

      const wb = XLSX.utils.book_new();
      json.forEach((sheet: any) => {
        const sheetName = Object.keys(sheet)[0];
        const sheetData = sheet[sheetName];
        const ws = XLSX.utils.aoa_to_sheet(sheetData);
        XLSX.utils.book_append_sheet(wb, ws, sheetName);
      });

      XLSX.writeFile(wb, "見積書.xlsx");
    };

    return {
      saveEstimate,
    };
  },
});
</script>

<style>
.v-app-bar {
  background-color: rgb(var(--v-theme-surface));

  left: env(titlebar-area-x, 0) !important;
  top: env(titlebar-area-y, 0) !important;
  width: env(titlebar-area-width, 100%) !important;

  .v-spacer {
    -webkit-app-region: drag;
    height: 50px;
  }

  .logo-btn {
    text-decoration: none !important;
  }

  .logo {
    display: flex;
    align-items: center;
    height: 50px;
  }

  .logo-text {
    color: rgb(var(--v-theme-primary));
    font-size: 24px;
    font-weight: bold;
    line-height: 34px;
    user-select: none;
    padding-left: 15px;
  }
}
</style>
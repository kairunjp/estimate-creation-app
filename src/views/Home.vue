<template>
    <v-container class="fill-height d-flex justify-center align-center">
        <v-row class="d-flex justify-center align-center">
            <v-col cols="12" md="6" class="d-flex justify-center">
                <v-btn @click="openFile" class="d-flex flex-column align-center" outlined
                    style="width: 80%; height: 45%;">
                    <v-icon large>mdi-folder-open</v-icon>
                    <span style="font-size: 1.5rem;">開く (.xlsx)</span>
                </v-btn>
            </v-col>

            <v-col cols="12" md="6" class="d-flex justify-center">
                <v-btn @click="createEstimate" class="d-flex flex-column align-center" outlined
                    style="width: 80%; height: 45%;">
                    <v-icon large>mdi-file-plus</v-icon>
                    <span style="font-size: 1.5rem;">作成</span>
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { useRouter } from "vue-router";
import * as XLSX from "xlsx";

export default {
    methods: {
        openFile() {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = ".xlsx";
            input.onchange = (e: Event) => {
                const target = e.target as HTMLInputElement;
                if (!target || !target.files || target.files.length === 0) {
                    return;
                }
                const file = target.files[0];
                const reader = new FileReader();
                reader.onload = (event) => {
                    const result = event.target?.result;
                    if (!result || typeof result === "string") {
                        return;
                    }

                    const data = new Uint8Array(result as ArrayBuffer);
                    const workbook = XLSX.read(data, { type: "array" });

                    const json = workbook.SheetNames.map((sheetName) => {
                        const sheet = workbook.Sheets[sheetName];
                        return {
                            [sheetName]: XLSX.utils.sheet_to_json(sheet, { header: 1 }),
                        };
                    });

                    localStorage.setItem("json", JSON.stringify(json));
                    this.$router.push("/editor");
                };
                reader.readAsArrayBuffer(file);
            };
            input.click();
        },
        createEstimate() {
            this.$router.push("/editor");
        },
    },
    setup() {
        const router = useRouter();

        return {
            router,
        };
    },
};
</script>

<style>
.fill-height {
    height: calc(100vh - 50px);
}
</style>

<template>
    <v-list>
        <v-list-item v-for="(sheet, index) in sheets" :key="index"
            :to="`/editor?name=${encodeURIComponent(Object.keys(sheet)[0])}`" class="sidebar-button"
            :class="{ 'active-link': currentRoute.fullPath === `/editor?name=${encodeURIComponent(Object.keys(sheet)[0])}` }">
            <v-list-item-content class="d-flex align-center justify-space-between">
                <v-list-item-title>{{ Object.keys(sheet)[0] }}</v-list-item-title>
                <v-btn @click="openDeleteDialog(index)" outlined class="square-btn">
                    <v-icon>mdi-delete</v-icon>
                </v-btn>
            </v-list-item-content>
        </v-list-item>
    </v-list>
    
    <v-btn @click="add_dialog = true" outlined class="square-btn">
        <v-icon>mdi-plus</v-icon>
    </v-btn>

    <v-dialog v-model="delete_dialog" max-width="290">
        <v-card>
            <v-card-title class="headline">本当に削除しますか？</v-card-title>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="onPrimaryContainer darken-1" @click="delete_dialog = false">キャンセル</v-btn>
                <v-btn color="primary darken-1" @click="confirmDelete">削除</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-dialog v-model="add_dialog" max-width="290">
        <v-card>
            <v-card-title class="headline">人物を追加</v-card-title>
            <v-card-text>
                <v-text-field v-model="Name" label="名前" outlined></v-text-field>
                 <v-text-field v-model="Postcode" label="郵便番号" outlined></v-text-field>
                <v-text-field v-model="Address" label="住所" outlined></v-text-field>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="onPrimaryContainer darken-1" @click="add_dialog = false">キャンセル</v-btn>
                <v-btn color="primary darken-1" @click="addSheet">追加</v-btn>
            </v-card-actions>
        </v-card>   
    </v-dialog>
</template>

<script lang="ts">
import { useRoute } from "vue-router";
import { ref } from "vue";

export default {
    setup() {
        const currentRoute = useRoute();

        if (localStorage.getItem("json") === null) {
            localStorage.setItem("json", JSON.stringify([]));
        }

        const sheets = ref(JSON.parse(localStorage.getItem("json") || "[]"));
        
        const add_dialog = ref(false);

        const addSheet = () => {
            if (!Name.value || !Postcode.value || !Address.value) {
                return;
            }

            if (Postcode.value) {
                if (!/^\d{3}-\d{4}$/.test(Postcode.value)) {
                    return;
                }
            }

            add_dialog.value = false;

            const json = JSON.parse(localStorage.getItem("json") || "[]");

            json.push({
                [Name.value]: [
                    ["郵便番号", Postcode.value],
                    ["住所", Address.value],
                    [],
                    ["日付", "商品名", "価格", "個数", "小計"],
                ],
            });

            localStorage.setItem("json", JSON.stringify(json));

            sheets.value = json;

            Name.value = "";
            Postcode.value = "";
            Address.value = "";
        };

        const delete_dialog = ref(false);
        const deleteIndex = ref<number | null>(null);

        const Name = ref("");
        const Postcode = ref("");
        const Address = ref("");

        const openDeleteDialog = (index: number) => {
            deleteIndex.value = index;
            delete_dialog.value = true;
        };

        const confirmDelete = () => {
            if (deleteIndex.value !== null) {
                const json = JSON.parse(localStorage.getItem("json") || "[]");
                json.splice(deleteIndex.value, 1);
                localStorage.setItem("json", JSON.stringify(json));

                sheets.value = json;
            }
            delete_dialog.value = false;
            deleteIndex.value = null;
        };

        return {
            currentRoute,
            sheets,
            addSheet,
            delete_dialog,
            deleteIndex,
            openDeleteDialog,
            confirmDelete,
            add_dialog,
            Name,
            Postcode,
            Address,
        };
    },
};
</script>

<style scoped>
.active-link {
    background-color: rgb(var(--v-theme-onPrimaryContainer));
    color: rgb(var(--v-theme-onPrimary));
}
</style>

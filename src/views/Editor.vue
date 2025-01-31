<template>
    <v-container>
        <v-row>
            <v-col cols="3">
                <SideBar />
            </v-col>
            <v-col cols="9">
                <v-row>
                    <v-col cols="12">
                        <h2>郵便番号: 〒{{ user_details[0][1] }}</h2>
                        <h2>住所: {{ user_details[1][1] }}</h2>
                        <v-simple-table class="custom-table">
                            <thead>
                                <tr>
                                    <th>日付</th>
                                    <th>商品名</th>
                                    <th>価格</th>
                                    <th>個数</th>
                                    <th>小計</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in listItems" :key="index">
                                    <td>{{ item[0] }}</td>
                                    <td>{{ item[1] }}</td>
                                    <td>{{ item[2] }}円</td>
                                    <td>{{ item[3] }}個</td>
                                    <td>{{ item[4] }}円</td>
                                </tr>
                            </tbody>
                        </v-simple-table>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import SideBar from '../components/Sidebar.vue';
import { useRoute } from "vue-router";
import { ref, watch } from "vue"; 

export default {
    name: 'App',
    components: {
        SideBar
    },
    data() {
        return {
            listItemNames: [
                "日付",
                "商品名",
                "価格",
                "個数",
                "小計"
            ]
        }
    },
    setup() {
        const json = JSON.parse(localStorage.getItem("json") || "[]");
        const listItems = ref([]);
        const user_details = ref([]);
        const route = useRoute();

        const updateListItems = () => {
            if (route.query.name) {
                const sheet = json.find((sheet: any) => Object.keys(sheet)[0] === route.query.name);
                if (sheet) {
                    const items = sheet[route.query.name as string].slice(4);
                    listItems.value = items;

                    const user = sheet[route.query.name as string].slice(0, 2);

                    user_details.value = user;

                }
            }
        };

        updateListItems();

        watch(() => route.query.name, updateListItems);

        return { listItems, user_details };
    }
};
</script>

<style scoped>
.custom-table th,
.custom-table td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: left;
}

.custom-table {
    width: 100%;
    border-collapse: collapse;
}
</style>

<script lang="ts">

import { defineComponent, onMounted, ref } from 'vue';
import { API } from '../network-service/api';
import { TransfersResponse } from '../interfaces/index';
import TransferTable from '../components/TransferTable.vue';
import TransferForm from '../components/TransferForm.vue';

;
export default defineComponent({
  components: {
    TransferTable,
    TransferForm,
  },
  setup() {
    const isOpen = ref(false);
    const transfers = ref<TransfersResponse[]>([])
    const page = ref(0);
    const tatalPages = ref(0);

    const handleFetch = async () => {
      const { data } = await API.get(`/transfers?size=10&page=${page.value}`);
      transfers.value = data.content;
      tatalPages.value = data.totalPages -1;
    }

    onMounted(async () => {
      const { data } = await API.get(`/transfers?size=10&page=${page.value}`);
      transfers.value = data.content;
      tatalPages.value = data.totalPages -1;

    });

    const openModal = () => {
      isOpen.value = true;

      return isOpen.value;
    }

    const handleBackPage = async () => {
      if (page.value > 0) {
        page.value -= 1;
        await handleFetch();
      }
    }
    const handleForwardPage = async () => {
      if (page.value < tatalPages.value) {
        page.value += 1;
        handleFetch();
      }
    }

    return {
      transfers,
      isOpen,
      handleFetch,
      openModal,
      page,
      handleBackPage,
      handleForwardPage,
    }
  }
})
</script>

<template>
  <button @click="openModal">
    Criar transferência
  </button>
  <TransferForm :open="isOpen" @close="isOpen = !isOpen" :submit="handleFetch" />
  <TransferTable :transfers="transfers"/>
  <div class="pagination">
    <p class="backward-button" @click="handleBackPage"><<</p>
    <p>{{ page }}</p>
    <p class="forward-button" @click="handleForwardPage">>></p>
  </div>

</template>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  width: 180px;
  padding: 18px;
  font-size: 18px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
  color: #333;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

tr:hover {
  background-color: #f5f5f5;
}

.pagination {
  width: 100%;
  padding: 30px 0;
  display: flex;
  justify-content: center;
  gap: 30px;
}

.backward-button {
  cursor: pointer;
}

.forward-button {
  cursor: pointer;
}
</style>
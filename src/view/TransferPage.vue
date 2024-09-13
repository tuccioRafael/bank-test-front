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
    const totalPages = ref(0);
    const errorMessage = ref('');

    const handleFetch = async () => {
      try {
        const { data } = await API.get(`/transfers?size=10&page=${page.value}`);
      transfers.value = data.content;
      totalPages.value = data.totalPages -1;
      } catch (error) {
        errorMessage.value = 'Erro ao buscar transferências';
      }
    }

    onMounted(async () => {
      try {
        const { data } = await API.get(`/transfers?size=10&page=${page.value}`);
        transfers.value = data.content;
        totalPages.value = data.totalPages -1;
      } catch (error) {
        errorMessage.value = 'Erro ao buscar transferências';
      }

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
      if (page.value < totalPages.value) {
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
      totalPages,
      handleBackPage,
      handleForwardPage,
      errorMessage
    }
  }
})
</script>

<template>
  <button @click="openModal">
    Criar transferência
  </button>
  <div v-if="errorMessage" class="error">
    <p>{{ errorMessage }}</p>
  </div>
  <TransferForm :open="isOpen" @close="isOpen = !isOpen" :submit="handleFetch" />
  <p>total page {{ totalPages + 1 }}</p>
  <TransferTable :transfers="transfers"/>
  <div class="pagination">
    <p class="backward-button" @click="handleBackPage"><<</p>
    <p>{{ page + 1 }}</p>
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

.error {
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  align-items: center;
}

.error p {
  color: red;
  font-size: 20px;
  padding: 20px;
  border: 1px solid red;
}
</style>
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


    const handleFetch = async () => {
      const { data } = await API.get('/transfers');
      console.log(data);
    }

    onMounted(async () => {
      const { data } = await API.get('/transfers');
      transfers.value = data.content;
      console.log(data.content);

    });

    const openModal = () => {
      isOpen.value = true;

      return isOpen.value;
    }

    return {
      transfers,
      isOpen,
      handleFetch,
      openModal,
    }
  }
})
</script>

<template>
  <!-- <p>{{ transfers[0].id }}</p> -->

  <button @click="openModal">
    Open Modal
  </button>
  <TransferForm :open="isOpen" @close="isOpen = !isOpen">
    
  </TransferForm>
  <!-- <TransferTable :transfers="transfers" /> -->

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
</style>
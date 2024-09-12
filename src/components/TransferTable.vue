<script lang="ts">
import { defineComponent, ref } from 'vue';
import { TransfersResponse } from '../interfaces';



export default defineComponent({
  name: "TransferTable",
  props: {
    transfers: {
      type: Array as () => TransfersResponse[],

    },
  },
  setup() {
    const isOpen = ref(false);

    const openModal = () => {
      isOpen.value = true;

      return isOpen.value;
    }
    return {
      openModal,
      isOpen,
    }
  }

})
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>Id</th>
        <th>Conta de origem</th>
        <th>Conta de destino</th>
        <th>Valor</th>
        <th>Taxa</th>
        <th>Data da transferecia</th>
        <th>Data de criação</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="transfer in transfers" :key="transfer.id" class="tbody">
        <td>{{ transfer.id }}</td>
        <td>{{ transfer.originAccount }}</td>
        <td>{{ transfer.destinationAccount }}</td>
        <td>{{ transfer.transferValue }}</td>
        <td>{{ transfer.rate }}</td>
        <td>{{ transfer.transferDate }}</td>
        <td>{{ transfer.createdAt }}</td>
      </tr>
    </tbody>
  </table>
  <div>
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

.tbody:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.actions {
  display: flex;
  gap: 10px;
}

p {
  cursor: pointer;
  color: blue;
  text-decoration: underline;
}
</style>
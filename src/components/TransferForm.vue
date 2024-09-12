<script lang="ts">
import { defineComponent, ref, PropType, reactive } from 'vue';
import { TransfersRequest, TransfersUpdateRequest } from '../interfaces';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { API } from '../network-service/api';

export default defineComponent({
  name: 'TransferForm',
  props: {
    open: {
      type: Boolean,
      required: true,
    },
    transferUpdateRequest: {
      type: Object as PropType<TransfersUpdateRequest>,
    }
  },

  setup(props, { emit }) {

    const form = reactive({
      originAccount: '',
      destinationAccount: '',
      transferValue: '',
      transferDate: ''
    });

    const resetForm = () => {
      form.originAccount = '';
      form.destinationAccount = '';
      form.transferValue = '';
      form.transferDate = '';
    }

    const maxDate = dayjs().add(50, 'day').format('YYYY-MM-DD');
    const applyMask = (field: 'originAccount' | 'destinationAccount') => {
      form[field] = form[field].replace(/\D/g, '').slice(0, 10);
    };

    const closeModal = () => {
      emit('close', false);
      resetForm();
    };

    const submitForm = async () => {
      try {
        await API.post('/transfers', {
          originAccount: form.originAccount,
          destinationAccount: form.destinationAccount,
          transferValue: form.transferValue.replace(',', '.'),
          transferDate: form.transferDate,
        });
     
      } catch (error) {
        console.error(error);
      } finally {
        closeModal();
      }
      
    };

    const formatValue = (event: Event) => {
      let input = (event.target as HTMLInputElement).value;
      input = input.replace(/\D/g, '');
        if (input.length < 3) {
          const integerPart = input.slice(0, input.length - 2);
          const decimalPart = input.slice(-2);
          form.transferValue = `${integerPart},${decimalPart}`
        }
      const integerPart = input.slice(0, input.length - 2);
      const decimalPart = input.slice(-2);
      form.transferValue = `${integerPart},${decimalPart}`
    };

    return {
      form,
      maxDate,
      applyMask,
      submitForm,
      closeModal,
      formatValue,
    };
  }
});
</script>

<template>
  <div v-if="open" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <h3>Modal Title</h3>
      <form @submit.prevent="submitForm">
        <!-- Conta de Origem -->
        <div class="form-group">
          <label for="originAccount">Conta de Origem</label>
          <input id="originAccount" v-model="form.originAccount" type="text" maxlength="10" minlength="10"
            placeholder="Digite 10 números" @input="applyMask('originAccount')" required />
        </div>

        <!-- Conta de Destino -->
        <div class="form-group">
          <label for="destinationAccount">Conta de Destino</label>
          <input id="destinationAccount" v-model="form.destinationAccount" type="text" maxlength="10" minlength="10"
            placeholder="Digite 10 números" @input="applyMask('destinationAccount')" required />
        </div>

        <!-- Valor da Transferência -->
        <div class="form-group">
          <label for="transferValue">Valor da Transferência</label>
          <input id="transferValue" v-model="form.transferValue" type="text" minlength="4" placeholder="Digite o valor"
            @input="formatValue" required />
        </div>

        <!-- Data da Transferência -->
        <div class="form-group">
          <label for="transferDate">Data da Transferência</label>
          <input id="transferDate" v-model="form.transferDate" :min="new Date().toISOString().split('T')[0]" type="date"
            :max="maxDate" required />
        </div>

        <!-- Botão de envio -->
        <button type="submit">Enviar Transferência</button>
        <button class="btn" @click="closeModal">Close</button>
        <button class="modal-close" @click="closeModal">&times;</button>
      </form>
    </div>
    <slot></slot>
  </div>
</template>



<style scoped>
.modal-overlay {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;

}

.btn {
  margin-left: 20px;
  color: red;
}

.modal-content {
  max-width: 40%;
  background: #fff;
  border-radius: 10px;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 30px;
}




.form-group {
  width: 100%;
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-size: 18px;
}

.form-group input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  height: 45px;
  font-size: 16px;
  border-radius: 10px;
  border: 1px solid #7159c1;

}

.form-group input:focus {
  border: 1px solid #5a4aa5;
  box-shadow: 0px 0px 5px 0px #5a4aa5;
}

.form-group input:disabled {
  background-color: #d0d0d0;
}


.modal-close {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
}

</style>
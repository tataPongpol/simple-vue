<template>
  <div class="container">
    <transaction-table></transaction-table>
    <div class="create">
        <h1>บัญชีรายรับ-รายจ่าย</h1>
        <h2>เพิ่มรายการใหม่</h2>
        <div class="date-input">
            <label for="date">วัน/เดือน/ปี</label>
            <input type="date" v-model="form.date">
        </div>
        <div class="list">
            <label for="list">รายการ</label><br>
            <input type="text" v-model="form.list">
        </div>
        <div class="money">
            <label for="income">รายรับ</label><br>
            <input type="number" min="0" value="0" v-model="form.income">
        </div>
        <div class="money">
            <label for="expense">รายจ่าย</label><br>
            <input type="number" min="0" value="0" v-model="form.expense">
        </div>
        <div>
            <button @click="addTransaction">ยืนยัน</button>
        </div>
        
    </div>
  </div>
</template>

<script>
import TransactionTable from './TransactionTable.vue'
import TransactionStore from '@/store/transaction'
import moment from 'moment'
export default {
  components: {
    TransactionTable 
  },
  data() {
    return {
        transactions: [],
        form: {
            date: '',
            list: '',
            income: 0,
            expense: 0,
            balance: 0,
            totalIncome: 0,
            totalExpense: 0
        }
    }
  },
  methods: {
    clearForm() {
        this.form =  {
            date: '',
            list: '',
            income: 0,
            expense: 0,
            balance: 0,
            totalIncome: 0,
            totalExpense: 0
        }
    },
    addTransaction() {
        let payload = {
                date: moment(this.form.date).format('DD/MM/YYYY'),
                list: this.form.list,
                income: this.form.income,
                expense: this.form.expense,
                
        }
        TransactionStore.dispatch('addTransaction', payload)
        this.clearForm()
    },
  }
}
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Kanit&display=swap');
    *, html {
        font-family: 'Kanit', sans-serif;
        margin: 0;
        padding: 0;
    }
    h1 {
        font-size: 2.8rem;
        margin-top: 30px;
        margin-bottom: 30px;
    }
    h2 {
        color: #055531;
        margin-bottom: 20px;
    }
    input {
        margin-top: 10px;
        margin-bottom: 20px;
        padding: 10px;
        font-size: 1.2rem;
        width: 80%;
        color: #42b983;
    }
    button {
        /* margin-top: 10px;
        margin-bottom: 10px;
        padding: 15px;
        width: 100%; */
        background-color: #444;
        color: #fff;
        cursor: pointer;
        display: block;
        margin: 50px auto 10px;
        padding: 20px;
        font-size: 1.2rem;
        width: 50%;
    }
    .create {
        background: #42b983;
        width: 60%;
        /* margin: auto; */
        padding: 20px;
    }
    .money input {
        text-align: right;
    }
    label {
        color: rgb(139, 255, 149);
        font-size: 1.3rem;
    }
    .date-input input {
        margin-left: 20px;
        text-align: center;
        width: 40%;
    }
    .list input {
        text-align: center;
    }
    .container {
        display: flex;
        flex-direction: row;
        align-content: space-between;
        /* align-content: center; */
        margin-top: 4%;
        margin-left: 4%;
        margin-right: 4%;
    }
    .table-list {
        background: wheat;
        display: flex;
        align-items: center;
        flex-direction: column;
        width: 100%;
        padding: 20px;
    }
    .table-list .table-transaction {
        /* margin: auto; */
        align-items: center;
    }
    table {
        margin: 50px auto 20px auto;
        width: 90%;
    }
    th, tr, td {
        /* padding-top: 10px; */
        padding-left: 20px;
        padding-right: 20px;
        padding-bottom: 10px;
    }
</style>
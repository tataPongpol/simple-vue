<template>
  <div class="container">
    <div class="table-list">
        <h1>ตารางแสดงรายรับ-รายจ่าย</h1>
        <div class="table-list">
          <table class="table-transaction">
              <thead>
                  <tr>
                      <th>วัน/เดือน/ปี</th>
                      <th>รายการ</th>
                      <th>รายรับ<th>
                      <th>รายจ่าย</th>
                      <td></td>
                  </tr>
              </thead>
              <tbody>
                  <tr></tr>
                  <tr v-for="(list, index) in transactions" :key="index">
                      <td>{{ list.date }}</td>
                      <td>{{ list.list }}</td>
                      <td>{{ list.income }} บาท</td>
                      <td></td>
                      <td>{{ list.expense }} บาท</td>
                  </tr>
              </tbody>
              <tfoot>
                  <tr></tr>
                  <tr>
                      <th>รวม</th>
                      <td></td>
                      <td>{{ this.total.totalIncome }} บาท</td>
                      <td></td>
                      <td>{{ this.total.totalExpense }} บาท</td>
                  </tr>
                  <tr>
                      <td></td>
                      <th> <br><br><br> คงเหลือ</th>
                      <td> <br><br><br> {{ this.total.balance }} บาท</td>
                  </tr>
              </tfoot>
          </table>
        </div>
    </div>
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
import TransactionStore from '@/store/transaction'
import moment from 'moment'
export default {
  data() {
    return {
        transactions: [],
        form: {
            date: '',
            list: '',
            income: 0,
            expense: 0,
            // balance: 0,
            // totalIncome: 0,
            // totalExpense: 0
        },
        total: {
            balance: 0,
            totalIncome: 0,
            totalExpense: 0
        }
    }
  },
  created() {
    this.fetchTransaction() 
  },
  methods: {
    async fetchTransaction() {
        await TransactionStore.dispatch('fetchTransaction')
        this.transactions = TransactionStore.getters.transactions
        this.updateTransaction()
    },
    addTransaction() {
        let payload = {
            date: moment(this.form.date).format('DD/MM/YYYY'),
            list: this.form.list,
            income: parseInt(this.form.income),
            expense: parseInt(this.form.expense),
        }
        TransactionStore.dispatch('addTransaction', payload)
        this.clearForm()
        this.updateTransaction()
    },
    clearForm() {
        this.form =  {
            date: '',
            list: '',
            income: 0,
            expense: 0,
            // balance: 0,
            // totalIncome: 0,
            // totalExpense: 0
        }
    },
    updateTransaction() {
        this.total = {
            balance: 0,
            totalIncome: 0,
            totalExpense: 0
        }
        this.transactions.forEach(transaction => {
            this.total.totalIncome += transaction.income
            this.total.totalExpense += transaction.expense
        })
        this.total.balance = this.total.totalIncome - this.total.totalExpense
    }
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
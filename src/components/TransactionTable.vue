<template>
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
                      <td>{{ this.form.totalIncome }} บาท</td>
                      <td></td>
                      <td>{{ this.form.totalExpense }} บาท</td>
                  </tr>
                  <tr>
                      <td></td>
                      <th> <br><br><br> คงเหลือ</th>
                      <td> <br><br><br> {{ this.form.balance }} บาท</td>
                  </tr>
              </tfoot>
          </table>
        </div>
    </div>
</template>

<script>
import TransactionStore from '@/store/transaction'
export default {
    data() {
        return {
            transactions: [],
            editIndex: -1,
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
    created() {
        this.fetchTransaction()
    },
    methods: {
        fetchTransaction() {
            TransactionStore.dispatch('fetchTransaction')
            this.transactions = TransactionStore.getters.transactions

            this.updateTransaction()
        },
        updateTransaction() {
            this.transactions.forEach(transaction => {
                this.form.totalIncome += transaction.income
                this.form.totalExpense += transaction.expense
            })
            this.form.balance = this.form.totalIncome - this.form.totalExpense
        }
    }
}
</script>

<style scoped>

</style>
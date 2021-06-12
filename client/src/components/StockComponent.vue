
<template>
  <v-overlay :dark="false" align="center" v-if="stockOpen">
    <div 
      v-for="(stock, index) in stocks"
      :item="stock"
      :index="index"
      :key="stock._id"
    >
      <v-card width="95vw" max-height="95vh" class="overflow-y-auto">

        <!-- Header -->
        <v-card-title>
          {{ stock.Company }} ({{ stock.Ticker }})
          <v-spacer/>
          <v-btn icon color="primary" @click="stockOpen=false">
            <v-icon size=35> mdi-close-box-outline </v-icon>
          </v-btn>
        </v-card-title>

        <!-- Body -->
        <v-row no-gutters>
          <v-col 
            v-for="key in Object.keys(stock)"
            :key="key"
            align="left"
            xl="2"
            lg="3"
            md="4"
            sm="6"
            cols="12"
          >
            <v-card-text class="py-0 font-weight-medium">
              {{ key }}: <span class="float-right font-weight-regular">{{ stock[key] }}</span>
            </v-card-text>
          </v-col>
        </v-row>

        <!-- Footer -->
        <v-container fluid>
          <v-row justify="center">
            <v-col cols="6">
              <v-combobox
                v-model="updateKey"
                :items="Object.keys(stock)"
                placeholder="Choose a field to modify"
                hide-details
              />
            </v-col>
  
            <v-col cols="6">
              <v-text-field
                v-model="updateValue"
                placeholder="Choose a value"
                hide-details
              />
            </v-col>

            <v-col cols="12">
              <v-btn
                color="primary" 
                @click="updateStock(stock._id)"
                height="56"
                width="95"
                tile
              >
                Update
              </v-btn>

              <v-btn 
                color="primary" 
                @click="removeStockField(stock._id)"
                height="56"
                width="95"
                tile
              >
                Delete
              </v-btn>

              <v-btn 
                color="primary"
                @click="deleteStock(stock._id)"
                height="56"
                width="95"
                tile
              >
                Delete<br>All
              </v-btn>
            </v-col>
          </v-row>
        </v-container>

      </v-card>
    </div>
  </v-overlay>
</template>

<script>
import Vue from 'vue'
import StockService from '../StockService'

export default {
  name: 'StockComponent',

  data: () => ({
    stockOpen: false,
    stocks: {},
    updateKey: null,
    updateValue: null,
  }),

  methods: {
    async getStock(ticker) {
      this.stocks = await StockService.getOneStock(ticker)
    },
    async updateStock(id) {
      Vue.set(this.stocks[0], this.updateKey, this.updateValue)
      await StockService.updateStock(id, this.updateKey, this.updateValue)
    },
    async removeStockField(id) {
      Vue.delete(this.stocks[0], this.updateKey, this.updateValue)
      await StockService.removeStockField(id, this.updateKey, this.updateValue)
    },
    async deleteStock(id) {
      this.stocks.splice(id, 1)
      await StockService.deleteStock(id)
    },
  }
}
</script>
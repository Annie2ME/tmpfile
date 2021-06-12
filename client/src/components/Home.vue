
<template>
  <v-row
    justify="center"
    align="start"
    no-gutters
  >
    <!-- Banner -->
    <v-col
      class="hidden-md-and-down pa-0 fill-height"
      lg="6"
    >
      <v-img 
        src="https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" 
        class="fill-height"
      />
    </v-col>

    <!-- Main Content -->
    <v-col
      cols="12"
      lg="6"
      md="9"
      class="pt-4"
    >
      <!-- Header -->
      <v-col cols="12">
        <h1 class="display-2 font-weight-bold text-center">
          Top Stocks of the Day
        </h1>
      </v-col>
    
      <v-col>
        <v-responsive
          class="mx-auto"
          width="500"
        >
          <v-divider/>
        </v-responsive>
      </v-col>

      <!-- Best-Performing Stocks of the Day -->
      <v-col
        class="mb-5"
        cols="12"
      >
        <v-card>
          <v-card-title class="headline font-weight-bold">
            Overall
          </v-card-title>

          <v-data-table 
            :headers="headers" 
            :items="topStocks" 
            hide-default-footer
            dense
          >
            <!-- Ticker Formatting -->
            <span
              slot="item.Ticker" 
              slot-scope="{ item }"
            >
              <b>{{ item.Ticker }}</b>
            </span>

            <!-- Price Formatting -->
            <span 
              slot="item.Price"
              slot-scope="{ item }"
              :class="getTextColor(item['Change from Open'])"
            >
              {{ currencyFormat(item.Price) }}
            </span>

            <!-- Change From Open Formatting -->
            <span 
              slot="item.Change from Open"
              slot-scope="{ item }"
              :class="getTextColor(item['Change from Open'])"
            >
              {{ percentFormat(item['Change from Open']) }}
            </span>
            
            <!-- Volume Formatting -->
            <span 
              slot="item.Volume" 
              slot-scope="{ item }"
            >
              {{ numberFormat(item.Volume) }}
            </span>

            <!-- 52-Week High Formatting -->
            <span
              slot="item.52-Week High"
              slot-scope="{ item }"
              :class="getTextColor(item['52-Week High'])"
            >
              {{ percentFormat(item["52-Week High"]) }}
            </span>

            <!-- 52-Week Low Formatting -->
            <span 
              slot="item.52-Week Low"
              slot-scope="{ item }"
              :class="getTextColor(item['52-Week Low'])"
            >
              {{ percentFormat(item["52-Week Low"]) }}
            </span>
          </v-data-table>
        </v-card>
      </v-col>

      <!-- Best-Performing Stocks of the Day by Industry-->
      <v-col
        class="mb-5"
        cols="12"
      >
        <v-card>
          <v-card-title class="headline font-weight-bold">
            By Industry
            <v-spacer/>
            <v-autocomplete
              v-model="industry"
              :items="industries"
              placeholder="Choose an industry"
              hide-details
              @input="getTopStocksByIndustry()"
              class="pa-0 ma-0"
            />
          </v-card-title>

          <v-data-table 
            :headers="headers" 
            :items="topStocksByIndustry" 
            hide-default-footer
            dense
          >
            <!-- Ticker Formatting -->
            <span 
              slot="item.Ticker" 
              slot-scope="{ item }"
            >
              <b>{{ item.Ticker }}</b>
            </span>

            <!-- Price Formatting -->
            <span 
              slot="item.Price"
              slot-scope="{ item }"
              :class="getTextColor(item['Change from Open'])"
            >
              {{ currencyFormat(item.Price) }}
            </span>

            <!-- Change From Open Formatting -->
            <span 
              slot="item.Change from Open"
              slot-scope="{ item }"
              :class="getTextColor(item['Change from Open'])"
            >
              {{ percentFormat(item['Change from Open']) }}
            </span>
            
            <!-- Volume Formatting -->
            <span 
              slot="item.Volume" 
              slot-scope="{ item }"
            >
              {{ numberFormat(item.Volume) }}
            </span>

            <!-- 52-Week High Formatting -->
            <span
              slot="item.52-Week High"
              slot-scope="{ item }"
              :class="getTextColor(item['52-Week High'])"
            >
              {{ percentFormat(item["52-Week High"]) }}
            </span>

            <!-- 52-Week Low Formatting -->
            <span 
              slot="item.52-Week Low"
              slot-scope="{ item }"
              :class="getTextColor(item['52-Week Low'])"
            >
              {{ percentFormat(item["52-Week Low"]) }}
            </span>

          </v-data-table>
        </v-card>
      </v-col>
    </v-col>
  </v-row>
</template>

<script>
  import StockService from '../StockService'

  export default {
    name: 'Home',

    data: () => ({
      headers: [
        { text: "Ticker", value: "Ticker" },
        { text: "Price", value: "Price" },
        { text: "Change from Open", value: "Change from Open" },
        { text: "Volume", value: "Volume" },
        { text: "52-Week High", value: "52-Week High" },
        { text: "52-Week Low", value: "52-Week Low" }
      ],
      topStocks: [],
      topStocksByIndustry: [],
      industry: 'Apparel Stores',
      industries: []
    }),

    async created() {
      try {
        this.topStocks = await StockService.getTopStocks()
      } catch (err) {
        this.error = err.message
      }

      try {
        this.getTopStocksByIndustry()
      } catch (err) {
        this.error = err.message
      }

      try {
        this.industries = await StockService.getIndustries()
      } catch (err) {
        this.error = err.message
      }
    },

    methods: {
      async getTopStocksByIndustry() {
        this.topStocksByIndustry = await StockService.getTopStocksByIndustry(this.industry)
      },
      getTextColor(percentage) {
        if (percentage < 0) return 'red--text'
        else return 'green--text'
      },
      currencyFormat(number) {
        if (number != null)
          return number.toLocaleString(undefined, { style: 'currency', currency: 'USD'})
      },
      numberFormat(number) {
        if (number != null) return number.toLocaleString()
      },
      percentFormat(number) {
        if (number > 0 && number != null) 
          return "+" + number.toLocaleString(undefined, { style: 'percent', minimumFractionDigits: 2}) + " ▲"
        else if (number == 0 && number != null) 
          return number.toLocaleString(undefined, { style: 'percent', minimumFractionDigits: 2})
        else if (number != null) 
          return number.toLocaleString(undefined, { style: 'percent', minimumFractionDigits: 2}) + " ▼"
      }
    }
  }
</script>
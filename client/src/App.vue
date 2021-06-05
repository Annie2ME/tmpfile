
<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      height="64"
      dark
    >
      <!-- Logo and Home Button -->
      <div class="d-flex align-center">
        <router-link to="/">
          <v-img
            alt="Stocks Logo"
            class="shrink mr-2"
            contain
            src="./assets/stocks-logo.png"
            transition="scale-transition"
          />
        </router-link>
      </div>

      <v-spacer/>

      <div class="d-flex align-center">
        <!-- Create Stock Button -->
        <v-btn
          to="/create"
          depressed
          icon
        >
          <v-icon>mdi-plus-circle</v-icon>
        </v-btn>
        
        <v-divider vertical/>

        <!-- Search Components -->
        <v-container>
          <!-- Search Stock Field -->
          <v-combobox
            ref="searchBox"
            v-model="dummyTicker"
            class="ticker"
            :items="tickers"
            label="Find a stock"
            hide-details
            hide-no-data
            @change="onAutoCompleteSelection"
            @keyup="customOnChangeHandler"
            @paste="customOnChangeHandler"
            @keyup.enter="searchStock(ticker)"
          >
            <!-- Search Stock Button -->
            <template v-slot:append>
              <v-btn
                depressed 
                tile
                color="primary"
                class="ma-0"
                @click="searchStock(ticker)"
              >
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
            </template>
          </v-combobox>
        </v-container>

      </div>
    </v-app-bar>

    <!-- Main Display Area -->
    <v-content>
      <router-view class="fill-height"/>
      <StockComponent ref="stockRef"/>
    </v-content>

    <!-- Error Messages -->
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      color="white"
    >
      <v-alert
        color="red"
        border="left"
        elevation="2"
        colored-border
        icon="mdi-alert-circle"
        @click="snackbar = false"
        class="mx-n4 my-n2"
      >
        Stock not found! Please try another <strong>ticker</strong>.
      </v-alert>
    </v-snackbar>

  </v-app>
</template>

<script>
import StockComponent from './components/StockComponent.vue'
import StockService from './StockService'

export default {
  name: 'App',

  components: {
    StockComponent,
  },

  data: () => ({
    dummyTicker: null,
    ticker: null,
    tickers: [],

    snackbar: false,
    timeout: 2000,
  }),

  async created() {
    try {
      this.tickers = await StockService.getTickers()
    } catch (err) {
      this.error = err.message
    }
  },

  methods: {
    searchStock(ticker) {
      if (this.tickers.includes(ticker)) {
        this.$refs.stockRef.getStock(ticker)
        this.$refs.stockRef.stockOpen = true
        this.$refs.searchBox.isMenuActive=false
      } else {
        this.snackbar = true
      }
    },
    onAutoCompleteSelection() {
      if (this.dummyTicker != null) {
        this.ticker = this.dummyTicker.toUpperCase()
      }
    },
    customOnChangeHandler() {
      let vm = this
      setTimeout(() => {
        if(vm.$refs.searchBox && vm.$refs.searchBox.internalSearch != null) {
          vm.ticker = vm.$refs.searchBox.internalSearch.toUpperCase()
        }
      })
    }
  }
};
</script>
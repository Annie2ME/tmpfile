
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
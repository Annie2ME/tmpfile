<template>
    <v-row 
      justify="center" 
      align="start"
      class="pt-4"
      no gutters
    >
      <!-- Header -->
      <v-col cols="12">
        <h1 class="display-2 font-weight-bold text-center">
          Create a Stock
        </h1>
      </v-col>
    
      <v-col cols="12">
        <v-responsive
          class="mx-auto"
          width="500"
        >
          <v-divider/>
        </v-responsive>
      </v-col>
      
      <!-- Stepper -->
      <v-stepper 
        v-model="step" 
        vertical 
        class="fill-height elevation-0"
      >
        <!-- Step One -->
        <v-stepper-step :complete="step > 1" step="1">
          Enter your company's name
        </v-stepper-step>

        <v-stepper-content step="1">
          <v-form v-model="nameValid">
            <v-text-field
              label="Company name"
              v-model="name"
              :rules="nameRules"
            />
            <v-btn 
              color="primary"
              @click="step = 2, setName(name)"
              :disabled="!nameValid"
            >
              Continue
            </v-btn>
            <v-btn text to="/">Cancel</v-btn>
          </v-form>
        </v-stepper-content>

        <!-- Step Two -->
        <v-stepper-step :complete="step > 2" step="2">
          Choose a ticker
        </v-stepper-step>

        <v-stepper-content step="2">
          <v-form v-model="tickerValid">
            <v-text-field
              label="Ticker"
              class="ticker"
              v-model="ticker"
              :rules="tickerRules"
              @keyup="uppercase"
            />
            <v-btn 
              color="primary" 
              @click="step = 3, setTicker(ticker)" 
              :disabled="!tickerValid"
            >
              Continue
            </v-btn>
            <v-btn text @click="step = 1">Cancel</v-btn>
          </v-form>
        </v-stepper-content>

        <!-- Step Three -->
        <v-stepper-step :complete="step > 3" step="3">
          Please add any available information
        </v-stepper-step>

        <v-stepper-content step="3">
          <!-- Body -->
          <v-row no-gutters>
            <v-col 
              v-for="key in Object.keys(stocks)"
              :key="key"
              align="left"
              xl="2"
              lg="3"
              md="4"
              sm="6"
              cols="12"
            >
              <v-card-text class="py-0 font-weight-medium">
                {{ key }}: <span class="float-right font-weight-regular">{{ stocks[key] }}</span>
              </v-card-text>
            </v-col>
          </v-row>

          <!-- Footer -->
          <v-container fluid>
            <v-row justify="center">
              <v-col
                cols="12"
                sm="4"
              >
                <v-combobox
                  v-model="updateKey"
                  :items="Object.keys(stocks)"
                  placeholder="Field to modify or add"
                  hide-details
                />
              </v-col>

              <v-col
                cols="12"
                sm="4"
              >
                <v-text-field
                  v-model="updateValue"
                  placeholder="Choose a value"
                  hide-details
                />
              </v-col>

              <v-col
                cols="12"
                sm="4"
              >
                <v-btn
                  color="primary" 
                  @click="setValue(updateKey, updateValue)"
                  height="56"
                  width="95"
                  tile
                >
                  Update
                </v-btn>

                <v-btn 
                  color="primary" 
             
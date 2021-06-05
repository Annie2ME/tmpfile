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
        </v
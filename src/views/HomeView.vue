<script setup>
import TheWelcome from '../components/TheWelcome.vue'
import HomeDetails from '../components/HomeDetails.vue'

</script>

<template>
  <HomeDetails/>
  <HomeDetails>
    <template v-slot:tope="jinadprops">
      <div>
        {{ jinadprops }}
        This is coming from the home meaning the parent 
      </div>
    </template>

    <template v-slot:jinad>
      <div>
       
        This is coming from the home meaning the parent but was carried out by jinad 
      </div>
    </template>
  </HomeDetails>
  <!-- <main>
    <TheWelcome />
  </main> -->
</template>

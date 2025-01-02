<template>
  <div>
    <h1>Página inicial para fazer o login</h1>
    
    <Login/>
  </div>
</template>

<script>
import axios from 'axios';
import Login from './Login.vue';

export default {
  data() {
    return {
      message: '',
    };
  },
  components:{
    Login
  },
  mounted() {
    axios.get('/')
      .then(response => {
        this.message = response.data.message;
      })
      .catch(error => {
        console.error(error);
      });
  },
};
</script>

<style scoped>
  h1{
    text-align: center;
    font-family: Arial, Helvetica, sans-serif;
    color: #42b983;
  }
</style>

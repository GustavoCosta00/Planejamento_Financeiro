<script>
  import axios from 'axios';

  export default {
      data() {
          return {
              usuario: '',
              senha: '',
              mensagem_de_erro: '',
              mensagem_de_acesso: ''
          };
      },
      methods: {
        async handleSubmit() {
        try {
            const response = await axios.post('/', {
                usuario: this.usuario,
                senha: this.senha
            });

            console.log('Resposta do servidor:', response.data); // Verifique a resposta

            if (response.data.success) {
                this.$router.push(response.data.redirectTo);
            } else {
                this.mensagem_de_erro = response.data.mensagem_de_erro;

                // Limpar a mensagem de erro após 3 segundos
                setTimeout(() => {
                    this.mensagem_de_erro = '';
                }, 3000);
            }
        } catch (error) {
            console.error('Erro ao enviar a requisição:', error);
            this.mensagem_de_erro = 'Erro ao se comunicar com o servidor.';
        }
}

        },

          mounted() {
             axios.get('/')
              .then(response => {
                console.log('Resposta do servidor (get):', response.data); // Verifique a resposta aqui
                if (response.data.mensagem_de_acesso) {
                  this.mensagem_de_acesso = response.data.mensagem_de_acesso;
                }
              })
              .catch(error => {
                console.error(error);
              });
          }
      
  };
</script>

<template>
  <h3>Faça seu login</h3>
  <div class="formulario">
      <p class="mensagem_de_erro"> {{ mensagem_de_erro }} </p>

      <form @submit.prevent="handleSubmit">
          <label for="username">USUÁRIO</label>
          <input type="text" v-model="usuario" id="username" name="usuario" value="usuario"/>
          <br>

          <label for="password">SENHA</label>
          <input type="password" v-model="senha" id="password" name="senha" value="senha"/>
          <br>

          <input type="submit" value="Login" id="btn-submit" />
      </form>
  </div>

  <p v-if="mensagem_de_acesso">{{ mensagem_de_acesso }}</p>  <!-- Exibe a mensagem de acesso -->
</template>

<style scoped>
* {
  padding: 0;
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  box-sizing: border-box;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; 
  background-color: #f5f5f5;
}

form {
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.formulario {
  width: 400px;
  margin-left: auto;
  margin-right: auto;
}

h3 {
  color: #42b983;
  text-align: center;
  margin-bottom: 2rem;
}

form label {
  display: block;
  text-align: left;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

form input[type="text"],
form input[type="password"] {
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

form input[type="text"]:focus,
form input[type="password"]:focus {
  border-color: #42b983;
  outline: none;
  box-shadow: 0 0 5px rgba(66, 185, 131, 0.5);
}

#btn-submit {
  margin-top: 1rem;
  width: 100%;
  padding: 0.8rem;
  border: none;
  border-radius: 4px;
  background-color: #42b983;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

#btn-submit:hover {
  background-color: #369a6b;
}

.mensagem_de_erro {
  color: red;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  text-align: center;
}
</style>

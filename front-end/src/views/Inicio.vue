<template>
  <div>
    <h1>Página inicial do administrador</h1>
    <h2>Seja bem-vindo, {{ nome_usuario }}!</h2>

    <h3>Seus investimentos:</h3>

    <button id="btn-novo-investimento" @click="toggleFormulario">Gerar novo investimento</button>

    <div v-if="mostrarFormulario" id="modal">
      <div id="modal-content">
        <button id="btn-fechar" @click="toggleFormulario">X</button>
        <h3>Vamos criar um novo investimento!</h3>

        <form @submit.prevent="enviarDados">
          <label>
            <h2>Qual o propósito do investimento? EX: Comprar um carro</h2>
            <input type="text" v-model="proposito_investimento" />
          </label>

          <select v-model="tipo_investimento">
            <option disabled value="">Escolha um investimento</option>
            <option v-for="investimento in dados_investimento" :key="investimento.Titulo">
              {{ investimento.Titulo }}
            </option>
          </select>

          <label>
            <h3>Qual será o valor aportado?</h3>
            <input
              type="text"
              v-model="valor_aportado"
              @input="formatarValor"
              placeholder="R$ 0,00"
            />
          </label>

          <label>
            <h3>Selecione a data de entrada</h3>
            <input type="date" v-model="data_inicial" />
          </label>

          <label>
            <h3>Selecione a data de saída</h3>
            <input
              type="date"
              v-model="data_saida"
              :disabled="tipo_investimento === 'Tesouro IPCA + 2029'"
            />
          </label>

          <input type="submit" value="Cadastrar" />

          <h3>Seu valor final será de: R$ {{ valor_final.toFixed(2) }}</h3>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      nome_usuario: "",
      data_saida: "",
      data_inicial: "",
      proposito_investimento: "",
      mostrarFormulario: false,
      tipo_investimento: null,
      valor_aportado: "",
      valor_final: 0.0,
      dados_investimento: [],
      rentabilidade_selic: null,
      rentabilidade_poupanca: null,
      rentabilidade_cdb: null,
      rentabilidade_lci_lca: null,
      rentabilidade_tesouro_ipca: null,
    };
  },
  mounted() {
    axios
      .get("/admin")
      .then((response) => {
        this.nome_usuario = response.data.nome_usuario;
        this.dados_investimento = response.data.investimento;
        this.rentabilidade_selic = parseFloat(this.dados_investimento[0].Rentabilidade.$numberDecimal);
        this.rentabilidade_poupanca = parseFloat(this.dados_investimento[1].Rentabilidade.$numberDecimal);
        this.rentabilidade_cdb = parseFloat(this.dados_investimento[2].Rentabilidade.$numberDecimal);
        this.rentabilidade_lci_lca = parseFloat(this.dados_investimento[3].Rentabilidade.$numberDecimal);
        this.rentabilidade_tesouro_ipca = parseFloat(this.dados_investimento[4].Rentabilidade.$numberDecimal);
      })
      .catch((error) => {
        console.error(error);
      });
  },
  methods: {
    toggleFormulario() {
      this.mostrarFormulario = !this.mostrarFormulario;
    },
    formatarValor(event) {
      const entrada = event.target.value;
      const apenasNumeros = entrada.replace(/[^\d,.-]/g, "");
      const valorNumerico = parseFloat(apenasNumeros.replace(",", "."));
      if (!isNaN(valorNumerico)) {
        this.valor_aportado = valorNumerico;
      }
    },
    calcular_valor(valor_inicial, data_inicio, data_fim, rentabilidade) {
      const inicio = new Date(data_inicio);
      const fim = new Date(data_fim);
      const taxaRentabilidadeAnual = rentabilidade / 100;
      const tempoInvestidoAnos = (fim - inicio) / (1000 * 60 * 60 * 24 * 365);
      const valorFinal = valor_inicial * Math.pow(1 + taxaRentabilidadeAnual, tempoInvestidoAnos);
      this.valor_final = Math.round(valorFinal * 100) / 100;
    },
    async enviarDados() {
      try {
        const dados = {
          proposito_investimento: this.proposito_investimento,
          tipo_investimento: this.tipo_investimento,
          valor_aportado: this.valor_aportado,
          data_de_entrada: this.data_inicial,
          data_de_saida: this.data_saida || null,
          valor_final: this.valor_final,
        };
        const response = await axios.post("/admin/submit", dados);
        if (response.data.success) {
          alert("Investimento criado com sucesso!");
          this.toggleFormulario();
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.error("Erro ao enviar a requisição:", error);
        alert("Erro ao se comunicar com o servidor.");
      }
    },
  },
  watch: {
    tipo_investimento(novo_valor) {
      const valorAportadoNumerico = parseFloat(this.valor_aportado);
      if (novo_valor === "Tesouro IPCA + 2029") {
        this.data_saida = "2029-06-06";
      }
      switch (novo_valor) {
        case "Tesouro SELIC":
          this.calcular_valor(valorAportadoNumerico, this.data_inicial, this.data_saida, this.rentabilidade_selic);
          break;
        case "Poupança":
          this.calcular_valor(valorAportadoNumerico, this.data_inicial, this.data_saida, this.rentabilidade_poupanca);
          break;
        case "CDB":
          this.calcular_valor(valorAportadoNumerico, this.data_inicial, this.data_saida, this.rentabilidade_cdb);
          break;
        case "LCI/LCA":
          this.calcular_valor(valorAportadoNumerico, this.data_inicial, this.data_saida, this.rentabilidade_lci_lca);
          break;
        case "Tesouro IPCA + 2029":
          this.calcular_valor(valorAportadoNumerico, this.data_inicial, this.data_saida, this.rentabilidade_tesouro_ipca);
          break;
      }
    },
  },
};
</script>

<style scoped>
  /* Estilos gerais */
  body {
    font-family: Arial, Helvetica, sans-serif;
    background-color: #f5f5f5;
    color: #333;
    margin: 0;
    padding: 0;
  }
  
  h1 {
    color: #42b983;
    text-align: center;
    margin-top: 2rem;
  }
  
  h2 {
    text-align: center;
    color: #369a6b;
  }
  
  h3 {
    color: #333;
    margin-bottom: 1rem;
  }
  
  /* Botão de novo investimento */
  #btn-novo-investimento {
    background-color: #42b983;
    color: #fff;
    padding: 0.8rem 1.2rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin: 1rem auto;
    display: block;
  }
  
  #btn-novo-investimento:hover {
    background-color: #369a6b;
  }
  
  /* Modal */
  #modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw; /* Usa largura total da viewport */
  height: 100vh; /* Usa altura total da viewport */
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  overflow: hidden; /* Garante que o modal não crie scroll adicional */
}

  
  #modal-content {
    background: #fff;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    width: 90%;
    max-width: 800px; /* Largura máxima menor */
    height: auto;
    max-height: 80%; /* Altura máxima ajustada */
    overflow-y: auto; /* Adiciona rolagem se necessário */
    position: relative;
  }
  
  /* Botão de fechar */
  #btn-fechar {
    position: fixed;
    top: 10px;
    right: 10px;
    background: red;
    color: white;
    border: none;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    cursor: pointer;
  }
  
  #btn-fechar:hover {
    background: darkred;
  }
  
  /* Inputs e formulário */
  form label {
    display: block;
    margin-bottom: 1rem;
  }
  
  form input[type="text"],
  form input[type="number"],
  form input[type="date"] {
    width: 100%;
    padding: 0.8rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
  }
  
  form input[type="text"]:focus,
  form input[type="number"]:focus,
  form input[type="date"]:focus {
    border-color: #42b983;
    outline: none;
    box-shadow: 0 0 5px rgba(66, 185, 131, 0.5);
  }
  
  form input[type="submit"] {
    background-color: #42b983;
    color: white;
    padding: 0.8rem 1.2rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 1rem;
    width: 100%;
  }
  
  form input[type="submit"]:hover {
    background-color: #369a6b;
  }
</style>
  
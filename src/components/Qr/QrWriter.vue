<template>
<div class="qr-writer">
  <nav-bar></nav-bar>

  <div class="columns">
    <side-nav class="column is-one-quarter"></side-nav>
    <div class="column is-two-thirds">
      <div class="field">
        <label class="label is-medium">Dados do visitante</label>
        <div class="control has-icons-left has-icons-right">
          <input class="input is-medium" type="text" v-model="nome" placeholder="Nome">
          <span class="icon is-small is-left">
                <i class="fa fa-user-circle"></i>
              </span>
          <span class="icon is-small is-right">
                <i class="fa fa-check" :class="nome ? 'has-text-success' : ''"></i>
              </span>
        </div>
      </div>

      <div class="field">
        <div class="control has-icons-left has-icons-right">
          <input class="input is-medium" v-mask="['###.###.###-##', '##.###.###/####-##']" v-model="cpf" type="text" placeholder="CPF / CNPJ">
          <span class="icon is-left">
                <i class="fa fa-address-card-o"></i>
              </span>
          <span class="icon is-right">
                <i class="fa fa-check" :class="cpf ? 'has-text-success' : ''"></i>
              </span>
        </div>
      </div>

      <div class="field">
        <div class="control has-icons-left has-icons-right">
          <input class="input is-medium" type="text" v-model="palestra" placeholder="Palestra">
          <span class="icon is-medium is-left">
                <i class="fa fa-calendar"></i>
              </span>
          <span class="icon is-medium is-right">
                <i class="fa fa-check" :class="palestra ? 'has-text-success' : ''"></i>
              </span>
        </div>
      </div>
      <qr-code-writer :value="qrCodeComputed" :options="{size:300}"> </qr-code-writer>
      <div class="button-group">
        <p>{{qrCodeComputed}}</p>
        <a @click="downloadQRCode(`${nome}`)" id="btn-download" class="button is-primary is-medium">Download</a>
        <button @click.prevent="sendToEmail()" class="button is-primary is-medium">Enviar por Email</button>
        <button @click.prevent="save()" class="button is-primary is-medium">Salvar no banco</button>
        <button @click.prevent="clearForm()" class="button is-medium is-light">Limpar</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import VueQrCode from "@xkeshi/vue-qrcode"
import SideNav from "@/components/SharedComponents/SideNav"
import NavBar from "@/components/SharedComponents/Nav";
import {
  mask
} from "vue-the-mask"
import db from "@/firebase"

export default {
  data() {
    return {
      nome: "",
      palestra: "",
      cpf: "",
      dataCodes: {}
    }
  },
  components: {
    "qr-code-writer": VueQrCode,
    SideNav,
    NavBar
  },
  directives: {
    mask
  },
  created() {
    if (this.$route.params.id) {
      this.$db
        .ref("generatedCodes")
        // .once("value")
        .orderByKey()
        .equalTo(this.$route.params.id)
        .on('value', snapshot => {
          this.dataCodes = snapshot.val()[this.$route.params.id];
          this.nome = this.dataCodes.nome
          this.palestra = this.dataCodes.palestra
          this.cpf = this.dataCodes.cpf
        })
    }
  },
  computed: {
    qrCodeComputed() {
      let qrCodeComputed = `{"nome":"${this.nome}","cpf":"${this.cpf}","palestra":"${this.palestra}"}`
      //   let obj = JSON.parse(qrCodeComputed)
      //   console.log(obj)
      return qrCodeComputed
    }
  },
  methods: {
    downloadQRCode(filename) {
      let link = document.getElementById('btn-download')
      link.href = document.querySelector('canvas').toDataURL()
      link.download = filename
    },
    clearForm() {
      this.nome = ""
      this.palestra = ""
      this.cpf = ""
    },
    save() {
      let data = {
        nome: this.nome,
        cpf: this.cpf,
        palestra: this.palestra
      }
      console.log(data)
      this.$db.ref("generatedCodes").push(data)
    },
    sendToEmail() {

    }
  }
}
</script>

<style lang="scss">
.button-group {
  text-align: center;
  margin-top: 20px;
  p {
    margin-bottom: 20px;
  }
}

canvas {
  display: block;
  margin: 0 auto;
}
</style>

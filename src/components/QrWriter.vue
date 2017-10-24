<template>
  <div class="qr-writer">
      <input type="text" placeholder="nome" v-model="nome">
      <input type="text" placeholder="cpf" v-mask="['###.###.###-##', '##.###.###/####-##']" v-model="palestra">
      <input type="text" placeholder="palestra" v-model="cpf">
      <qr-code-writer :value="qrCodeComputed" :options="{size:300}" > </qr-code-writer>
  </div>
</template>

<script>
import VueQrCode from "@xkeshi/vue-qrcode"
import { mask } from "vue-the-mask"
export default {
  data() {
    return { nome: "", palestra: "", cpf: "" }
  },
  components: {
    "qr-code-writer": VueQrCode
  },
  directives: {
    mask
  },
  computed: {
    qrCodeComputed() {
      let qrCodeComputed = `{"nome":"${this.nome}","cpf":"${this.cpf}","palestra":"${this.palestra}"}`
 //   let obj = JSON.parse(qrCodeComputed)
 //   console.log(obj)
      return qrCodeComputed
    }
  }
}
</script>

<style>

</style>

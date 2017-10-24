<template>
  <div class="qr-list">
      <ul>
          <li v-for="item in codes[0]" :key="item.key"> <ul><li>{{item.nome}}</li><li>{{item.cpf}}</li><li>{{item.palestra}}</li></ul> </li>
      </ul>
  </div>
</template>

<script>
import db from "@/firebase"

export default {
  data() {
    return {
      codes: []
    }
  },
  created() {
    db
      .ref("codes")
      .once("value")
      .then(snapshot => {
        console.log(snapshot)
        this.codes.push(snapshot.val())
      })
    console.log(this.codes)
  }
}
</script>

<style>

</style>

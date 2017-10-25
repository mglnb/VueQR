<template>
  <div class="qr-list">
    <div class="columns">
      <side-nav class="column is-one-quarter"></side-nav>
      <div class="column is-two-thirds">
        <table class="table is-fullwidth is-stripe is-hoverable">
            <thead>
              <tr>
                <th>Visitante</th>
                <th>CPF</th>
                <th>Palestra</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in codes[0]" :key="item.key">
                <td>{{item.nome}}</td>
                <td>{{item.cpf}}</td>
                <td>{{item.palestra}}</td>
              </tr>
            </tbody>
        </table>
      </div>
    </div>

      <!-- <ul>
          <li v-for="item in codes[0]" :key="item.key"> <ul><li>{{item.nome}}</li><li>{{item.cpf}}</li><li>{{item.palestra}}</li></ul> </li>
      </ul> -->
  </div>
</template>

<script>
import db from "@/firebase"
import SideNav from '@/components/SharedComponents/SideNav'
export default {
  data() {
    return {
      codes: []
    }
  },
  components: {
    SideNav
  },
  created() {
    db
      .ref("readedCodes")
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

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
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr :id="index" v-show="!item.active" v-for="(item, index) in codes" :key="index">

              <td>{{item.nome}}</td>
              <td>{{item.cpf}}</td>
              <td>{{item.palestra}}</td>
              <td style="text-align:center;">
                <div class="buttons">
                  <button @click="load" class="button is-info is-outlined">
                    <span class="icon is-small">
                      <i class="fa fa-qrcode"></i>
                    </span>
                    <span>Ver QRCode</span>
                  </button>
                  <button @click="remove(index)" class="button is-danger is-outlined">
                    <span class="icon is-small">
                      <i class="fa fa-times"></i>
                    </span>
                    <span>Delete</span>
                  </button>
                </div>
              </td>

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
  import SideNav from '@/components/SharedComponents/SideNav'

  function delay(t) {
    return new Promise(function (resolve) {
      setTimeout(resolve, t)
    });
  }
  export default {
    data() {
      return {
        codes: {},
        counter: 0,
        isLoading: false
      }
    },
    components: {
      SideNav
    },
    created() {
      this.$db
        .ref("generatedCodes")
        .once("value")
        .then(snapshot => {
          this.codes = snapshot.val()
        })
    },
    methods: {
      load(event) {


      },
      remove(key) {
        document.getElementById(key).classList.add('delected')
        delay(800)
          .then(() => {
            this.$db
              .ref('generatedCodes')
              .child(key)
              .remove()
              .then(() => {
                 document.getElementById(key).remove()
              })
          })
      }
    }

  }

</script>

<style>
table tbody {
  transition: 1s
}
.delected {
  animation: 1s delete forwards;
}


@keyframes delete {
  0% {
    height: auto;
    opacity: 1;
    visibility: visible;
  }
  100% {
    transform: rotateX(-140deg);
    transform-origin: 0% 0%;
    perspective: 2000;
    perspective-origin: 50% 50%;
    height: 0;
    opacity: 0;
    visibility: none;
    margin-bottom: -10px;
    padding: 0;
  }
}

</style>

<template>
<div class="palestra-list">
  <nav-bar></nav-bar>
  <div class="columns">
    <side-nav class="column is-one-quarter"></side-nav>
    <div class="column is-two-thirds">
      <table class="table is-fullwidth is-stripe is-hoverable">
        <thead>
          <tr>
            <th>Index</th>
            <th>Palestrante</th>
            <th>Palestra</th>
            <th>Dia</th>
            <th>Sala</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr :id="index" v-show="!item.active" v-for="(item, index) in codes" :key="index">
            <td>{{index}}</td>
            <td>{{item.palestrante}}</td>
            <td>{{item.palestra}}</td>
            <td>{{item.dia}}</td>
            <td>{{item.sala}}</td>
            <td style="text-align:center;">
              <div class="buttons">
                <router-link tag="button" :to="`create/${index}`" class="button is-info is-outlined">
                  <span class="icon is-small">
                      <i class="fa fa-qrcode"></i>
                    </span>
                  <span>Editar</span>
                </router-link>
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
</div>
</template>

<script>
import SideNav from "@/components/SharedComponents/SideNav";
import NavBar from "@/components/SharedComponents/Nav";

function delay(t) {
  return new Promise(function(resolve) {
    setTimeout(resolve, t);
  });
}
export default {
  data() {
    return {
      codes: {},
      counter: 0,
      isLoading: false
    };
  },
  components: {
    SideNav,
    NavBar
  },
  created() {
    this.$db
      .ref("palestra")
      .once("value")
      .then(snapshot => {
        this.codes = snapshot.val();
      });
  },
  methods: {
    load(event) {},
    remove(key) {
      this.$db
        .ref("palestra")
        .child(key)
        .remove()
        .then(() => {
          document.getElementById(key).classList.add("delected");
          delay(500).then(() => {
            document.getElementById(key).remove();
          });
        });
    }
  }
};
</script>

<style>
table tbody {
  transition: .7s;
}

.delected {
  animation: .8s delete forwards;
}

@keyframes delete {
  0% {
    height: auto;
    opacity: 1;
    visibility: visible;
  }
  100% {
    transform: rotateX(-100deg);
    transform-origin: 0% 0%;
    perspective: 2000;
    perspective-origin: 50% 50%;
    height: 0;
    opacity: 0;
    visibility: none;
    margin-bottom: -10px;
    padding: 0;
    line-height: 0;
  }
}
</style>

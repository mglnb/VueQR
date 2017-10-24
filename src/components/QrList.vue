<template>
  <div class="qr-list">
      <ul>
          <li v-for="item in codes[0]" :key="item"> {{item.code}} </li>
      </ul>
  </div>
</template>

<script>
import db from "../firebase";

export default {
  data() {
    return {
      codes: []
    };
  },
  created() {
    db
      .ref("codes")
      .once("value")
      .then(snapshot => {
        console.log(snapshot);
        this.codes.push(snapshot.val());
      });
    console.log(codes);
  }
};
</script>

<style>

</style>

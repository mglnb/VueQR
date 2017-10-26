<template>
<div id="app">
  <transition name="fade" mode="out-in">
      <router-view/>
  </transition>
</div>
</template>

<script>
export default {
  name: "app",
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}

button>* {
  pointer-events: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: .3s ease;
  opacity: 1;
}

.fade-enter,
.fade-leave-to
/* .fade-leave-active below version 2.1.8 */

{
  opacity: 0;
}
</style>

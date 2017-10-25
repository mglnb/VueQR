<template>
  <div id="app">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="https://bulma.io">
          <img src="../static/sajic.svg" alt="">
        </a>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script>


export default {
  name: "app"
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
.navbar {
  justify-content: center;
}
</style>

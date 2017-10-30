<template>
<nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item">
      <!-- <img src="/static/sajic.svg" alt="" width="200px"> -->
      <button @click="signOut()" class="button is-danger is-outlined">Logout</button>
    </a>
  </div>
</nav>
</template>

<script>
export default {
  methods: {
    signOut() {
        this.$router.push('/login')      
        this.$auth.signOut()
        .then(function() {
          console.log('gg')
        }).catch(function(error) {
          console.warn(error.code, error.message)
        });
    }
  }
}
</script>

<style>
.navbar {
  justify-content: center;
}

.navbar-item img {
  max-height: 100%
}
</style>

<template>
  <div class="side-nav">
      <aside class="menu">
        <p class="menu-label">
            h
        </p>
        <ul class="menu-list">
            <li><router-link to="/reader">Leitor de QRCode</router-link></li>
            <li><router-link to="/writer">Criador de QRCode</router-link></li>
            <li><router-link to="/list">Listagem de Clientes</router-link></li>
        </ul>
    </aside>
    <div class="wrapper"></div>
  </div>
</template>

<script>
export default {
    
}
</script>

<style>
.menu {
    min-height: 100vh;
}
</style>

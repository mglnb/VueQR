<template>
<div class="side-nav">
    <aside class="menu">
        <p class="menu-label">
            QRCode
        </p>
        <ul class="menu-list">
            <li>
                <ul>
                    <li><router-link to="/qrcode/reader">Leitor</router-link></li>
                    <li><router-link to="/qrcode/writer">Criador</router-link></li>                    
                    <li><router-link to="/qrcode/list">Listagem</router-link></li>
                </ul>
            </li>
        </ul>
        <p class="menu-label">
            Palestras
        </p>
        <ul class="menu-list">
            <li>
                <ul>
                    <li><router-link to="/palestra/create">Nova</router-link></li>
                    <li><router-link to="/palestra/list">Listar</router-link></li>
                </ul>
            </li>
        </ul>
        <p class="menu-label">
            Calendario
        </p>
        <ul class="menu-list">
            <li>
                <ul>
                    <li><router-link to="/calendar">Ver</router-link></li>
                </ul>
            </li>
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
.side-nav {
    padding: 0 30px;
    z-index: 9000;
}
.menu-list a.is-active {
    background: #42b983
}
</style>

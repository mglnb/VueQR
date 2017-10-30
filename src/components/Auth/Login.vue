<template>
<body class="layout-default">
    <section class="hero is-fullheight is-medium is-primary is-bold">
        <div class="hero-body">
            <div class="container">
                <div class="columns is-centered">
                    <article class="card is-rounded">
                        <div class="card-content">
                            <h1 class="title">

                                <!-- <img src="@/../static/sajic.svg" alt="logo" width="300"> -->
                            </h1>
                            <div class="field">
                                <p class="control has-icons-left">
                                    <i class="icon fa fa-envelope"></i>
                                    <input class="input" type="email" placeholder="Email" v-model="email">
                                </p>
                            </div>
                            <div class="field">
                                <p class="control has-icons-left">
                                    <i class="icon fa fa-lock"></i>
                                    <input class="input" type="password" placeholder="Password" v-model="password">
                                </p>
                            </div>
                            <p class="control">
                                <button @click="signIn()" class="button is-primary is-medium is-fullwidth">
                                 <i class="fa fa-user"></i> &nbsp; Login
                                </button>
                            </p>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    </section>
</body>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        signIn() {
            this.$nextTick(function() {
                this.$auth
                    .signInWithEmailAndPassword(this.email, this.password)
                    .then(() => {
                        this.$router.push('/')
                    })
                    .catch((e) => {
                        console.warn(e.code, e.message)
                    })
            })
        }
    }
}
</script>

<style>

</style>

<template>
<div class="palestra-create">
    <nav-bar></nav-bar>

    <div class="columns">
        <side-nav class="column is-one-quarter"></side-nav>
        <div class="column is-two-thirds">
            <div class="field">
                <label class="label is-medium">Dados do Palestra</label>
                <div class="control has-icons-left has-icons-right">
                    <input class="input is-medium" type="text" v-model="palestra" placeholder="Palestra">
                    <span class="icon is-small is-left">
                <i class="fa fa-user-circle"></i>
              </span>
                    <span class="icon is-small is-right">
                <i class="fa fa-check" :class="palestra ? 'has-text-success' : ''"></i>
              </span>
                </div>
            </div>

            <div class="field">
                <div class="control has-icons-left has-icons-right">
                    <input class="input is-medium" v-model="palestrante" type="text" placeholder="Palestrante">
                    <span class="icon is-left">
                <i class="fa fa-address-card-o"></i>
              </span>
                    <span class="icon is-right">
                <i class="fa fa-check" :class="palestrante ? 'has-text-success' : ''"></i>
              </span>
                </div>
            </div>

            <div class="field">
                <div  class="control is-medium has-icons-left has-icons-right">
                    <input ref="dia" class="input is-medium is-fullwidth" type="datetime" placeholder="Dia" v-model="dia" />
                    <span class="icon is-medium is-left">
                        <i class="fa fa-calendar"></i>
                    </span>
                    <span class="icon is-medium is-right">
                        <i class="fa fa-check" :class="dia ? 'has-text-success' : ''"></i>
                    </span>
                </div>
            </div>
            <div class="button-group">
                <button @click.prevent="save()" class="button is-primary is-medium">Salvar</button>
                <button @click.prevent="clearForm()" class="button is-medium is-light">Limpar</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import SideNav from "@/components/SharedComponents/SideNav"
import NavBar from "@/components/SharedComponents/Nav";
import db from "@/firebase"
import {
  mask
} from "vue-the-mask"
import flatpickr from 'flatpickr'

export default {
    data() {
        return {
            palestra: "",
            palestrante: "",
            dia: '',
            dataCodes: {}
        }
    },
    components: {
        SideNav,
        NavBar,
        
    },
    directives: {
        mask,
    },
    created() {
        console.log(this.$refs)
        // if (this.$route.params.id) {
        //     this.$db
        //         .ref("generatedCodes")
        //         // .once("value")
        //         .orderByKey()
        //         .equalTo(this.$route.params.id)
        //         .on('value', snapshot => {
        //             this.dataCodes = snapshot.val()[this.$route.params.id];
        //             this.palestrante = this.dataCodes.palestrante
        //             this.palestra = this.dataCodes.palestra
        //             this.dia = this.dataCodes.dia
        //         })
        // }
    },
    mounted() {
        this.$refs.dia.flatpickr({enableTime: true})
    },
    methods: {
        clearForm() {
            this.palestra = ""
            this.palestrante = ""
            this.dia = ""
        },
        save() {
            let data = {
                dia: this.dia,
                palestrante: this.palestrante,
                palestra: this.palestra
            }
            console.log(data)
            this.$db.ref("palestra").push(data)
        },
        loadFlatpickr() {
        }
    }
}
</script>

<style lang="scss">
.button-group {
    text-align: center;
    margin-top: 20px;
    p {
        margin-bottom: 20px;
    }
}

.flatpickr-wrapper {
    display: block !important;
    margin: 0 auto;
}
.flatpickr-month {
    box-sizing: border-box;
    height: 50px;
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: space-between;
}
.flatpickr-current-month {
    position: relative;
    width: auto;
    left: initial
}
.flatpickr-prev-month, .flatpickr-next-month {
    position: relative;
}
.icon.is-medium {
    font-size: 20px;
}
</style>

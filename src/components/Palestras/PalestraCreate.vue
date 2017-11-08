<template>
<div class="palestra-create">
    <nav-bar></nav-bar>
    <div v-if="success" class="notification is-success">
        <button class="delete"></button>
        <p>Registro salvo com sucesso</p>
    </div>
    <div v-if="error" class="notification is-danger">
        <button class="delete"></button>
        <p>Falha ao tentar salvar o registro</p>
    </div>
    <div class="columns">
        <side-nav class="column is-one-quarter"></side-nav>
        <div class="column is-two-thirds">
            <div class="field">
                <label class="label is-medium">Dados do Palestra</label>
                <div class="control has-icons-left has-icons-right">
                    <input class="input is-medium" type="text" v-model="palestra" placeholder="Palestra">
                    <span class="icon is-small is-left">
                <i class="fa fa-microphone "></i>
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
                <i class="fa fa-user-circle"></i>
              </span>
                    <span class="icon is-right">
                <i class="fa fa-check" :class="palestrante ? 'has-text-success' : ''"></i>
              </span>
                </div>
            </div>
            <div class="field">
                <div class="control has-icons-left has-icons-right">
                    <input class="input is-medium" v-model="descricao" type="text" placeholder="Descrição">
                    <span class="icon is-left">
                <i class="fa fa-user-circle"></i>
              </span>
                    <span class="icon is-right">
                <i class="fa fa-check" :class="descricao ? 'has-text-success' : ''"></i>
              </span>
                </div>
            </div>
            <div class="field">
                <div class="control has-icons-left has-icons-right">
                    <input class="input is-medium" v-model="img" type="text" placeholder="URL da foto de Perfil">
                    <span class="icon is-left">
                <i class="fa fa-user-circle"></i>
              </span>
                    <span class="icon is-right">
                <i class="fa fa-check" :class="img ? 'has-text-success' : ''"></i>
              </span>
                </div>
            </div>

            <div class="field">
                <div class="control has-icons-left has-icons-right">
                    <div class="select is-medium is-fullwidth">
                        <select v-model="sala">
                            <option selected disabled>Sala</option>
                            <option v-for="(value, index) in salas" :key="index" :value="value">{{value}}</option>
                        </select>
                    </div>
                    <span class="icon is-left">
                <i class="fa fa-user-circle"></i>
              </span>
                    <span class="icon is-right">
                <i class="fa fa-check" :class="sala ? 'has-text-success' : ''"></i>
              </span>
                </div>


            </div>

            <div class="field">
                <div class="control has-icons-left has-icons-right">
                    <input class="input is-medium" v-model="numeroPessoas" type="number" placeholder="Capacidade da Sala">
                    <span class="icon is-left">
                <i class="fa fa-user-circle"></i>
              </span>
                    <span class="icon is-right">
                <i class="fa fa-check" :class="numeroPessoas ? 'has-text-success' : ''"></i>
              </span>
                </div>
            </div>

            <div class="field">
                <div class="control is-medium has-icons-left has-icons-right">
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
import SideNav from "@/components/SharedComponents/SideNav";
import NavBar from "@/components/SharedComponents/Nav";
import db from "@/firebase";
import {
    mask
} from "vue-the-mask";
import flatpickr from "flatpickr";

export default {
    data() {
        return {
            error: false,
            success: false,
            palestra: "",
            palestrante: "",
            numeroPessoas: 0,
            img: "",
            descricao: "",
            subscribers: ['"'],
            sala: "Sala",
            salas: [
                "207",
                "206",
                "205",
                "204",
                "203",
                "202",
                "201",
                "Auditório",
                "209",
                "208",
                "Idiomas"
            ],
            dia: "",
            dataCodes: {}
        };
    },
    components: {
        SideNav,
        NavBar
    },
    directives: {
        mask
    },
    created() {
        console.log(this.$refs);
        if (this.$route.params.id) {
            this.$db
                .ref("palestra")
                // .once("value")
                .orderByKey()
                .equalTo(this.$route.params.id)
                .on("value", snapshot => {
                    this.dataCodes = snapshot.val()[this.$route.params.id];
                    this.palestrante = this.dataCodes.palestrante;
                    this.palestra = this.dataCodes.palestra;
                    this.descricao = this.dataCodes.descricao;
                    this.img = this.dataCodes.img;
                    this.dia = this.dataCodes.dia;
                    this.sala = this.dataCodes.sala;
                    this.numeroPessoas = this.dataCodes.numeroPessoas;
                });
        }
    },
    mounted() {
        this.$refs.dia.flatpickr({
            enableTime: true,
            dateFormat: "d-m-Y H:i",
            defaultDate: "22-11-2017 18:00",
            minDate: "22-11-2017",
            maxDate: "24-11-2017",
            time_24hr: true
        });
        document
            .querySelector(".numInput.flatpickr-minute")
            .setAttribute("step", "30");
    },
    methods: {
        clearForm() {
            this.palestra = "";
            this.palestrante = "";
            this.dia = "";
            this.img = "";
            this.descricao = "";
            (this.sala = "Sala"), (this.numeroPessoas = 0);
        },
        save() {
            if (this.$route.params.id) {
                let postData = {
                    palestrante: this.palestrante,
                    palestra: this.palestra,
                    dia: this.dia,
                    descricao: this.descricao,
                    img: this.img,
                    sala: this.sala,
                    subscribers: this.subscribers,
                    numeroPessoas: this.numeroPessoas
                };
                let updates = {};
                updates["/palestra/" + this.$route.params.id] = postData;
                this.$db
                    .ref()
                    .update(updates)
                    .then(() => {
                        this.showSuccess();
                        this.clearForm();
                    })
                    .catch(() => {
                        this.showError();
                    });
            } else {
                let data = {
                    dia: this.dia,
                    palestrante: this.palestrante,
                    palestra: this.palestra,
                    descricao: this.descricao,
                    img: this.img,
                    sala: this.sala,
                    subscribers: this.subscribers,                    
                    numeroPessoas: this.numeroPessoas
                };
                console.log(data);
                this.$db
                    .ref("palestra")
                    .push(data)
                    .then(() => {
                        this.showSuccess();
                        this.clearForm();
                    })
                    .catch(() => {
                        this.showError();
                    });
            }
        },
        showSuccess() {
            this.success = true;
            setTimeout(() => {
                this.success = false;
            }, 4000);
        },
        showError() {
            this.error = true;
            setTimeout(() => {
                this.error = false;
            }, 4000);
        }
    }
};
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
    // width: auto;
    // left: initial
}

.flatpickr-prev-month,
.flatpickr-next-month {
    position: relative;
}

.icon.is-medium {
    font-size: 20px;
}

.notification {
    animation: notification 1s forwards;
    animation-delay: 3s;
    position: fixed;
    right: 30px;
    top: 50px;
    z-index: 9999;
    transition: all 3s;
}

@keyframes notification {
    90% {
        transform: scaleY(0);
        opacity: 0;
    }
    100% {
        transform: scaleY(0);
        visibility: hidden;
    }
}

select option[data-disabled] {
    color: #888;
}
</style>

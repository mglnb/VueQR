<template>
<div class="calendar">
    <nav-bar></nav-bar>
    <div class="columns">
        <side-nav class="column is-one-quarter"></side-nav>
        <div class="column is-two-thirds">
            <vue-event-calendar :events="demoEvents"></vue-event-calendar>
        </div>
    </div>
</div>
</template>

<script>
import SideNav from '@/components/SharedComponents/SideNav'
import NavBar from '@/components/SharedComponents/Nav'
import moment from 'moment'
export default {
    data() {
        return {
            demoEvents: [],
            codes : {}
        }
    },
    components: {
        SideNav,
        NavBar
    },
    mounted() {
        this.$db
        .ref("palestra")
        .once("value")
        .then(snapshot => {
            this.codes = snapshot;
            this.codes.forEach((element) => {
                let date = element.val().dia.substring(0,10).split('-')
                let dateFinal = `${date[2]}/${date[1]}/${date[0]}`
                this.demoEvents.push({
                    date : dateFinal,
                    title : element.val().palestra,
                    desc : `Palestrante: ${element.val().palestrante}`
                })
            });
        });
    }
}
</script>

<style>

</style>

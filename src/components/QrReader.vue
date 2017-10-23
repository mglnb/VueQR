<template>
  <div class="qrcode-reader-demo container">
    <div v-for="error in errors" :key="error.index" class="error">
      {{ error }}
    </div>

    <qrcode-reader
      :paused="paused"
      @decode="onDecode"
      @locate="onLocate"
      @no-support="onError"
      @stream-loaded="onStreamLoaded"
      @permission-deny="onError">

      <div class="point" v-for="point in points" :key="point.index" :style="positionOf(point)"></div>
      <div class="content">{{ content }}</div>
      <div class="controls">
        <button type="button" class="btn btn-primary btn-sm" @click="togglePauseOnCapture">
          {{ pauseOnCapture ? 'Escaneamento continuo' : 'Pausar na captura' }}
        </button>
      </div>

    </qrcode-reader>
  </div>
</template>

<script>
import 'webrtc-adapter' // shim getUserMedia
import { QrcodeReader } from 'vue-qrcode-reader'
import db from '../firebase'
export default {
  components: { QrcodeReader },
  data () {
    return {
      points: [],
      content: 'Carregando imagem...',
      errors: [],
      paused: false,
      pauseOnCapture: true
    } 
  },
  methods: {
    onDecode (content) {
      this.content = content
      console.log(db)
      db.ref('codes').push({'code': content})
      if (this.pauseOnCapture) {
        this.paused = true
      }
    },
    onLocate (points) {
      this.points = points
    },
    onError (message) {
      this.errors.push(message)
    },
    onStreamLoaded () {
      this.content = ''
    },
    positionOf ({ x, y }) {
      return {
        'top': y + 'px',
        'left': x + 'px'
      }
    },
    togglePauseOnCapture () {
      this.pauseOnCapture = !this.pauseOnCapture
      if (!this.pauseOnCapture) {
        this.paused = false
      }
    }
  }
}
</script>

<style lang="stylus">
.qrcode-reader-demo 
  padding 0px
  .point 
    position absolute
    background-color red
    border-radius 50%
    width 10px
    height 10px
    margin-left -5px
    margin-top -5px
    transition all 40ms
  
  .content 
    position absolute
    bottom 0
    left 0
    right 0
    padding 0px 20px
    color #fff
    font-weight bold
    padding 10px
    background-color rgba(0,0,0,.5)
  
  .controls 
    margin-top 40px
  
  .error 
    color red
    font-weight bold
    padding 10px

video 
  opacity 0.1 
  width 500px
</style>
<template>
<div class="qrcode-reader-demo container">
  <div v-for="error in errors" :key="error.index" class="error">
    {{ error }}
  </div>

  <qrcode-reader :paused="paused" @decode="onDecode" @locate="onLocate" @no-support="onError" @stream-loaded="onStreamLoaded" @permission-deny="onError">

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
import "webrtc-adapter"; // shim getUserMedia
import {
  QrcodeReader
} from "vue-qrcode-reader";
export default {
  components: {
    QrcodeReader
  },
  data() {
    return {
      points: [],
      content: "Passe o QRCode pela camera para gerar seu certificado",
      errors: [],
      paused: false,
      pauseOnCapture: false
    };
  },
  methods: {
    onDecode(content) {
      this.content = content;
      this.$db.ref("readedCodes").push(JSON.parse(content));
      if (this.pauseOnCapture) {
        this.paused = true;
      }
    },
    onLocate(points) {
      this.points = points;
    },
    onError(message) {
      this.errors.push(message);
    },
    onStreamLoaded() {
      this.content = "";
    },
    positionOf({
      x,
      y
    }) {
      return {
        top: y + "px",
        left: x + "px"
      };
    },
    togglePauseOnCapture() {
      this.pauseOnCapture = !this.pauseOnCapture;
      if (!this.pauseOnCapture) {
        this.paused = false;
      }
    }
  }
};
</script>

<style lang="scss">
.qrcode-reader-demo {
  text-align: center;
  padding: 0px;
  .point {
    position: absolute;
    background-color: red;
    border-radius: 50%;
    width: 10px;
    height: 10px;
    margin-left: -5px;
    margin-top: -5px;
    transition: all 40ms;
  }
  .content {
    bottom: 0;
    padding: 0px 20px;
    color: #fff;
    font-weight: bold;
    padding: 10px;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .controls {
    margin-top: 40px;
  }
  .error {
    color: red;
    font-weight: bold;
    padding: 10px;
  }
  video {
    opacity: 0.7;
  }
}
</style>


<template>
  <div class="video-screen">
    <video
      v-if="!videoFinished"
      ref="video"
      :src="videoSrc"
      @ended="onVideoEnded"
      @click="togglePause"
      playsinline
      preload="auto"
    ></video>

    <!-- Start-Button -->
    <div v-if="!videoStarted && !videoFinished" class="overlay">
      <button
        class="play-button"
        @click="playVideo"
        aria-label="Video starten"
      >
        ▶
      </button>
    </div>

    <!-- Abschluss -->
    <div v-if="videoFinished" class="finished">
      Video beendet.
    </div>
  </div>
</template>

<script>
export default {
  name: "VideoScreen",

  props: {
    videoSrc: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      videoStarted: false,
      videoFinished: false
    };
  },

  methods: {
    playVideo() {
      // Vollbildmodus aktivieren
      const element = document.documentElement;

      if (element.requestFullscreen) {
        element.requestFullscreen().catch(() => {});
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      }

      // Video starten
      this.videoStarted = true;
      this.$refs.video.play();
    },

    // Video durch Tippen pausieren oder fortsetzen
    togglePause() {
      const video = this.$refs.video;

      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    },

    onVideoEnded() {
      this.videoFinished = true;
      this.$emit("finished");
    }
  }
};
</script>

<style scoped>
.video-screen {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  height: 100dvh;
  background: black;
  overflow: hidden;
}

video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  max-width: none;
  max-height: none;
  object-fit: contain;
  display: block;
  background: black;
}

.overlay {
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.25);
}

.play-button {
  width: 110px;
  height: 110px;
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0 0 0 8px;
  font-size: 65px;
  line-height: 1;

  border: none;
  border-radius: 50%;
  background: white;
  color: black;
  cursor: pointer;

  -webkit-user-select: none;
  user-select: none;
  caret-color: transparent;
}

.play-button:active {
  transform: scale(0.95);
}

.finished {
  color: white;
  font-size: 24px;
}
</style>

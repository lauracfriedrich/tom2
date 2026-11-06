
<template>
  <div class="response-screen">
    <div class="image-container">

      <!-- Vollständiges Endbild -->
      <img
        class="background-image"
        :src="images.src"
        alt="Endbild"
      />

      <!-- Unsichtbare Klickflächen -->
      <button
        class="hotspot hotspot-1"
        @click="selectImage(1)"
        aria-label="Linke Gedankenblase"
      ></button>

      <button
        class="hotspot hotspot-2"
        @click="selectImage(2)"
        aria-label="Mittlere Gedankenblase"
      ></button>

      <button
        class="hotspot hotspot-3"
        @click="selectImage(3)"
        aria-label="Rechte Gedankenblase"
      ></button>

    </div>
  </div>
</template>

<script>
export default {
  name: "ResponseScreen",

  props: {
    images: {
      type: Object,
      required: true
    }
  },

  methods: {
    selectImage(number) {
      this.$emit("answer", number);
    }
  }
};
</script>

<style scoped>
.response-screen {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: black;
  overflow: hidden;
}

.image-container {
  position: relative;
  height: 85dvh;
  width: auto;
  aspect-ratio: 4 / 3;
  max-width: 100vw;
  flex-shrink: 0;
  overflow: hidden;
}

.background-image {
  display: block;
  width: 100%;
  height: 100%;
  max-height: none !important;
  max-width: none;
  object-fit: fill;
}

.hotspot {
  position: absolute;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  outline: none;
}

.hotspot-1 {
  left: 1%;
  top: 5%;
  width: 29%;
  height: 69%;
}

.hotspot-2 {
  left: 35.5%;
  top: 5%;
  width: 29%;
  height: 69%;
}

.hotspot-3 {
  left: 70%;
  top: 5%;
  width: 29%;
  height: 69%;
}
</style>

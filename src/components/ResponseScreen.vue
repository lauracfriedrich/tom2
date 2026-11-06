
<template>
  <div class="response-screen">
    <div class="options">
      <button
        v-for="(image, index) in images"
        :key="index"
        class="image-option"
        :class="'option-' + index"
        @click="selectImage(image)"
      >
        <img :src="image.src" :alt="image.label" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ResponseScreen",

  props: {
    images: {
      type: Array,
      required: true
    }
  },

  methods: {
    selectImage(image) {
      this.$emit("answer", image.label);
    }
  }
};
</script>

<style scoped>
.response-screen {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  height: 100dvh;

  display: flex;
  justify-content: center;
  align-items: center;

  background: black;
  overflow: hidden;
}

/* Weißer Bereich im Seitenverhältnis 4:3 */
.options {
  position: relative;
  width: min(75vw, 133.333vh);
  aspect-ratio: 4 / 3;
  background: white;
}

/* Drei anklickbare Bilder */
.image-option {
  position: absolute;
  top: 3%;
  width: 27.3%;
  height: 84.5%;

  box-sizing: border-box;
  padding: 0;
  border: 2px solid #444;
  border-radius: 0;

  background: transparent;
  cursor: pointer;
  overflow: hidden;
  display: block;
}

.option-0 {
  left: 2.6%;
}

.option-1 {
  left: 36.4%;
}

.option-2 {
  left: 70.2%;
}

.image-option img {
  position: absolute;
  top: 0;
  left: 0;

  display: block;
  width: 100% !important;
  height: 100% !important;

  max-width: none;
  max-height: none;
  min-height: 100%;

  object-fit: fill;
}

.image-option:focus {
  outline: none;
}
</style>
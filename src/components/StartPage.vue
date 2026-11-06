
<template>
  <div class="start-page">
    <h1>ToM 2nd order</h1>

    <div class="form-group">
      <label for="participant-id">
        Versuchspersonen-ID:
      </label>
      <input
        id="participant-id"
        v-model="participantId"
        type="text"
        placeholder="ID des Kindes eingeben"
      />
    </div>

    <div class="form-group">
      <label for="list">
        Liste auswählen:
      </label>
      <select id="list" v-model="selectedList">
        <option disabled value="">
          Bitte auswählen
        </option>
        <option value="1">Liste 1</option>
        <option value="2">Liste 2</option>
      </select>
    </div>

    <button
      :disabled="!participantId.trim() || !selectedList"
      @click="startExperiment"
    >
      Experiment starten
    </button>
  </div>
</template>

<script>
export default {
  name: "StartPage",

  data() {
    return {
      participantId: "",
      selectedList: ""
    };
  },

  methods: {
    startExperiment() {
      this.$emit("start", {
        participantId: this.participantId.trim(),
        list: Number(this.selectedList)
      });
    }
  }
};
</script>

<style scoped>
.start-page {
  max-width: 500px;
  margin: 60px auto;
  padding: 30px;
  text-align: center;
  font-family: Arial, sans-serif;
}

.form-group {
  margin: 25px 0;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

input,
select {
  box-sizing: border-box;
  width: 100%;
  padding: 12px;
  font-size: 16px;
}

button {
  margin-top: 20px;
  padding: 12px 24px;
  font-size: 16px;
  cursor: pointer;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
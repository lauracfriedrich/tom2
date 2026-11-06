
<template>
  <div id="app">

    <!-- Startseite -->
    <StartPage
      v-if="phase === 'start'"
      @start="startExperiment"
    />

    <!-- Videos -->
    <VideoScreen
      v-else-if="phase === 'intro' || phase === 'trialVideo' || phase === 'end'"
      :key="phase + '-' + trialIndex"
      :video-src="currentVideo"
      @finished="onVideoFinished"
    />

    <!-- Antwortauswahl -->
    <ResponseScreen
      v-else-if="phase === 'response'"
      :images="currentImages"
      @answer="saveAnswer"
    />

<!-- Abschluss -->
<div v-else-if="phase === 'done'" class="finished">
  <h1>Vielen Dank!</h1>
  <p>Das Experiment ist beendet.</p>
  <p>Versuchsperson: {{ participantId }}</p>
  <p>
  Bisher auf diesem Gerät gespeichert:
  {{ savedParticipantCount }} Teilnehmende
</p>

  <button @click="exportData">
    Daten herunterladen (CSV)
  </button>
</div>

  </div>
</template>

<script>
import StartPage from "./components/StartPage.vue";
import VideoScreen from "./components/VideoScreen.vue";
import ResponseScreen from "./components/ResponseScreen.vue";

import experiment, { getTrialImages } from "./experiment.js";

export default {
  name: "App",

  components: {
    StartPage,
    VideoScreen,
    ResponseScreen
  },

  data() {
    return {
      phase: "start",

      participantId: "",
      selectedList: null,

      trialIndex: 0,
      participantTrials: [],

      answers: [],
      savedParticipantCount: 0
    };
  },

  created() {
  this.updateSavedParticipantCount();
  },

  computed: {
    currentVideo() {
      const list = experiment[this.selectedList];

      if (this.phase === "intro") {
        return `${process.env.BASE_URL}videos/${list.intro}`;
      }
      if (this.phase === "trialVideo") {
        return `${process.env.BASE_URL}videos/${list.trials[this.trialIndex]}`;
      }
      if (this.phase === "end") {
        return `${process.env.BASE_URL}videos/${list.end}`;
      }

      return "";
    },

    currentImages() {
      const videoName =
        this.participantTrials[this.trialIndex];

      return getTrialImages(videoName);
    }
  },

  methods: {
    startExperiment(data) {
      this.participantId = data.participantId;
      this.selectedList = data.list;

      this.participantTrials =
        experiment[this.selectedList].trials;

      this.trialIndex = 0;
      this.answers = [];

      // Startdaten sofort lokal speichern
      this.saveLocally();

      this.phase = "intro";
    },

    onVideoFinished() {
      if (this.phase === "intro") {
        this.phase = "trialVideo";
      } else if (this.phase === "trialVideo") {
        this.phase = "response";
      } else if (this.phase === "end") {
        this.phase = "done";
      }
    },

    saveAnswer(answer) {
      const videoName =
        this.participantTrials[this.trialIndex];

      const category = experiment[this.selectedList].answers[videoName][answer];

      this.answers.push({
        participantId: this.participantId,
        list: this.selectedList,
        trial: this.trialIndex + 1,
        video: videoName,
        answer: answer,
        category: category,
        timestamp: new Date().toISOString()
      });

      // Antwort sofort lokal speichern
      this.saveLocally();

      // Direkt zum nächsten Durchgang
      if (this.trialIndex < this.participantTrials.length - 1) {
        this.trialIndex++;
        this.phase = "trialVideo";
      } else {
        this.phase = "end";
      }
    },

    saveLocally() {
      const storageKey = "tom2_experiment_data";

      const existingData = JSON.parse(
        localStorage.getItem(storageKey) || "[]"
      );

      const participantData = {
        participantId: this.participantId,
        list: this.selectedList,
        answers: this.answers
      };

      const otherParticipants = existingData.filter(
        item => item.participantId !== this.participantId
      );

      otherParticipants.push(participantData);

      localStorage.setItem(
        storageKey,
        JSON.stringify(otherParticipants)
      );
      this.updateSavedParticipantCount();
    },

    exportData() {
      const storageKey = "tom2_experiment_data";

      const allData = JSON.parse(
        localStorage.getItem(storageKey) || "[]"
     );

      // Eine Zeile pro beantwortetem Trial
      const rows = [];

      allData.forEach(participant => {
        participant.answers.forEach(answer => {
          rows.push({
            participantId: `="${answer.participantId}"`,            
            list: answer.list,
            trial: answer.trial,
            video: answer.video,
            answer: answer.answer,
            category: answer.category,
            timestamp: answer.timestamp
          });
        });
      });

      // CSV-Kopfzeile
      const headers = [
        "participantId",
        "list",
        "trial",
        "video",
        "answer",
        "category",
        "timestamp"
      ];

      const csvContent = [
        headers.join(";"),
        ...rows.map(row =>
          headers.map(header =>
            `"${String(row[header] ?? "").replace(/"/g, '""')}"`
          ).join(";")
        )
      ].join("\n");

      // CSV-Datei erstellen und herunterladen
      const blob = new Blob(
        ["\uFEFF" + csvContent],
        { type: "text/csv;charset=utf-8;" }
      );

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = "tom2_experiment_data.csv";
      link.click();

      URL.revokeObjectURL(url);
    },
    updateSavedParticipantCount() {
      const storageKey = "tom2_experiment_data";

      const existingData = JSON.parse(
        localStorage.getItem(storageKey) || "[]"
      );

      this.savedParticipantCount = existingData.length;
    }
  }
};
</script>

<style>
html,
body,
#app {
  margin: 0;
  width: 100%;
  height: 100%;
  min-height: 100%;
  font-family: Arial, sans-serif;
  color: #222;
}

body {
  overflow: hidden;
}

.finished {
  margin: 80px auto;
  text-align: center;
}
</style>
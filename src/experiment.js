
const experiment = {
  1: {
    intro: "FB2_Introduction.mp4",

    trials: [
      "FB2_Practice1_Hats.mp4",
      "FB2_Test2_Trampoline.mp4",
      "FB2_Practice2_Popcorn.mp4",
      "FB2_Test3_Pizzabox.mp4"
    ],

    answers: {
      "FB2_Practice1_Hats.mp4": {
        1: "incorrect",
        2: "oddball",
        3: "correct"
      },
      "FB2_Test2_Trampoline.mp4": {
        1: "oddball",
        2: "correct",
        3: "incorrect"
      },
      "FB2_Practice2_Popcorn.mp4": {
        1: "correct",
        2: "incorrect",
        3: "oddball"
      },
      "FB2_Test3_Pizzabox.mp4": {
        1: "correct",
        2: "incorrect",
        3: "oddball"
      }
    },

    end: "FB2_End.mp4"
  },

  2: {
    intro: "FB2_Introduction.mp4",

    trials: [
      "FB2_Control1_Rope.mp4",
      "FB2_Test1_Hulahoop.mp4",
      "FB2_Control2_Pencils.mp4",
      "FB2_Test4_Soapbubble.mp4"
    ],

    answers: {
      "FB2_Control1_Rope.mp4": {
        1: "oddball",
        2: "incorrect",
        3: "correct"
      },
      "FB2_Test1_Hulahoop.mp4": {
        1: "incorrect",
        2: "oddball",
        3: "correct"
      },
      "FB2_Control2_Pencils.mp4": {
        1: "oddball",
        2: "correct",
        3: "incorrect"
      },
      "FB2_Test4_Soapbubble.mp4": {
        1: "correct",
        2: "oddball",
        3: "incorrect"
      }
    },

    end: "FB2_End.mp4"
  }
};

export function getTrialImages(videoName) {
  const baseName = videoName.replace(".mp4", "");

  return {
    src: `${process.env.BASE_URL}images/${baseName}.png`
  };
}


export default experiment;
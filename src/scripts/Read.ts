export const readAloud = (someText = "", voiceIndex = 0) => {
  const synth = window.speechSynthesis;

  // Function to initiate speaking
  const speak = () => {
    const voices = synth.getVoices();

    // Ensure the voiceIndex is within range
    if (voiceIndex < 0 || voiceIndex >= voices.length) {
      console.error("Invalid voice index");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(someText);
    utterance.voice = voices[voiceIndex];

    utterance.onstart = () => {
      console.log("Speech started");
    };

    utterance.onend = () => {
      console.log("Speech ended");
    };

    utterance.onerror = (event) => {
      console.error("Speech synthesis error:", event.error);
    };

    synth.speak(utterance);
  };

  // Ensure voices are loaded before proceeding
  if (synth.getVoices().length === 0) {
    synth.onvoiceschanged = () => {
      const voices = synth.getVoices();
      if (voices.length > 0) {
        speak();
      } else {
        console.error("No voices available");
      }
    };
  } else {
    speak();
  }
};

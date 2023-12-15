import { useEffect } from "react";
import { useState } from "react";

let recognition = null; // Corrected typo in the variable name
if ("webkitSpeechRecognition" in window) { // Corrected typo in "window"
    recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-us";
}

const useSpeechRecognition = () => { // Corrected typo in the function name
    const [text, setText] = useState("");
    const [isListening, setIsListening] = useState(false);

    useEffect(() => {
        if (!recognition) return;
        recognition.onresult = (event) => {
            console.log('onresult event:', event);
            setText(event.results[0][0].transcript);
            recognition.stop();
            setIsListening(false);
        }
    }, []);

    const startListening = () => {
        setText('');
        setIsListening(true);
        recognition.start();
    };

    const stopListening = () => {
        setIsListening(false);
        recognition.stop();
    }

    return {
        text,
        isListening,
        startListening,
        stopListening,
        hasRecognitionSupport: !!recognition,
    };
}

export default useSpeechRecognition;

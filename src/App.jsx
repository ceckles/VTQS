import React, { useState, useEffect } from 'react';
import './App.css';
import useSpeechRecognition from './hooks/useSpeechRecognition';

// Assuming you have the JSON data in a variable named `jsonData`
import jsonData from './util/data.json';

function App() {
  const { text, startListening, stopListening, isListening, hasRecognitionSupport } = useSpeechRecognition();
  const [matchingQuestions, setMatchingQuestions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Amature_Extra'); // Default category

  useEffect(() => {
    if (text.trim() === '') {
      setMatchingQuestions([]);
      return;
    }

    const matchingResults = jsonData[selectedCategory].filter((item) =>
      item.question.toLowerCase().includes(text.toLowerCase())
    );

    setMatchingQuestions(matchingResults);
  }, [text, selectedCategory]);

  const handleKeyDown = (event) => {
    if (event.keyCode === 32) {
      startListening();
    }
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div>
      {hasRecognitionSupport ? (
        <>
          <div>
            <button onKeyDown={handleKeyDown}>Start Search</button>
            <h3>press spacebar to search</h3>
            <label>
              Select Category:
              <select value={selectedCategory} onChange={handleCategoryChange}>
                <option value="Technician">Technician</option>
                <option value="General">General</option>
                <option value="Amature_Extra">Amature Extra</option>
              </select>
            </label>
          </div>
          {isListening ? <div>Browser is Listening</div> : null}
          <div>Voice Text: {text}</div>
          {matchingQuestions.length > 0 ? (
            <ul>
              {matchingQuestions.map((item, index) => (
                <li key={index}>
                  <strong>Q:</strong> {item.question}
                  <br />
                  <strong>A:</strong> {item.answer}
                </li>
              ))}
            </ul>
          ) : null}
        </>
      ) : (
        <h1>Browser has no speech recognition support!</h1>
      )}
    </div>
  );
}

export default App;

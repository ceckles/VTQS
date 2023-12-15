import React, { useState, useEffect } from 'react';
import './App.css';
import useSpeechRecognition from './hooks/useSpeechRecognition';
import jsonData from './util/data.json';

function App() {
  const { text, startListening, stopListening, isListening, hasRecognitionSupport } = useSpeechRecognition();
  const [matchingQuestions, setMatchingQuestions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(''); // Default: All categories

  useEffect(() => {
    if (text.trim() === '') {
      setMatchingQuestions([]);
      return;
    }

    let matchingResults = [];

    // If a category is selected, filter questions based on the category
    if (selectedCategory) {
      matchingResults = jsonData[selectedCategory].filter((item) =>
        item.question.toLowerCase().includes(text.toLowerCase())
      );
    } else {
      // If no category is selected, search all categories
      for (const category in jsonData) {
        matchingResults = matchingResults.concat(
          jsonData[category].filter((item) => item.question.toLowerCase().includes(text.toLowerCase()))
        );
      }
    }

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

  // Extract unique category names from JSON data
  const categories = Object.keys(jsonData);

  return (
    <div>
      {hasRecognitionSupport ? (
        <>
          <div>
            <button onKeyDown={handleKeyDown}>Start Listening</button>
          </div>
          {isListening ? <div>Browser is Listening</div> : null}
          <div>Voice Text: {text}</div>
          <div>
            <label>Select Category:</label>
            <select value={selectedCategory} onChange={handleCategoryChange}>
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
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

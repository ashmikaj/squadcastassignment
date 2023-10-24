import "./App.css";
import { useState } from "react";
import data from "../data.json";
import style from './App.css'

const getFilteredUserName = (mentionedTexts) =>
  data.filter((user) =>
    mentionedTexts.some(
      (mentionedText) =>
        user.first_name.toLowerCase().includes(mentionedText.toLowerCase()) ||
        user.last_name.toLowerCase().includes(mentionedText.toLowerCase())
    )
  );

function App() {
  const [inputText, setInputText] = useState("");
  const [mentionOptions, setMentionOptions] = useState([]);

  const handleInputChange = (e) => {
    const text = e.target.value;
    setInputText(text);

    const mentions = text.match(/@(\w+)/g);

    if (mentions) {
      const mentionedTexts = mentions.map((mention) => mention.slice(1));
      const options = getFilteredUserName(mentionedTexts);
      setMentionOptions(options);
    } else {
      setMentionOptions([]);
    }
  };

  const handleMentionSelect = (mention) => {
    // Insert the selected mention into the input text
    const newText = inputText.replace(
      /@\w+/g,
    `@ ${mention.first_name} ${mention.last_name}`
    );
    setInputText(newText);
    setMentionOptions([]);
  };

  return (
    <div>
      <input
        value={inputText}
        onChange={handleInputChange}
        placeholder="use @ to mention someone"
        className="inputBox"
      />
      <div>
        {mentionOptions.length > 0 && (
          <div className = 'dropdown'>
            {mentionOptions.map((mention) => (
              <div className="listItem" key={mention.id} onClick={() => handleMentionSelect(mention)}>
                {mention.first_name} {mention.last_name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
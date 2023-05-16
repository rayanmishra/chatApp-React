import { useState } from 'react';

const MessageEdit = ({ msg, onSubmit }) => {
  // State variable to store the text input value
  const [textInput, setTextInput] = useState(msg.text);

  // Function to handle changes in the input field
  const handleChange = (e) => {
    setTextInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the onSubmit function passed as a prop
    // with the message ID and the updated text input value
    onSubmit(msg.id, textInput);
  };

  return (
    <form onSubmit={handleSubmit} className="msg__form__edit">
      <input
        className="msg__form__input"
        onChange={handleChange}
        value={textInput}
      />
      <button className="btn__edit">Save</button>
    </form>
  );
};

export default MessageEdit;

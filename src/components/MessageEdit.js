import { useState } from 'react';

const MessageEdit = ({ msg, onSubmit }) => {
  const [title, setTitle] = useState(msg.text);

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(msg.id, title);
  };

  return (
    <form onSubmit={handleSubmit} className="book-edit">
      <input className="input" onChange={handleChange} value={title} />
      <button className="button is-primary">Save</button>
    </form>
  );
};

export default MessageEdit;

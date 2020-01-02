import React, { useState } from 'react';

const SetBirthYear = (props) => {
  const [name, setName] = useState('');
  const [born, setBorn] = useState('');

  const options = props.authors.map(author => <option key={author.id} value={author.name}>{author.name}</option>);

  const submit = async (e) => {
    e.preventDefault()
    await props.setBornYear({
      variables: {
        name: name,
        setBornTo: parseInt(born)
      }
    });
    setName('');
    setBorn('');
  };

  const handleOptionChange = (event) => {
    setName(event.target.value);
  };

  return (
    <div>
      <h2>Set Birth Year</h2>
      <form onSubmit={submit}>
        <div>
          select author:
          <select value={name} onChange={handleOptionChange}>
            <option value=''>Select author to update</option>
            {options}
          </select>
        </div>
        <div>
          born
          <input value={born} onChange={({ target }) => setBorn(target.value)} />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default SetBirthYear
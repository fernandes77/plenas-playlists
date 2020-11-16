import React, { useState } from 'react';

const AddTracks = () => {
  return (
    <>
      <div>
        <label htmlFor="songs">Procurar músicas</label>
        <input
          type="text"
          name="songs"
          onChange={(e) => handleSearchChange(e)}
        />
        <input type="submit" onClick={() => handleSearchSubmit()} />
      </div>
      <ul>
        {searchResults.map((result) => (
          <>
            <li key={result.id}>{result.name}</li>
            <button key={result.id} onClick={(e) => handleTrackSubmit(e)}>
              Adicionar
            </button>
          </>
        ))}
      </ul>
    </>
  );
};

export default AddTracks;

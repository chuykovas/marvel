import React, { useState, useEffect, useRef } from "react";

import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./charList.scss";

const CharList = (props) => {
  const [charList, setCharList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(210);
  const [charEnded, setCharEnded] = useState(210);

  const marvelService = new MarvelService();

  useEffect(() => {
    onRequest();
  }, []);

  const onRequest = (offset) => {
    onCharListLoading();
    marvelService
      .getAllCharacters(offset)
      .then(onAllCharsLoaded)
      .catch(onError);
  };

  const onCharListLoading = () => {
    setNewItemLoading(true);
  };

  const onAllCharsLoaded = (newCharList) => {
    setCharList((charList) => [...charList, ...newCharList]);
    setLoading(false);
    setNewItemLoading(false);
    setOffset((offset) => offset + 9);
    setCharEnded((charEnded) => newCharList.length < 9);
  };

  const onError = () => {
    setError(true);
    setLoading(false);
  };

  return (
    <div className="char__list">
      {loading && <Spinner />}
      {error && <ErrorMessage />}
      <ul className="char__grid">
        {!loading &&
          !error &&
          charList.map((char, index) => (
            <Char
              name={char.name}
              image={char.thumbnail}
              key={index}
              id={char.id}
              onCharSelected={props.onCharSelected}
            />
          ))}
      </ul>
      <button
        className="button button__main button__long"
        disabled={newItemLoading}
        style={{ display: charEnded ? "none" : "block" }}
        onClick={() => onRequest(offset)}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

const Char = (props) => {
  return (
    <li
      className="char__item"
      onClick={() => props.onCharSelected(props.id)}
      tabIndex={1}
    >
      <img
        src={props.image}
        alt={props.name}
        style={{
          objectFit: props.image.includes("not_available")
            ? "contain"
            : "cover",
        }}
      />
      <div className="char__name">{props.name}</div>
    </li>
  );
};

export default CharList;

import { Fragment, useEffect } from "react";
import { useState } from "react";

import MarvelService from "../../services/MarvelService";

import Spinner from "../spinner/Spinner";
import Skeleton from "../skeleton/Skeleton.js";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./charInfo.scss";

const CharInfo = ({ charId }) => {
  const [char, setChar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const marvelService = new MarvelService();

  useEffect(() => {
    updateChar();
  }, [charId]);

  const updateChar = () => {
    if (!charId) {
      return;
    }

    onCharLoading();

    marvelService.getOneCharacter(charId).then(onCharLoaded).catch(onError);
  };

  const onCharLoaded = (char) => {
    setChar(char);
    setLoading(false);
  };

  const onCharLoading = () => {
    setLoading(true);
  };

  const onError = () => {
    setError(true);
    setLoading(false);
  };

  const isCharLoad = char && !loading && !error;

  return (
    <div className="char__info">
      {loading && <Spinner />}
      {!char && !loading && !error && <Skeleton />}
      {error && <ErrorMessage />}
      {isCharLoad && <View char={char} />}
    </div>
  );
};

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = char;

  return (
    <Fragment>
      <div className="char__basics">
        <img
          src={thumbnail}
          alt={name}
          style={{
            objectFit: thumbnail.includes("not_available")
              ? "contain"
              : "cover",
          }}
        />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      {comics.length ? <Comics comics={comics} /> : null}
    </Fragment>
  );
};

const Comics = ({ comics }) => {
  return (
    <Fragment>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.map((item, index) => {
          return (
            <li key={index} className="char__comics-item">
              {item.name}
            </li>
          );
        })}
      </ul>
    </Fragment>
  );
};

export default CharInfo;

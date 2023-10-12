import { Component, Fragment } from "react";

import MarvelService from "../../services/MarvelService";

import Spinner from "../spinner/Spinner";
import Skeleton from "../skeleton/Skeleton.js";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./charInfo.scss";

class CharInfo extends Component {
  state = {
    char: null,
    loading: false,
    error: false,
  };

  marvelService = new MarvelService();

  componentDidMount() {
    this.updateChar();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.charId !== this.props.charId) {
      this.updateChar();
    }
  }

  updateChar = () => {
    const { charId } = this.props;

    if (!charId) {
      return;
    }

    this.onCharLoading();

    this.marvelService
      .getOneCharacter(charId)
      .then(this.onCharLoaded)
      .catch(this.onError);
  };

  onCharLoaded = (char) => {
    this.setState({ char, loading: false });
  };

  onCharLoading = () => {
    this.setState({ loading: true });
  };

  onError = () => {
    this.setState({ error: true, loading: false });
  };

  render() {
    const { char, loading, error } = this.state;
    const isCharLoad = char && !loading && !error;

    return (
      <div className="char__info">
        {loading && <Spinner />}
        {!char && !loading && !error && <Skeleton />}
        {error && <ErrorMessage />}
        {isCharLoad && <View char={char} />}
      </div>
    );
  }
}

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

import React, { Component } from "react";

import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./charList.scss";

class CharList extends Component {
  state = {
    charList: [],
    loading: true,
    error: false,
    newItemLoading: false,
    offset: 210,
    charEnded: false,
  };

  marvelService = new MarvelService();

  componentDidMount() {
    this.onRequest();
  }

  onRequest = (offset) => {
    this.onCharListLoading();
    this.marvelService
      .getAllCharacters(offset)
      .then(this.onAllCharsLoaded)
      .catch(this.onError);
  };

  onCharListLoading = () => {
    this.setState({ newItemLoading: true });
  };

  onAllCharsLoaded = (newCharList) => {
    this.setState(({ charList, offset }) => ({
      charList: [...charList, ...newCharList],
      loading: false,
      newItemLoading: false,
      offset: offset + 9,
      charEnded: newCharList.length < 9,
    }));
  };

  onError = () => {
    this.setState({ error: true, loading: false });
  };

  render() {
    const { charList, loading, error, newItemLoading, offset, charEnded } =
      this.state;

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
                onCharSelected={this.props.onCharSelected}
              />
            ))}
        </ul>
        <button
          className="button button__main button__long"
          disabled={newItemLoading}
          style={{ display: charEnded ? "none" : "block" }}
          onClick={() => this.onRequest(offset)}
        >
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

class Char extends Component {
  render() {
    return (
      <li
        className="char__item"
        onClick={() => this.props.onCharSelected(this.props.id)}
        tabIndex={1}
      >
        <img
          src={this.props.image}
          alt={this.props.name}
          style={{
            objectFit: this.props.image.includes("not_available")
              ? "contain"
              : "cover",
          }}
        />
        <div className="char__name">{this.props.name}</div>
      </li>
    );
  }
}

export default CharList;

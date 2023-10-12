class MarvelService {
  _apiBase = "https://gateway.marvel.com:443/v1/public/";
  _apiKey = "11cd4b05dd32cae2950cc7eb79bac5d7";
  _baseOffset = 210;

  getResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  };

  getAllCharacters = async (offset = this._baseOffset) => {
    const res = await this.getResource(
      `${this._apiBase}characters?limit=9&offset=${offset}&apikey=${this._apiKey}`
    );

    return res.data.results.map(this._transformCharacter);
  };

  getOneCharacter = async (id) => {
    const res = await this.getResource(
      `${this._apiBase}characters/${id}?apikey=${this._apiKey}`
    );

    return this._transformCharacter(res.data.results[0]);
  };

  _transformCharacter = (char) => {
    const { id, name, description, thumbnail, urls, comics } = char;

    return {
      id,
      name,
      description: description
        ? description
        : "There is no information about this character",
      thumbnail: `${thumbnail.path}.${thumbnail.extension}`,
      homepage: urls[0].url,
      wiki: urls[1].url,
      comics: comics.items.slice(0, 10),
    };
  };
}

export default MarvelService;

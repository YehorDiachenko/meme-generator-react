import React, { Component } from 'react';

class MemeGenerator extends Component {
  constructor() {
    super();
    this.state = {
      topText: "",
      bottomText: "",
      randomImage: "http://i.imgflip.com/1bij.jpg",
      allMemeImgs: [],
      isLoaded: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then(res => res.json())
      .then(res => {
        const {memes} = res.data;
        this.setState({
          allMemeImgs: memes,
          isLoaded: true
        });
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    let randomInt = Math.floor(Math.random() * this.state.allMemeImgs.length);
    let randomImgUrl = this.state.allMemeImgs[randomInt].url;
    this.setState({ randomImage: randomImgUrl });
  }

  handleChange(event) {
    const {name, value} = event.target;
    this.setState({ [name]: value });
  }

  render() {
    if (!this.state.isLoaded) {
      return <h1>Loading...</h1>
    }
    return (
      <div>
      <form onSubmit={this.handleSubmit} className="meme-form">
        <input type="text"
          name="topText"
          value={this.state.topText}
          onChange={this.handleChange}
          placeholder="Top Text" />

        <input type="text"
          name="bottomText"
          value={this.state.bottomText}
          onChange={this.handleChange}
          placeholder="Bottom Text" />

          <button>Gen</button>
      </form>

      <div className="meme">
        <img aling="center" src={this.state.randomImage} alt="" />
        <h2 className="top">{this.state.topText}</h2>
        <h2 className="bottom">{this.state.bottomText}</h2>
      </div>
      </div>
    );
  }
}

export default MemeGenerator;

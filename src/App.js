import { useState } from 'react';
import './App.css';
import Status from './components/Status'
import Card from './components/Card'

const imagePath = 'Cards/';

const fillImages = () =>
{
  let images = Array(20).fill(null);
      let values = ['a', 'k', 'q', 'j', 't', '9', '8', '7', '6', '5'];
      let suits = ['h', 's'];
      let index = 0;
      for (let value = 0; value < values.length; value++){
          for (let suit = 0; suit < suits.length; suit ++) {
              images[index] = "card" + values[value] + suits[suit] + ".jpg";
              index++;
          }
      }
      return images;
};

const shuffleImages = (images) =>
{
  for (let i = 0; i < images.length; i++) {
    let rnd = Math.floor(Math.random() * images.length);
    [images[i], images[rnd]] = [images[rnd], images[i]];
  }
};

const fillAndShuffle = () =>
{
  let localImages = fillImages();
  shuffleImages(localImages);
  return localImages;
}

const isMatch = (images, picks) =>
{
  if (images[picks.first].substr(4, 1) == 
      images[picks.second].substr(4, 1))
      return true;
  else
      return false;
};


function App() {
  const [matches, setMatches] = useState(0);
  const [tries, setTries] = useState(0);
  const [images, setImages] = useState(fillAndShuffle);
  const [picks, setPicks] = useState({first: -1, second: -1});

  const handleClick = (event) => {
    console.log("click");
    const index = parseInt(event.target.id);

    let localPicks = {...picks};
    if (localPicks.first == -1)
        localPicks.first = index;
    else {
      localPicks.second = index
      let localImages = {...images};
      setTimeout(checkCards(localPicks.first, localPicks.second, localImages, tries, matches), 2000);
    setPicks(localPicks);
    };
  };

  const checkCards = (firstPick, secondPick, images, tries, matches) => {
    setTries(tries + 1);
    if (isMatch(images, firstPick, secondPick)) {
        setMatches(matches + 1);
        // setImages(images[picks.first] = null);
        // setImages(images[picks.second] = null);
        images[firstPick] = null;
        images[secondPick] = null;
        setImages(images);
    };
    setPicks({first: -1});
    setPicks({second: -1});
  };

  const renderCard = (i) => {   
    const image = (images[i] == null) ? 'none' : 
        (picks.first == i || picks.second == i) ? 
        'url(' + imagePath + images[i] + ')' : 
        'url(' + imagePath + 'black_back.jpg)';
    const enabled = (images[i] != null && 
        (i != picks.first && i != picks.second) &&
        (picks.first == -1 || picks.second == -1) &&
        (matches < 10)) ? true : false;
    const eventHandler = (enabled)? handleClick : () => {};
    const cursor = (enabled) ? "pointer" : "none";
    const style = {
      backgroundImage: image,
      cursor: cursor
      }   
    return (
      <Card 
        id={i} key={i}
        name="card"
        className="col-sm-2 card"
        style={style}
        onClick={eventHandler}
      />
    )
  }

  let status = (matches < 10) ?
          'Matches: ' + matches + " Tries: " + tries :
          "Congratulations!  You found all 10 matches in " + tries + " tries!";

  return (
      <div className="container" id="board">
        <Status status={status} />
        <div className="row">
            <div className="col-sm-1"></div>
            {renderCard(0)}
            {renderCard(1)}
            {renderCard(2)}
            {renderCard(3)}
            {renderCard(4)}
            <div className="col-1"></div>
        </div>
        <div className="row">
            <div className="col-sm-1"></div>
            {renderCard(5)}
            {renderCard(6)}
            {renderCard(7)}
            {renderCard(8)}
            {renderCard(9)}
            <div className="col-1"></div>
        </div>
        <div className="row">
            <div className="col-sm-1"></div>
            {renderCard(10)}
            {renderCard(11)}
            {renderCard(12)}
            {renderCard(13)}
            {renderCard(14)}
            <div className="col-1"></div>
        </div>
        <div className="row">
            <div className="col-sm-1"></div>
            {renderCard(15)}
            {renderCard(16)}
            {renderCard(17)}
            {renderCard(18)}
            {renderCard(19)}
            <div className="col-1"></div>
        </div>
      </div>);
};

export default App;

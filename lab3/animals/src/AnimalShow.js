import './AnimalShow.css';
import { useState} from 'react';
import bird from './svg/bird.svg';
import cat from './svg/cat.svg';
import cow from './svg/cow.svg';
import dog from './svg/dog.svg';
import gator from './svg/gator.svg';
import heart from './svg/heart.svg';
import horse from './svg/horse.svg';

const svgMap = {
    bird,
    cat, 
    cow,
    dog,
    gator,
    horse
}

const ONCLICK_ADJUST = 20;

function AnimalShow({ type }) {
    const [clicks, setClicks] = useState(0);
    const [animalStyle, setAnimalStyle] = useState({});

    const handleClick = () => {
        setClicks(clicks + 1);
    }

    const handleMouseDown = () => {
        setAnimalStyle({...animalStyle, height: 200 - ONCLICK_ADJUST + 'px', width: 200 - ONCLICK_ADJUST + 'px'});
    }

    const handleMouseUp = () => {
        setAnimalStyle({...animalStyle, height: 200 + ONCLICK_ADJUST + 'px', width: 200 + ONCLICK_ADJUST + 'px'});
    }

    return(
    <div className="animal-show" onClick={handleClick} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} style={animalStyle}>
        <img className="animal" alt="animal" src={svgMap[type]} style={animalStyle}/>
        <img 
        className="heart"
        alt="heart" 
        src={heart} 
        style={{ 
            width: 10 + 10 * clicks + 'px',
            height: 10 + 10 * clicks + 'px',
         }}/>
    </div>
    )
}

export default AnimalShow;
import { useState, useEffect } from 'react';

import Input from '../../components/Input';
import Button from '../../components/Button';

import './index.css';

const RandomPositioningGame = () => {
  const [itemCount, setItemCount] = useState('');
  const [isStarted, setIsStarted] = useState(false);
  const [positions, setPositions] = useState([]);
  const [time, setTime] = useState(0);
  const [message, setMessage] = useState('');
  const [expectedNumber, setExpectedNumber] = useState(1);
  const frameHeight = 400;

  useEffect(() => {
    if (!isStarted) return;

    const timer = setInterval(() => {
      setTime(prev => prev + 0.1);
    }, 500);

    return () => clearInterval(timer);
  }, [isStarted]);

  const generateRandomPositions = count => {
    const newPositions = [];
    const usedPositions = new Set();
    const elementSize = 50;

    while (newPositions.length < count) {
      // Generate random positions considering the element size
      const left = Math.floor(
        Math.random() * (window.innerWidth - elementSize)
      );
      const top = Math.floor(Math.random() * (frameHeight - elementSize));
      const positionKey = `${left},${top}`;

      if (!usedPositions.has(positionKey)) {
        usedPositions.add(positionKey);
        newPositions.push({ left, top, number: newPositions.length + 1 });
      }
    }
    return newPositions;
  };

  const startGame = () => {
    setPositions(generateRandomPositions(itemCount));
    setTime(0);
    setIsStarted(true);
    setMessage('');
    setExpectedNumber(1);
  };

  const handleItemClick = number => {
    if (number !== expectedNumber) {
      setMessage('Game Over');
      setIsStarted(false);
      return;
    }

    const updatedPositions = positions.filter(pos => pos.number !== number);
    setPositions(updatedPositions);

    if (number === itemCount) {
      setMessage('ALL CLEARED');
      setIsStarted(false);
    } else {
      setExpectedNumber(prev => prev + 1);
    }
  };

  return (
    <div className="wrapper">
      <h2
        className={`message ${
          message === 'ALL CLEARED'
            ? 'text-success'
            : message === 'Game Over'
            ? 'text-error'
            : ''
        }`}
      >
        {message || "Let's Start"}
      </h2>
      <div className="d-flex flex-column box-space">
        <div className="d-flex">
          <label htmlFor="itemCount">Points:</label>
          <Input
            type="text"
            value={itemCount}
            onChange={e => setItemCount(Number(e.target.value))}
          />
        </div>

        <p>Timer: {time.toFixed(1)}s</p>
      </div>
      <Button
        className="btn-primary"
        onClick={startGame}
      >
        {isStarted === true ? 'Restart' : 'Play'}
      </Button>
      <div
        className="frame"
        style={{ height: `${frameHeight}px` }}
      >
        {positions.map(pos => (
          <Button
            key={pos.number}
            className="btn-secondary"
            style={{
              position: `absolute`,
              left: `${pos.left}px`,
              top: `${pos.top}px`
            }}
            onClick={() => handleItemClick(pos.number)}
          >
            {pos.number}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default RandomPositioningGame;

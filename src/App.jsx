/* 
Plan:

Må holde styr på states;

Deck: (Array med objects) - id (index), Emoji/Tegning, isFlipped (bool), isMatched (bool)
Flipped: (Array) Kort som er snudd om - id/index. maks 2.
matched: (Array) Holde styr på hvilke kort som er matcha, selv om vi har en isMatched variable i Deck.
Moves: (Int) Hvor mange trekk man har gjort - For bonus Localstorage.
gameWon - (bool) en Boolean for å trigge win.

Flow:
Start
  Stokke om korta - Reset alle states - Spillet kan spilles
Trykke på et kort
  Legg til i flipped
Etter at kort er snudd
  useEffect på flipped for å sjekke om 2 kort er snudd
  Sjekk om begge korta har samme emoji/tegning. 
  Om de er like - Legg til i matched, hvis ikke clear flipped og snu om kort igjen etter en delay.
Oppdater Moves etter hver gang ett par har blitt prøvd ut.
Når alle kort er matcha, sett gameWon til true.
  Trenger en restart knapp i midten av skjermen når det skjer.

Layout:
Header - Tittel, Timer og Moves.
GameBoard (Main) Komponent - Muligens noe unødvendig. Får noe logikk og annet fra App. (Deck state, )
  Card Komponent - Får informasjon fra GameBoard komponent (Emoji, isFlipped, isMatched, onClick.)
WinModal Komponent - Når gameWon er True, vis denne med antall moves gjort i spillet, hvor lang tid man brukte, beste score (moves & tid), og en restart knapp.
*/

import { useEffect, useRef, useState } from "react";
import GameBoard from "./components/GameBoard";
import OrientationWarning from "./components/OrientationWarning";
import Header from "./components/Header";
import { generateDeck } from "./utils/deck";
import GameDoneOverlay from "./components/GameDoneOverlay";
import GamePopup from "./components/GamePopup";

function App() {
  // State to check if the device is in landscape or not - Display a warning if not.
  const [isLandscape, setIsLandscape] = useState(
    window.innerWidth > window.innerHeight
  );
  const [cards, setCards] = useState(generateDeck(getPairCount()));
  const [isFlipped, setIsFlipped] = useState([]);
  const [isMatched, setIsMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [seconds, setSeconds] = useState(0); // Timer
  const [gameStarted, setGameStarted] = useState(false);
  const [bestMoves, setBestMoves] = useState(
    localStorage.getItem("bestMoves") || 999999999
  );
  const [bestTime, setBestTime] = useState(
    localStorage.getItem("bestTime") || 999999999
  );

  const timerRef = useRef(null);

  // useEffect to check at every render if the device is (still) in landscape mode
  useEffect(() => {
    const handleResize = () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
    };
    window.addEventListener("resize", handleResize); // Rotating the screen will trigger a resize event.
    return () => window.removeEventListener("resize", handleResize); // cleanup of eventListeners.
  }, []);

  // useEffect to check for matches when 2 cards are flipped
  useEffect(() => {
    if (isFlipped.length < 2) return;

    const [firstID, secondID] = isFlipped;
    const firstCard = cards.find((card) => card.id === firstID);
    const secondCard = cards.find((card) => card.id === secondID);

    // a check just in case
    if (!firstCard || !secondCard) return;

    if (firstCard.symbol === secondCard.symbol) {
      setTimeout(() => {
        setIsMatched((prev) => [...prev, firstID, secondID]);
        setIsFlipped([]);
        setCards(
          cards.map((card) =>
            card.id === firstID || card.id === secondID
              ? { ...card, isMatched: true }
              : card
          )
        );
      }, 650);
    } else {
      // small timeout
      setTimeout(() => {
        setCards((prev) =>
          prev.map((card) =>
            card.id === firstID || card.id === secondID
              ? { ...card, isFlipped: false }
              : card
          )
        );
        setIsFlipped([]);
      }, 650);
    }
    setMoves((moves) => moves + 1);
  }, [isFlipped, cards]);

  // useEffect to check if the game is won using isMatched
  useEffect(() => {
    if (isMatched.length === cards.length) {
      setGameWon(true);
      clearInterval(timerRef.current);
      if (moves < bestMoves) setBestMoves(moves);
      if (seconds < bestTime) setBestTime(seconds);
    }
  }, [isMatched]);

  useEffect(() => {
    localStorage.setItem("bestMoves", bestMoves);
  }, [bestMoves]);

  useEffect(() => {
    localStorage.setItem("bestTime", bestTime);
  }, [bestTime]);

  function getPairCount() {
    // Set the amount of pairs needed depending on the screen size.
    const width = window.innerWidth;
    if (width < 640) return 8; //mobile
    if (width < 1024) return 12; //tablet
    return 18; // desktop
  }

  const handleCardClick = (id) => {
    // Check for invalid clicks first
    if (isFlipped.length === 2) return;
    if (isFlipped.includes(id)) return;
    if (isMatched.includes(id)) return;

    setCards((prev) =>
      prev.map((card) => (card.id === id ? { ...card, isFlipped: true } : card))
    );
    setIsFlipped((prev) => [...prev, id]);
  };

  const handleRestart = () => {
    setMoves(0);
    setIsFlipped([]);
    setIsMatched([]);
    setSeconds(0);
    setCards(generateDeck(getPairCount()));
    timerRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    setGameWon(false);
  };

  const handleGameStart = () => {
    setGameStarted(true);
    timerRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  };

  return (
    <>
      <Header
        title={"Match 2"}
        timer={seconds}
        moves={moves}
        restart={handleRestart}
      />
      {isLandscape ? (
        <GameBoard cards={cards} handleClick={handleCardClick} />
      ) : (
        <OrientationWarning />
      )}
      {gameWon && (
        <GameDoneOverlay
          moves={moves}
          time={seconds}
          restart={handleRestart}
          highScore={{ moves: bestMoves, time: bestTime }}
        />
      )}
      {!gameStarted && isLandscape && (
        <GamePopup start={handleGameStart} gameInfo={getPairCount} />
      )}
    </>
  );
}

export default App;

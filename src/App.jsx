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

import { useEffect, useState } from "react";
import GameBoard from "./components/GameBoard";
import OrientationWarning from "./components/OrientationWarning";

function App() {
  // State to check if the device is in landscape or not - Display a warning if not.
  const [isLandscape, setIsLandscape] = useState(
    window.innerWidth > window.innerHeight
  );

  // useEffect to check at every render if the device is (still) in landscape mode
  useEffect(() => {
    const handleResize = () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <>{isLandscape ? <GameBoard /> : <OrientationWarning />}</>;
}

export default App;

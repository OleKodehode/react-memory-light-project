import { CARD_SYMBOLS as symbols } from "./emojis";
import { shuffle } from "./shuffle";

export function generateDeck(pairCount) {
  // use the same shuffle function to shuffle the symbols array.
  const shuffledSymbols = shuffle(symbols);
  // slice out the amount needed
  const selected = shuffledSymbols.slice(0, pairCount);
  // makes pairs by doubling the array.
  const doubled = selected.flatMap((symbol, index) => [
    { id: index * 2, symbol, isFlipped: false, isMatched: false },
    { id: index * 2 + 1, symbol, isFlipped: false, isMatched: false },
  ]);
  // Shuffle the deck and return it.
  return shuffle(doubled);
}

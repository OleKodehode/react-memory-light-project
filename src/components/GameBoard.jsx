import Card from "./Card";

export default function GameBoard({ cards }) {
  return (
    <main className="grid grid-cols-4 md:grid-cols-6 gap-2.5 gap-x-5 p4">
      {cards.map((card) => (
        <Card
          key={card.id}
          symbol={card.symbol}
          isFlipped={card.isFlipped}
          isMatched={card.isMatched}
        />
      ))}
    </main>
  );
}

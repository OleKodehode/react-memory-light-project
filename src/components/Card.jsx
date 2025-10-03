export default function Card({
  cardID,
  symbol,
  isFlipped,
  isMatched,
  handleClick,
}) {
  return (
    <div
      className={`card ${isFlipped ? "flipped" : ""} ${
        isMatched ? "matched" : ""
      }`}
      onClick={handleClick}
    >
      <div className="card-inner-container">
        <p>{isFlipped || isMatched ? symbol : "❓"}</p>
        {/* <p>{symbol}</p> */}
      </div>
    </div>
  );
}

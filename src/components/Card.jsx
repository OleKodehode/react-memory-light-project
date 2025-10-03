export default function Card({ symbol, isFlipped, isMatched }) {
  return (
    <div className={`card ${isFlipped || isMatched ? "flipped" : ""}`}>
      <div className="card-inner-container">
        {/* <p>{isFlipped || isMatched ? symbol : "❓"}</p> */}
        <p>{symbol}</p>
      </div>
    </div>
  );
}

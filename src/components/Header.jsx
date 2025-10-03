export default function Header({ title, timer, moves }) {
  return (
    <header>
      <h1 className="text-xl">{title}</h1>
      <div className="flex gap-10 font-semibold">
        <h3>Time: {timer}</h3>
        <h3>Moves: {moves}</h3>
      </div>
    </header>
  );
}

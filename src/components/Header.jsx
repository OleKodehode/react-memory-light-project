export default function Header({ title, timer, moves, restart }) {
  return (
    <header>
      <div className="flex gap-5">
        <h1 className="text-xl">{title}</h1>
        <button
          className="dark:bg-slate-800 px-2 py-0.5 rounded-lg"
          onClick={() => restart()}
        >
          Restart Game
        </button>
      </div>
      <div className="flex gap-10 font-semibold">
        <h3>Time: {timer}</h3>
        <h3>Moves: {moves}</h3>
      </div>
    </header>
  );
}

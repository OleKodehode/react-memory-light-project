export default function GameDoneOverlay({ moves, restart }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-40">
      <dialog className="fixed w-1/2 top-25 left-50 h-auto z-50 p-8 rounded-2xl flex flex-col justify-center items-center gap-8 dark:bg-slate-900 dark:text-zinc-200">
        <h3 className="text-lime-600 text-2xl">Game won!</h3>
        <p>Moves used: {moves}</p>
        <button
          className="p-3 rounded-xl bg-slate-700 hover:bg-slate-500"
          onClick={() => restart()}
        >
          Restart
        </button>
      </dialog>
    </div>
  );
}

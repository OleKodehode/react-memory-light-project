export default function GamePopup({ start, gameInfo }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-40">
      <dialog className="fixed w-1/2 top-10 left-50 lg:top-40 lg:left-100 h-auto z-50 p-10 rounded-2xl flex flex-col justify-center items-center gap-8 dark:bg-slate-900 dark:text-zinc-200 text-center">
        <h2 className="text-xl font-bold">Match 2 Memory Game</h2>
        <p>
          A classic game of Match 2
          <br />
          Try to clear the board in as few tries as possible, and in the
          shortest time possible!
        </p>
        <p>
          There are {gameInfo() * 2} cards on the board - {gameInfo()} pairs to
          match. Good luck!
        </p>
        <button
          onClick={() => start()}
          className="transition-colors duration-200 p-2 dark:bg-slate-700 rounded-lg hover:dark:bg-slate-500"
        >
          Start the game
        </button>
      </dialog>
    </div>
  );
}

export default function GameDoneOverlay({ moves, time, restart, highScore }) {
  const mins = Math.floor(time / 60);
  const secs = time % 60;
  const formattedTime = mins
    ? mins > 1
      ? `${mins} minutes & ${secs} seconds`
      : `${mins} minute & ${secs} seconds`
    : `${secs} seconds`;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-40">
      <dialog className="fixed w-3/4 top-15 left-25 lg:top-30 lg:left-50 h-auto z-50 p-8 rounded-2xl flex flex-col justify-center items-center gap-3 dark:bg-slate-900 dark:text-zinc-200">
        <h3 className="text-lime-600 text-2xl">Game won!</h3>
        <div className="flex gap-5 w-full justify-around">
          <div className="">
            <p>
              Moves used: <span className="font-bold">{moves}</span>
            </p>
            <p>
              Time used: <span className="font-bold">{formattedTime}</span>
            </p>
          </div>
          <div>
            {moves <= highScore.moves ? (
              <p>New Moves Highscore!</p>
            ) : (
              <p>
                Your best score:{" "}
                <span className="font-bold">{highScore.moves} moves</span>
              </p>
            )}
            {time <= highScore.time ? (
              <p>New Time Highscore!</p>
            ) : (
              <p>
                Your best time:{" "}
                <span className="font-bold">{highScore.time} seconds</span>
              </p>
            )}
          </div>
        </div>
        <button
          className="p-3 rounded-xl bg-slate-700 hover:bg-slate-500 mt-5"
          onClick={() => restart()}
        >
          Restart
        </button>
      </dialog>
    </div>
  );
}

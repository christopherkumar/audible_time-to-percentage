// Main component for the audiobook progress tracker
const { useState, useEffect } = React;

function AudiobookProgressTracker() {
  const [totalHours, setTotalHours] = useState("");
  const [totalMinutes, setTotalMinutes] = useState("");
  const [inputHours, setInputHours] = useState("");
  const [inputMinutes, setInputMinutes] = useState("");
  const [isCompletedMode, setIsCompletedMode] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const [results, setResults] = useState({
    percentage: 0,
    completedTime: { hours: 0, minutes: 0 },
    remainingTime: { hours: 0, minutes: 0 },
    totalMinutes: 0,
  });

  // Check for saved dark mode preference or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme === "true" || (!savedTheme && systemPrefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode.toString());

    if (newDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const updateProgress = () => {
    const result = calculateProgress(
      totalHours,
      totalMinutes,
      inputHours,
      inputMinutes,
      isCompletedMode
    );

    if (result) {
      setResults(result);
    }
  };

  useEffect(() => {
    updateProgress();
  }, [totalHours, totalMinutes, inputHours, inputMinutes, isCompletedMode]);

  const progressBarWidth = Math.min(results.percentage, 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-700 p-4 flex items-center justify-center">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 space-y-6">
        {/* Dark Mode Toggle */}
        <div className="flex justify-end">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>

        <div className="text-center">
          <BookOpenIcon />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Audiobook Progress
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Track your listening progress
          </p>
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            <ClockIcon />
            Total Audiobook Time
          </label>
          <div className="flex space-x-2">
            <div className="flex-1">
              <input
                type="number"
                placeholder="Hours"
                min="0"
                value={totalHours}
                onChange={(e) => setTotalHours(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-center"
              />
              <span className="text-xs text-gray-500 dark:text-gray-400 block text-center mt-1">
                Hours
              </span>
            </div>
            <div className="flex-1">
              <input
                type="number"
                placeholder="Minutes"
                min="0"
                max="59"
                value={totalMinutes}
                onChange={(e) => setTotalMinutes(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-center"
              />
              <span className="text-xs text-gray-500 dark:text-gray-400 block text-center mt-1">
                Minutes
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4 py-2">
          <button
            onClick={() => setIsCompletedMode(true)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-colors ${
              isCompletedMode
                ? "bg-green-700 text-white border-green-700"
                : "bg-transparent text-green-600 dark:text-green-400 border-green-600 dark:border-green-400 hover:bg-green-800 hover:text-white"
            }`}
          >
            Completed
          </button>
          <button
            onClick={() => setIsCompletedMode(false)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-colors ${
              !isCompletedMode
                ? "bg-orange-700 text-white border-orange-700"
                : "bg-transparent text-orange-600 dark:text-orange-400 border-orange-600 dark:border-orange-400 hover:bg-orange-800 hover:text-white"
            }`}
          >
            Remaining
          </button>
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Time {isCompletedMode ? "Completed" : "Remaining"}
          </label>
          <div className="flex space-x-2">
            <div className="flex-1">
              <input
                type="number"
                placeholder="Hours"
                min="0"
                value={inputHours}
                onChange={(e) => setInputHours(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-center"
              />
              <span className="text-xs text-gray-500 dark:text-gray-400 block text-center mt-1">
                Hours
              </span>
            </div>
            <div className="flex-1">
              <input
                type="number"
                placeholder="Minutes"
                min="0"
                max="59"
                value={inputMinutes}
                onChange={(e) => setInputMinutes(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-center"
              />
              <span className="text-xs text-gray-500 dark:text-gray-400 block text-center mt-1">
                Minutes
              </span>
            </div>
          </div>
        </div>

        {results.totalMinutes > 0 && (
          <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-600">
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-1">
                {results.percentage}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Complete
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>0%</span>
                <span>100%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-4 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-400 dark:to-purple-500 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progressBarWidth}%` }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="text-center p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
                <div className="text-lg font-semibold text-green-700 dark:text-green-400">
                  {formatTime(
                    results.completedTime.hours,
                    results.completedTime.minutes
                  )}
                </div>
                <div className="text-xs text-green-600 dark:text-green-500">
                  Completed
                </div>
              </div>
              <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/30 rounded-lg">
                <div className="text-lg font-semibold text-orange-700 dark:text-orange-400">
                  {formatTime(
                    results.remainingTime.hours,
                    results.remainingTime.minutes
                  )}
                </div>
                <div className="text-xs text-orange-600 dark:text-orange-500">
                  Remaining
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

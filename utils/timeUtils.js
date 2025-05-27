// Time utility functions for the audiobook progress tracker

const timeToMinutes = (hours, minutes) => {
  return (parseInt(hours) || 0) * 60 + (parseInt(minutes) || 0);
};

const minutesToTime = (totalMinutes) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return { hours, minutes };
};

const formatTime = (hours, minutes) => {
  return `${hours}h ${minutes}m`;
};

const calculateProgress = (
  totalHours,
  totalMinutes,
  inputHours,
  inputMinutes,
  isCompletedMode
) => {
  const totalMins = timeToMinutes(totalHours, totalMinutes);
  const inputMins = timeToMinutes(inputHours, inputMinutes);

  if (totalMins === 0) return null;

  let completedMins, remainingMins, percentage;

  if (isCompletedMode) {
    completedMins = Math.min(inputMins, totalMins);
    remainingMins = totalMins - completedMins;
    percentage = (completedMins / totalMins) * 100;
  } else {
    remainingMins = Math.min(inputMins, totalMins);
    completedMins = totalMins - remainingMins;
    percentage = (completedMins / totalMins) * 100;
  }

  return {
    percentage: Math.round(percentage * 10) / 10,
    completedTime: minutesToTime(completedMins),
    remainingTime: minutesToTime(remainingMins),
    totalMinutes: totalMins,
  };
};

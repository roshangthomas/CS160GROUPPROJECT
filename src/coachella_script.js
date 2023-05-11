//TODO: THIS SHOULD GO INTO THE COACHELLA UNDER THE SCRIPT TAG 

function optimalSchedule(schedule, importance, eventNames) {
  // Sort the appointments by their importance
  const sortedSchedule = schedule.slice().sort((a, b) => importance[schedule.indexOf(b)] - importance[schedule.indexOf(a)]);
  const sortedEventNames = eventNames.slice().sort((a, b) => importance[eventNames.indexOf(b)] - importance[eventNames.indexOf(a)]);

  // Create an empty array to hold the scheduled appointments and event names
  const scheduled = [];
  const scheduledNames = [];

  // Iterate through each appointment in the sorted schedule
  for (let i = 0; i < sortedSchedule.length; i++) {
    const appt = sortedSchedule[i];

    // Check if the appointment overlaps with any already scheduled appointments
    let overlaps = false;
    for (let j = 0; j < scheduled.length; j++) {
      const scheduledAppt = scheduled[j];
      if (appt[0] < scheduledAppt[1] && appt[1] > scheduledAppt[0]) {
        overlaps = true;
        break;
      }
    }

    // If the appointment doesn't overlap with any already scheduled appointments, add it to the schedule
    if (!overlaps) {
      scheduled.push(appt);
      scheduledNames.push(sortedEventNames[i]);
    }
  }

  // Sort the scheduled appointments and event names in order of their start times
  for (let i = 0; i < scheduled.length - 1; i++) {
    for (let j = i + 1; j < scheduled.length; j++) {
      if (scheduled[j][0] < scheduled[i][0]) {
        const temp = scheduled[i];
        scheduled[i] = scheduled[j];
        scheduled[j] = temp;

        const tempName = scheduledNames[i];
        scheduledNames[i] = scheduledNames[j];
        scheduledNames[j] = tempName;
      }
    }
  }

  // Calculate the optimality score
  const totalScheduledTime = scheduled.reduce((total, appt) => total + (appt[1] - appt[0]), 0);
  const totalEventTime = schedule.reduce((total, appt) => total + (appt[1] - appt[0]), 0);
  const optimalityScore = totalScheduledTime / totalEventTime;

  return [scheduled, scheduledNames, optimalityScore];
}

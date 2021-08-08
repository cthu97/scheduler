export function getAppointmentsForDay(state, day) {
  let AppointmentsForDay;

  state.days.forEach(appt => {
    if (appt.name === day) {
      AppointmentsForDay = appt.appointments;
    }
  })
  if (!AppointmentsForDay) {
    return []
  }
  let apptDay = AppointmentsForDay.map(appt => state.appointments[appt])

  return apptDay;
}

export function getInterview(state, interview) {
  if (interview && interview.interviewer) {
    const interviewer = state.interviewers[interview.interviewer]
    return {...interview, interviewer}
  }
  return null
}

export function getInterviewersForDay(state, day) {
  if (state.days.length === 0) {
    return []
  }
  const filteredDay = state.days.filter(d => d.name === day)
  if (filteredDay.length === 0) {
    return []
  }
  return filteredDay[0].interviewers.map(id => state.interviewers[id])
}

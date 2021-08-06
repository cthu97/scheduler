export function getAppointmentsForDay(state, day) {
  let AppointmentsForDay;

  state.days.forEach(appt => {
    if(appt.name === day){
      AppointmentsForDay = appt.appointments;
    }
  })
  if(!AppointmentsForDay){
    return []
   }
  let apptDay = AppointmentsForDay.map(appt => state.appointments[appt])

return apptDay;
} 

export function getInterview(state, interview) {

  if (interview && interview.interviewer){
    const student = interview.student;
    const interviewer = state.interviewers[interview.interviewer];
    return { student, interviewer }
  }
  return null;
}
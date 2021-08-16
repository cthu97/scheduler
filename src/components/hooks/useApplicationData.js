import { useState, useEffect } from 'react';
import axios from 'axios';
import { getAppointmentsForDay } from "helpers/selectors";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };


    return axios.put(`/api/appointments/${id}`, {
      interview: { ...interview }
    }).then((res) => {
      setState({ ...state, appointments })
      updateSpots()
    })
      .catch(err => {
        console.log(err.stack)
      })
  }
   
  // update spots remaining for selected day 
  const updateSpots = () => {
    setState(prev => {
      const appointmentsForDay = getAppointmentsForDay(prev, prev.day);
      let count = appointmentsForDay.length;

      // count how many appointments there are per day then subtract each day accordingly
      appointmentsForDay.forEach((appointment) => {
        if (appointment.interview) {
          count--;
        }
      })

      return {
        ...prev,
        ...prev.days.forEach((day) => {
          if (day.name === prev.day) {
            day.spots = count
          }
        })
      }
    })
  }

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }

    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    return axios.delete(`/api/appointments/${id}`)
      .then(res => {
        setState({ ...state, appointments })
        updateSpots()
      })
  }

  const setDay = ((day) => { setState((prev) => ({ ...prev, day: day })) })

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
    })
  }, []);

  return { state, setDay, bookInterview, cancelInterview, updateSpots }
}
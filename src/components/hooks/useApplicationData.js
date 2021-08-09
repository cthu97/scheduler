import React, { useState, useEffect } from 'react';
import axios from 'axios';


export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  function bookInterview(id, interview) {
    console.log(`bookinterview ${JSON.stringify(id)}, ${JSON.stringify(interview)}`)
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
      setState(prev => updateSpots({ ...prev, appointments }))
    })
      .catch(err => {
        console.log(err.stack)
      })
  }

  const updateSpots = (state, day) => {
    const dayObj = state.days.find(d => d.name === day || state.day);
    const dayIndex = state.days.findIndex(d => d.name === day || state.day);
    const apptmentID = dayObj.appointments;
    const freeSpots = apptmentID.filter(id => !state.appointments[id].interview);
    const totalSpots = freeSpots.length;
    const stateUpdate = { ...state }
    const dayUpdate = { ...dayObj }

    stateUpdate.days = [...state.days]
    dayUpdate.spots = totalSpots;
    stateUpdate.days[dayIndex] = dayUpdate;

    return stateUpdate;
  };

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
        setState(prev => updateSpots({ ...prev, appointments }))
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
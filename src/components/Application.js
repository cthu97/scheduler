import React, { useState, useEffect } from "react";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import axios from "axios";
import { getAppointmentsForDay, getInterview } from "helpers/selectors";

import "components/Application.scss";

export default function Application(props) {
  // const appointments = [
  //   {
  //     id: 1,
  //     time: "12pm",
  //   },
  //   {
  //     id: 2,
  //     time: "1pm",
  //     interview: {
  //       student: "Lydia Miller-Jones",
  //       interviewer: {
  //         id: 1,
  //         name: "Sylvia Palmer",
  //         avatar: "https://i.imgur.com/LpaY82x.png",
  //       },
  //     },
  //   },
  //   {
  //     id: 3,
  //     time: "3pm",
  //     interview: {
  //       student: "Ranger Joe of Kentucky Fried Mushrooms",
  //       interviewer: {
  //         id: 1,
  //         name: "Sylvia Palmer",
  //         avatar: "https://i.imgur.com/LpaY82x.png",
  //       },
  //     },
  //   },
  //   {
  //     id: 4,
  //     time: "4pm",
  //     interview: {
  //       student: "Unicorn Lily From The Land of Kazeebas",
  //       interviewer: {
  //         id: 1,
  //         name: "Sylvia Palmer",
  //         avatar: "https://i.imgur.com/LpaY82x.png",
  //       },
  //     },
  //   },
  // ];


  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const appointments = getAppointmentsForDay(state, state.day);

  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
  
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
      />
    );
  });
  

  const setDay = ((day) => { setState((prev) => ({ ...prev, day: day })) })

  console.log(`state:days: ${JSON.stringify(state.days)}`)

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
    })
  }, []);
  
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            key={state.day.id}
            days={state.days}
            day={state.day}
            setDay={setDay} />
        </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
    <section className="schedule">
      {schedule}
      <Appointment
        id='last'
        time="5pm"
      />
    </section>
    </main >
  );
}
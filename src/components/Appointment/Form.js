import React, { useState } from 'react';
import InterviewerList from '../InterviewerList';
import Button from '../Button';

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

// clears form 
  function reset() {
    setName('');
    setInterviewer(null);
  }
  
// calls for form reset on cancel button click
  function cancel() {
    reset();
    props.onCancel();
  }

// makes sure form submission is valid
  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    else if (!interviewer) {
      setError("Please choose an interviewer.")
      return;
    }
    setError("")
    props.onSave(name, interviewer);
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={e => e.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            onChange={e => setName(e.target.value)}
            value={name || ""}
            data-testid="student-name-input"
          />
          <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={e => setInterviewer(e)} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={e => {
            validate();
          }}>Save</Button>
        </section>
      </section>
    </main>
  )
};


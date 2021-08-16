import React from 'react';
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from 'components/hooks/useVisualMode';
import Form from './Form';
import Status from './Status';
import Confirm from "./Confirm";
import Error from "./Error"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  /* props: id, time, interview, interviewers, bookInterview, cancelInterview */

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // save function for form
  const save = (name, interviewer) => {
    transition(SAVING)
    const interview = {
      student: name,
      interviewer
    }
    Promise.resolve(props.bookInterview(props.id, interview))
      .then(res => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
  }

  // confirming delete to destroy interview
  const destroy = () => {
    transition(DELETING, true);
    props.cancelInterview(props.id)
      .then(res => transition(EMPTY))
      .catch(err => transition(ERROR_DELETE, true))
  };
  

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === SAVING && (
        <Status message="Saving" />
      )}
      {mode === DELETING && (
        <Status message="Deleting" />
      )}
      {mode === CONFIRM && (
        <Confirm
          onConfirm={destroy}
          onCancel={back}
        />
      )}
      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
          message="Could not save appointment"
          onClose={back}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message="Could not cancel appointment"
          onClose={back}
        />
      )}
    </article>
  );
}


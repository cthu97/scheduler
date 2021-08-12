import React from 'react';
import InterviewerListItem from 'components/InterviewerListItem';
import propTypes from 'prop-types';

import 'components/InterviewerList.scss';

export default function InterviewerList(props) {
    const interviewersList = props.interviewers.map(interviewer => {
      return <InterviewerListItem
        key={interviewer.id}
        id={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        setInterviewer={event => props.onChange(interviewer.id)}
      />
    })
    return (
      <section className="interviewers">
        <h4 className="interviewers__header text--light">Interviewers</h4>
        <ul className="interviewers__list">{interviewersList}</ul>
      </section>
    );
  }

InterviewerList.propTypes = {
  value: propTypes.number,
  onChange: propTypes.func
};
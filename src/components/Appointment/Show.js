import React from 'react';


export default function Show({ student, interviewer, onEdit, onDelete }) {

    return (
        <main className="appointment__card appointment__card--show">
            <section className="appointment__card-left">
                <h2 className="text--regular">Lydia Miller-Jones</h2>
                <section className="interviewer">
                    <h4 className="text--light">Interviewer</h4>
                    <h3 className="text--regular">Sylvia Palmer</h3>
                </section>
            </section>
            <section className="appointment__card-right">
                <section className="appointment__actions">
                    <img
                        className="appointment__actions-button"
                        src="images/edit.png"
                        onEdit={"onEdit"}
                        alt="Edit"
                    />
                    <img
                        className="appointment__actions-button"
                        src="images/trash.png"
                        onDelete={onDelete}
                        alt="Delete"
                    />
                </section>
            </section>
        </main>
    )
}

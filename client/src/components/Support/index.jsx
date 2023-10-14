import React from "react";
import "../Support/Support.css";
import Main from "../Main";

const Support = () => {
  return (
    <>
      <Main />
      <div className="about-us">
        <h2 className="section-title">About Us</h2>
        <p className="section-text">
          We are a dedicated team of task management enthusiasts. Our goal is to
          make your life easier by helping you organize and manage your tasks
          efficiently.
        </p>
        <p className="section-text">
          Whether you're a busy professional, a student, or anyone in need of a
          better way to stay on top of your tasks, our platform is designed with
          you in mind.
        </p>
      </div>
      <div className="faq">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <div className="faq-item">
          <h3 className="faq-question">Q: How do I create a new task?</h3>
          <p className="faq-answer">
            A: To create a new task, click on the "Add Task" button and fill in
            the task details.
          </p>
        </div>
        <div className="faq-item">
          <h3 className="faq-question">Q: Can I set due dates for tasks?</h3>
          <p className="faq-answer">
            A: Yes, you can specify due dates for your tasks when creating or
            editing them.
          </p>
        </div>
        <div className="faq-item">
          <h3 className="faq-question">
            Q: How can I mark a task as completed?
          </h3>
          <p className="faq-answer">
            A: Simply click the checkbox next to the task to mark it as
            completed.
          </p>
        </div>
        {/* Add more FAQ items as needed */}
      </div>
    </>
  );
};

export default Support;

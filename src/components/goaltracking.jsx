import React, { useState } from 'react'; //import React Component

// hardcoded goals:
const fakeGoals = [
  {id: 1, text: "Read 20 pages", completed: true},
  {id: 2, text: "Finish 'Pride and Prejudice'", completed: true},
  {id: 3, text: "Read 5 new books this month", completed: false},
  {id: 4, text: "Try a new genre", completed: false},
  {id: 5, text: "Write a short book review", completed: false},
]

// progessbar: displays overall goal completion progress
function ProgressBar({ completed, total }) {
  // calculate percentage
  let percent;
  // avoid division by 0
  if (total === 0) {
    percent = 0;
  } else {
    percent = Math.round((completed / total) * 100);
  }

  return (
    <section className="gt-progress">
      {/* title */}
      <h2 className="home-title">Prog<span>ress</span></h2>
      <p className="home-subtitle" style={{ color: "#969198" }}>A tracker to help you read more and reach your goals.</p>

      {/* show numeric progress */}
      <p className="progress-percent">Goal Progress: {percent}%</p>

      {/* progress bar */}
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: percent + "%" }}></div>
      </div>
      <p>{completed} of {total} goals completed</p>
    </section>
  );
}

// goalitem represents one goal
function GoalItem({ goal, onToggle }) {
  // create unique id for checkbox
  const goalID = "goal-" + goal.id;

  return(
    <div className="goal-item">
      <input
        type="checkbox"
        id={goalID}
        checked={goal.completed}
        onChange={() => onToggle(goal.id)}
      />

      {/* label associated with checkbox */}
      <label htmlFor={goalID}>{goal.text}</label>
    </div>
  );
}

// GoalsPage is the main page showing progress and goals
function GoalsPage() {
  // state: list of goals
  const [goals, setGoals] = useState(fakeGoals);

  // count how many goals are completed for progress bar:
  const completedTotal = goals.filter(g => g.completed).length;

  // toggle a goal's completed status
  function handleToggle(id) {
    // copy the goals from state
    const copyGoals = [...goals]

    // create a new array w updated completed values due to toggle
    const updatedGoals = copyGoals.map(goal => {
      if(goal.id === id) {
        // toggle to completed property for clicked goal
        return {...goal, completed: !goal.completed };
      } else {
        // leave other goals unchanged
        return goal;
      }
    });

    // update state w new array
    setGoals(updatedGoals);
  }
  return (
    <div>
      <ProgressBar completed={completedTotal} total={goals.length} />

      <section className="gt-goals">
        <div className="goals-header">
          <h2 className="gt-goals-title">
            <img src="/img/target.png" alt="target icon" className="gt-target" />
            My Reading Goals
          </h2>
        </div>

        <div>
          {goals.map(goal => (
            <GoalItem key={goal.id} goal={goal} onToggle={handleToggle} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default GoalsPage;
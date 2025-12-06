import React, { useState, useEffect } from 'react'; //import React Component
import { getDatabase, ref, onValue, remove, set, push } from 'firebase/database';

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
      <p className="home-subtitle" style={{ color: "#5a5760" }}>A tracker to help you read more and reach your goals.</p>

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
function GoalItem({ goal, onToggle, onDelete }) {
  // create unique id for checkbox
  const goalID = "goal-" + goal.id;

  return(
    <div className="goal-item">

      {/* checkbox toggles completion: */}
      <input
        type="checkbox"
        id={goalID}
        checked={goal.completed}
        onChange={() => onToggle(goal.id, !goal.completed)}
      />

      {/* label associated with checkbox */}
      <label htmlFor={goalID}>{goal.text}</label>

      {/* delete button */}
      <button
        className="delete-goal-btn"
        onClick={() => onDelete(goal.id)}
      >
        X
      </button>
    </div>
  );
}

// GoalsPage is the main page showing progress and goals
export default function GoalsPage() {
  // state: list of goals from Firebase
  const [goals, setGoals] = useState([]);

  // input for a new goal
  const [newGoalText, setNewGoalText] = useState("");

  // add input
  const [creatingGoal, setCreatingGoal] = useState(false);

  // (1) read goals from firebase
  useEffect(() => {
    // get the database
    const db = getDatabase();

    // referenced the shared goals
    const goalsRef = ref(db, "goals/");

    // use real time listener
    const update = onValue(goalsRef, (snapshot) => {
      // get raw obj
      const data = snapshot.val();

      // if no goals yet, set empty array
      if (!data) {
        setGoals([]);
        return;
      }

      // convert object to array
      const arr = Object.keys(data).map(function(key) {
        const val = data[key];

        // ensure fields exist

        // goal text //
        let textVal = "";
        if (val && typeof val.text === "string") {
          textVal = val.text;
        }

        // completed boolean //
        let completedVal = false;
        if (val && typeof val.completed === "boolean") {
          completedVal = val.completed;
        }

        // time check //
        let createdAtVal = 0;
        if (val && typeof val.createdAt === "number") {
          createdAtVal = val.createdAt;
        }

        return {
          id: key,
          text: textVal,
          completed: completedVal,
          createdAt: createdAtVal
        };
      });

      // sort newest goal first using createdAt
      arr.sort(function(a, b) {
        return b.createdAt - a.createdAt;
      });

      // update state
      setGoals(arr);
    },
    (err) => {
      // error handler for onValue
      console.error("Firebase onValue error:", err);
    });

    // return cleanup that detaches listener when component unmounts
    return function cleanup() {
      update();
    };
  }, []);

  // (2) show input to add new goal
  function handleAddGoal() {
    setCreatingGoal(true);
  }

  // (3) confirm and push new goal to firebase
  function handleConfirmNewGoal() {
    // avoid empty strings
    if (newGoalText.trim() === "") {
      return;
    }

    // get the database
    const db = getDatabase();

    // referenced the shared goals
    const goalsRef = ref(db, "goals/");

    // new goal obj
    const obj = {
      text: newGoalText.trim(),
      completed: false,
      createdAt: Date.now()
    };

    // handling push error
    push(goalsRef, obj).catch(function(err) {
      console.error("Failed to push goal:", err);
    });

    // reset ui
    setNewGoalText("");
    setCreatingGoal(false);
  }

  // (4) delete goal from firebase
  function handleDelete(id) {
    // get the database
    const db = getDatabase();

    // referenced the shared goals
    const goalsRef = ref(db, "goals/" + id);

    // remove returns a promise
    remove(goalsRef).catch(function(err) {
      console.error("Failed to delete:", err);
    });
  }

  // (5) toggle completed on firebase
 function handleToggle(id, newValue) {
  const db = getDatabase();
  const completedRef = ref(db, "goals/" + id + "/completed");

  set(completedRef, newValue).catch(function(err) {
    console.error("Failed to update completed:", err);
  });
}

  // (6) when click enter, the goal is saved
  function handleEnter(e) {
  if (e.key === "Enter") {
    e.preventDefault();
    handleConfirmNewGoal();
  }
}

  // compute number completed for progressbar
  let completedTotal = 0;
   {
    // manual loop instead of functional helpers for clarity
    let i = 0;
    while (i < goals.length) {
      if (goals[i].completed === true) {
        completedTotal = completedTotal + 1;
      }
      i = i + 1;
    }
  }

  return (
    <div>
      <ProgressBar completed={completedTotal} total={goals.length} />

      <section className="gt-goals">
        <div className="goals-header">
          <h2 className="gt-goals-title">
            My Reading Goals
          </h2>
        <button className="add-goal-btn" onClick={handleAddGoal}>+ Add Goal</button>
        </div>

        {/* show new goal input row */}
        {creatingGoal === true && (
          <div className="goal-item new-goal-item">
            <input
              type="text"
              placeholder="Enter a new goal"
              value={newGoalText}
              onChange={(e) => setNewGoalText(e.target.value)}
              onKeyDown={handleEnter}
            />
            <button onClick={handleConfirmNewGoal} className="save-goal-btn">Save</button>
          </div>
        )}

        <div>
          {goals.map(function(goal) {
            return (
              <GoalItem
                key={goal.id}
                goal={goal}
                onToggle={handleToggle}
                onDelete={handleDelete}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}

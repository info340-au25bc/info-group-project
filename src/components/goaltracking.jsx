import React, { useState, useEffect } from 'react';
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
      <h2 className="home-title">Prog<span>ress</span></h2>
      <p className="home-subtitle" style={{ color: "#5a5760" }}>
        A tracker to help you read more and reach your goals.
      </p>

      <p className="progress-percent">Goal Progress: {percent}%</p>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: percent + "%" }}></div>
      </div>
      <p>{completed} of {total} goals completed</p>
    </section>
  );
}

// goalitem represents one goal
function GoalItem({ goal, onToggle, onDelete }) {
  const goalID = "goal-" + goal.id;

  return (
    <div className="goal-item">
      <input
        type="checkbox"
        id={goalID}
        checked={goal.completed}
        onChange={() => onToggle(goal.id, !goal.completed)}
      />
      <label htmlFor={goalID}>{goal.text}</label>

      <button className="delete-goal-btn" onClick={() => onDelete(goal.id)}>
        X
      </button>
    </div>
  );
}

// GoalsPage is the main page showing progress and goals
export default function GoalsPage() {

  const [goals, setGoals] = useState([]);
  const [newGoalText, setNewGoalText] = useState("");
  const [creatingGoal, setCreatingGoal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // --- READ GOALS ---
  useEffect(() => {
    const db = getDatabase();
    const goalsRef = ref(db, "goals/");

    const unsubscribe = onValue(
      goalsRef,
      (snapshot) => {
        const data = snapshot.val();

        if (!data) {
          setGoals([]);
          return;
        }

        const arr = Object.keys(data).map((key) => ({
          id: key,
          text: data[key].text ?? "",
          completed: data[key].completed ?? false,
          createdAt: data[key].createdAt ?? 0
        }));

        arr.sort((a, b) => b.createdAt - a.createdAt);
        setGoals(arr);
      },
      (error) => {
        setErrorMessage("Failed to load goals: " + error.message);
      }
    );

    return () => unsubscribe();
  }, []);

  // --- ADD ---
  function handleAddGoal() {
    setCreatingGoal(true);
  }

  async function handleConfirmNewGoal() {
    if (newGoalText.trim() === "") {
      return;
    }

    const db = getDatabase();
    const goalsRef = ref(db, "goals/");
    const obj = {
      text: newGoalText.trim(),
      completed: false,
      createdAt: Date.now()
    };

    setIsLoading(true);
    setErrorMessage("");

    try {
      await push(goalsRef, obj);
      setNewGoalText("");
      setCreatingGoal(false);
    } catch (err) {
      console.error("Failed to add goal:", err);
      setErrorMessage("Could not save your goal. Please check your connection or permissions.");
    }

    setIsLoading(false);
  }

  // --- DELETE ---
  async function handleDelete(id) {
    const db = getDatabase();
    const goalsRef = ref(db, "goals/" + id);

    setIsLoading(true);
    setErrorMessage("");

    try {
      await remove(goalsRef);
    } catch (err) {
      setErrorMessage("Failed to delete goal: " + err.message);
    }

    setIsLoading(false);
  }

  // --- TOGGLE ---
  async function handleToggle(id, newValue) {
    const db = getDatabase();
    const completedRef = ref(db, "goals/" + id + "/completed");

    setIsLoading(true);
    setErrorMessage("");

    try {
      await set(completedRef, newValue);
    } catch (err) {
      setErrorMessage("Failed to update goal: " + err.message);
    }

    setIsLoading(false);
  }

  // --- KEY HANDLING ---
  function handleKeyDown(e) {
    if (e.key === "Escape") {
      setCreatingGoal(false);
      setNewGoalText("");
    }
    if (e.key === "Enter") {
      e.preventDefault();
      handleConfirmNewGoal();
    }
  }

  // --- COUNT COMPLETED ---
  let completedTotal = goals.filter(g => g.completed).length;

  return (
    <div>
      {errorMessage && (
        <div className="error-banner">
          {errorMessage}
        </div>
      )}

      {isLoading && (
        <div className="loading-banner">
          Working…
        </div>
      )}

      <ProgressBar completed={completedTotal} total={goals.length} />

      <section className="gt-goals">
        <div className="goals-header">
          <h2 className="gt-goals-title">My Reading Goals</h2>
          <button className="add-goal-btn" onClick={handleAddGoal}>+ Add Goal</button>
        </div>

        {creatingGoal && (
          <form
            className="goal-item new-goal-item"
            onSubmit={(e) => {
              e.preventDefault();
              handleConfirmNewGoal();
            }}
          >
            
            <label htmlFor="new-goal-input" className="sr-only">
              Enter a new goal
            </label>

            <input
              id="new-goal-input"
              type="text"
              placeholder="Enter a new goal"
              value={newGoalText}
              onChange={(e) => setNewGoalText(e.target.value)}
              onKeyDown={handleKeyDown}
            />

            <button type="submit" className="save-goal-btn">
              Save
            </button>

            <button
              type="button"
              className="cancel-goal-btn"
              onClick={() => {
                setCreatingGoal(false);
                setNewGoalText("");
              }}
            >
              ✖
            </button>
          </form>
        )}

        <div>
          {goals.map((goal) => (
            <GoalItem
              key={goal.id}
              goal={goal}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

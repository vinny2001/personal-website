import GoalCard from './GoalCard';

/** One Kanban column: a labelled header with a count, then the stacked cards. */
const GoalColumn = ({ title, items }) => (
  <div className="goals-column">
    <div className="goals-column__header">
      <h3 className="goals-column__title">{title}</h3>
      <span className="goals-column__count">{items.length}</span>
    </div>
    <div className="goals-column__cards">
      {items.map((goal, i) => (
        <GoalCard key={goal.text} {...goal} delay={i + 1} />
      ))}
    </div>
  </div>
);

export default GoalColumn;

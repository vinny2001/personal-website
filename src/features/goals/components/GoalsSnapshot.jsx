import { RevealGroup, RevealItem } from 'components/motion/Reveal';
import { goals, goalsPage, statusLabels } from 'content/goals';

import groupGoalsByStatus from '../lib/groupGoalsByStatus';

import GoalProgress from './GoalProgress';
import StatusMark from './StatusMark';

import '../Goals.css';

/** Most in-motion goals to list before collapsing the rest into "+ N more". */
const MAX_SHOWN = 4;

/**
 * Homepage teaser for the goals board: compact progress meter + the goals still
 * in motion. Inner content only — the host supplies the <section>, its heading
 * and the "view all" link. Any title inside is an <h3>.
 */
const GoalsSnapshot = () => {
  const { wip } = groupGoalsByStatus(goals);
  const shown = wip.slice(0, MAX_SHOWN);
  const hidden = wip.length - shown.length;

  return (
    <div className="goals-snapshot">
      <div className="goals-snapshot__grid">
        <div>
          <GoalProgress goals={goals} size="sm" />
        </div>

        <div className="min-w-0">
          <h3 className="kicker flex items-center gap-2">
            <StatusMark status="wip" />
            {statusLabels.wip}
          </h3>

          {shown.length > 0 ? (
            <RevealGroup as="ul" stagger={0.07} className="mt-4 border-b">
              {shown.map(({ icon: Icon, category, text }) => (
                <RevealItem as="li" key={text} className="flex items-start gap-3 border-t py-4">
                  <Icon
                    aria-hidden="true"
                    strokeWidth={1.75}
                    className="mt-0.5 size-4 shrink-0 text-ink-muted"
                  />
                  <div className="min-w-0">
                    <p className="kicker">{category}</p>
                    <p className="mt-1 text-ink">{text}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          ) : (
            <p className="mt-4 border-y py-4 text-ink-soft">{goalsPage.noneInMotion}</p>
          )}

          {hidden > 0 && (
            <p className="kicker mt-3">
              + {hidden} more {statusLabels.wip.toLowerCase()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoalsSnapshot;

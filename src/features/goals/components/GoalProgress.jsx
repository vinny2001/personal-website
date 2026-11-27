import { statusLabels } from 'content/goals';

import goalProgress from '../lib/goalProgress';

import ProgressMeter from './ProgressMeter';
import StatusMark from './StatusMark';

/**
 * "4 of 6 accomplished" with its segmented meter. `size="lg"` (the /goals page)
 * adds a legend and percentage beside an oversized numeral; `size="sm"` (the
 * homepage snapshot) is the compact stack.
 */
const GoalProgress = ({ goals, size = 'sm' }) => {
  const { done, total, percent } = goalProgress(goals);
  const large = size === 'lg';

  return (
    <div className={large ? 'grid items-end gap-8 sm:grid-cols-12 sm:gap-x-8' : undefined}>
      <p className={`flex flex-wrap items-baseline gap-x-4 ${large ? 'sm:col-span-5' : ''}`.trim()}>
        <span
          className={`font-display leading-[0.85] tracking-tight text-ink ${
            large ? 'text-[clamp(5.5rem,18vw,10rem)]' : 'text-6xl'
          }`}
        >
          {done}
        </span>{' '}
        <span className="kicker">of {total} accomplished</span>
      </p>

      <div className={large ? 'sm:col-span-7' : 'mt-5'}>
        <ProgressMeter done={done} total={total} size={size} />

        {large && (
          <div className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 font-mono text-xs text-ink-muted">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              <li className="flex items-center gap-2">
                <StatusMark status="done" />
                {statusLabels.done}
                <span className="text-ink">{done}</span>
              </li>
              <li className="flex items-center gap-2">
                <StatusMark status="wip" />
                {statusLabels.wip}
                <span className="text-ink">{total - done}</span>
              </li>
            </ul>
            <p>{percent}%</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GoalProgress;

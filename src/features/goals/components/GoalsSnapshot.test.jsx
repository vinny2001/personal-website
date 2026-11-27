import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { goals } from 'content/goals';

import goalProgress from '../lib/goalProgress';
import groupGoalsByStatus from '../lib/groupGoalsByStatus';

import GoalsSnapshot from './GoalsSnapshot';

const renderSnapshot = () =>
  render(
    <MemoryRouter>
      <GoalsSnapshot />
    </MemoryRouter>
  );

describe('GoalsSnapshot', () => {
  it('shows the accomplished count', () => {
    renderSnapshot();
    const { total } = goalProgress(goals);
    expect(screen.getByText(`of ${total} accomplished`)).toBeInTheDocument();
  });

  it('lists the in-motion goals under an h3, and not the finished ones', () => {
    renderSnapshot();
    const { wip, done } = groupGoalsByStatus(goals);

    expect(screen.getByRole('heading', { level: 3, name: 'In motion' })).toBeInTheDocument();
    wip.forEach((goal) => expect(screen.getByText(goal.text)).toBeInTheDocument());
    done.forEach((goal) => expect(screen.queryByText(goal.text)).not.toBeInTheDocument());
  });

  it('renders inner content only: no section, no h1/h2, no links', () => {
    const { container } = renderSnapshot();
    expect(container.querySelector('section')).toBeNull();
    expect(screen.queryByRole('heading', { level: 1 })).toBeNull();
    expect(screen.queryByRole('heading', { level: 2 })).toBeNull();
    expect(screen.queryByRole('link')).toBeNull();
  });
});

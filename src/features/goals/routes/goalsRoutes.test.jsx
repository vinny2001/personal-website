import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { goalFilters, goals } from 'content/goals';

import goalProgress from '../lib/goalProgress';

import GoalsPage from './GoalsPage';

const renderPage = () =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={['/goals']}>
        <Routes>
          <Route path="/goals" element={<GoalsPage />} />
        </Routes>
      </MemoryRouter>
    </HelmetProvider>
  );

const wipGoal = goals.find((g) => g.status === 'wip');
// Prefer an accomplished goal without a write-up; every one may have a link.
const doneGoal =
  goals.find((g) => g.status === 'done' && !g.link) ?? goals.find((g) => g.status === 'done');
const linkedGoal = goals.find((g) => g.link);

describe('/goals', () => {
  it('renders the page heading and the progress summary', () => {
    renderPage();
    const { done, total } = goalProgress(goals);

    expect(
      screen.getByRole('heading', { level: 1, name: /This year.s goals/ })
    ).toBeInTheDocument();
    expect(screen.getByText(`of ${total} accomplished`)).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Progress' })).toHaveTextContent(String(done));
  });

  it('lists every goal as a numbered h3 within the list', () => {
    renderPage();
    const list = screen.getByRole('list', { name: 'The list' });
    expect(within(list).getAllByRole('listitem')).toHaveLength(goals.length);
    expect(screen.getByRole('heading', { level: 3, name: wipGoal.text })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: doneGoal.text })).toBeInTheDocument();
  });

  it('links a goal that has a write-up to its blog post', () => {
    renderPage();
    const link = screen.getByRole('link', { name: new RegExp(linkedGoal.text) });
    expect(link).toHaveAttribute('href', `/blog/${linkedGoal.link}`);
    expect(link).toHaveTextContent('Read the write-up');
  });

  it('filters by status with toggle buttons', async () => {
    renderPage();
    const all = screen.getByRole('button', { name: /^All/ });
    const accomplished = screen.getByRole('button', { name: /^Accomplished/ });
    const inMotion = screen.getByRole('button', { name: /^In motion/ });

    expect(all).toHaveAttribute('aria-pressed', 'true');

    fireEvent.click(accomplished);
    expect(accomplished).toHaveAttribute('aria-pressed', 'true');
    expect(all).toHaveAttribute('aria-pressed', 'false');
    await waitFor(() => expect(screen.queryByText(wipGoal.text)).not.toBeInTheDocument());
    expect(screen.getByText(doneGoal.text)).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent(
      `Showing ${goals.filter((g) => g.status === 'done').length} of ${goals.length}`
    );

    fireEvent.click(inMotion);
    await waitFor(() => expect(screen.queryByText(doneGoal.text)).not.toBeInTheDocument());
    expect(screen.getByText(wipGoal.text)).toBeInTheDocument();

    fireEvent.click(all);
    await waitFor(() => expect(screen.getByText(doneGoal.text)).toBeInTheDocument());
    expect(screen.getByText(wipGoal.text)).toBeInTheDocument();
  });

  it('has no "write-up to come" note on in-motion goals', () => {
    renderPage();
    expect(screen.queryByText(/write-up to come/i)).toBeNull();
  });

  it('offers a next-year scratchpad filter that shows "More on this soon!"', async () => {
    renderPage();
    const option = goalFilters.find((o) => o.scratchpad);
    const button = screen.getByRole('button', { name: option.label });

    expect(button).toHaveAttribute('aria-pressed', 'false');
    // No count on the scratchpad option.
    expect(button).toHaveTextContent(new RegExp(`^${option.label}$`));

    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: /^All/ })).toHaveAttribute('aria-pressed', 'false');

    const note = screen.getByRole('note');
    expect(within(note).getByText('More on this soon!')).toBeInTheDocument();
    expect(within(note).getByText(option.note)).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByText(wipGoal.text)).not.toBeInTheDocument());
    expect(screen.queryByRole('list', { name: 'The list' })).toBeNull();
    expect(screen.queryByRole('status')).toBeNull();

    fireEvent.click(screen.getByRole('button', { name: /^All/ }));
    expect(screen.queryByRole('note')).toBeNull();
    expect(screen.getByRole('list', { name: 'The list' })).toBeInTheDocument();
  });
});

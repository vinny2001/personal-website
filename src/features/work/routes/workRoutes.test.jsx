import { render, screen, within } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { workPage } from 'content/experience';

import CurrentRole from '../components/CurrentRole';

import WorkPage from './WorkPage';

const renderWork = () =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={['/work']}>
        <Routes>
          <Route path="/work" element={<WorkPage />} />
        </Routes>
      </MemoryRouter>
    </HelmetProvider>
  );

describe('/work', () => {
  it('renders the masthead as the only h1', () => {
    renderWork();
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(screen.getByRole('heading', { level: 1, name: workPage.title })).toBeInTheDocument();
  });

  it('groups roles under their company', () => {
    renderWork();

    const travelers = screen.getByRole('region', { name: 'Travelers' });
    expect(within(travelers).getAllByRole('heading', { level: 3 })).toHaveLength(3);
    expect(
      within(travelers).getByRole('heading', { level: 3, name: 'Associate Software Engineer' })
    ).toBeInTheDocument();
    expect(within(travelers).getByText('3 roles', { exact: false })).toBeInTheDocument();

    const yale = screen.getByRole('region', { name: 'Yale University' });
    expect(within(yale).getAllByRole('heading', { level: 3 })).toHaveLength(2);
  });

  it('marks the current role with an open-ended range and machine-readable dates', () => {
    renderWork();

    const travelers = screen.getByRole('region', { name: 'Travelers' });
    const [current] = within(travelers).getAllByRole('article');

    expect(within(current).getByText('Present')).toBeInTheDocument();
    expect(current.querySelector('time[datetime="2025-06"]')).toHaveTextContent('Jun 2025');
  });

  it('lists each role stack', () => {
    renderWork();
    const travelers = screen.getByRole('region', { name: 'Travelers' });
    const [current] = within(travelers).getAllByRole('article');

    expect(
      within(within(current).getByRole('list', { name: 'Stack' })).getByText('Angular')
    ).toBeInTheDocument();
  });
});

describe('CurrentRole', () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ['Date'] });
    vi.setSystemTime(new Date(2026, 10, 27));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('shows the current role, company, location, and tenure', () => {
    render(<CurrentRole />);

    expect(
      screen.getByRole('heading', { level: 3, name: 'Associate Software Engineer' })
    ).toBeInTheDocument();
    expect(screen.getByText(/Travelers/)).toBeInTheDocument();
    expect(screen.getByText(/Hartford, CT/)).toBeInTheDocument();
    expect(screen.getByText(/Since/)).toHaveTextContent('Since Jun 2025 · 1 yr 5 mo');
  });

  it('renders inner content only (no section, no h2)', () => {
    const { container } = render(<CurrentRole />);

    expect(container.querySelector('section')).toBeNull();
    expect(screen.queryByRole('heading', { level: 2 })).toBeNull();
    expect(screen.queryByRole('link')).toBeNull();
  });
});

import { render, screen, within } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { aboutFacts, aboutPage, aboutParagraphs } from 'content/about';
import certifications from 'content/certifications';
import publications from 'content/publications';
import { skillGroups } from 'content/skills';

import AboutPage from './AboutPage';

const renderAbout = () =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={['/about']}>
        <Routes>
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </MemoryRouter>
    </HelmetProvider>
  );

describe('/about', () => {
  it('renders the masthead as the only h1', () => {
    renderAbout();
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(screen.getByRole('heading', { level: 1, name: aboutPage.title })).toBeInTheDocument();
  });

  it('has labelled bio and skills sections', () => {
    renderAbout();
    const bio = screen.getByRole('region', { name: aboutPage.bio.title });
    const skills = screen.getByRole('region', { name: aboutPage.skills.title });

    expect(bio).toBeInTheDocument();
    expect(skills).toBeInTheDocument();
    expect(within(bio).getByText(aboutParagraphs[0])).toBeInTheDocument();
  });

  it('presents the facts as a definition list with their labels', () => {
    renderAbout();
    const aside = screen.getByRole('complementary', { name: aboutPage.bio.factsTitle });

    aboutFacts.forEach(({ number, label }) => {
      expect(within(aside).getByText(number)).toBeInTheDocument();
      expect(within(aside).getByText(label)).toBeInTheDocument();
    });
  });

  it('lists every skill group with its skills as list items', () => {
    renderAbout();
    const skills = screen.getByRole('region', { name: aboutPage.skills.title });

    skillGroups.forEach(({ category, skills: items }) => {
      expect(within(skills).getByText(category)).toBeInTheDocument();
      items.forEach((skill) => {
        expect(within(skills).getByText(skill).closest('li')).not.toBeNull();
      });
    });
  });
});

test('/about embeds each certification badge with a verify link', () => {
  renderAbout();
  expect(
    screen.getByRole('heading', { level: 2, name: aboutPage.certifications.title })
  ).toBeInTheDocument();
  certifications.forEach(({ name, badgeId }) => {
    expect(screen.getByTitle(`${name} badge on Credly`)).toHaveAttribute(
      'src',
      `https://www.credly.com/embedded_badge/${badgeId}`
    );
  });
  expect(screen.getAllByRole('link', { name: 'Verify' })).toHaveLength(certifications.length);
});

test('/about lists publications with paper and write-up links', () => {
  renderAbout();
  expect(
    screen.getByRole('heading', { level: 2, name: aboutPage.publications.title })
  ).toBeInTheDocument();
  const section = screen.getByRole('region', { name: aboutPage.publications.title });

  publications.forEach(({ title, url, post }) => {
    expect(within(section).getByRole('heading', { level: 3, name: title })).toBeInTheDocument();
    expect(
      within(section).getByRole('link', { name: aboutPage.publications.paperLabel })
    ).toHaveAttribute('href', url);
    expect(
      within(section).getByRole('link', { name: aboutPage.publications.postLabel })
    ).toHaveAttribute('href', `/blog/${post}`);
  });
});

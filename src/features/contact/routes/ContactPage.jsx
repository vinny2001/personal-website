import Container from 'components/layout/Container';
import { Reveal } from 'components/motion/Reveal';
import PageMeta from 'components/seo/PageMeta';
import PageHeader from 'components/ui/PageHeader';
import SectionHeader from 'components/ui/SectionHeader';
import SocialLinks from 'components/ui/SocialLinks';
import contact from 'content/contact';

import ContactForm from '../components/ContactForm';

/** `/contact` — a form (sent through EmailJS), plus what I'm drawn to and where to find me. */
const ContactPage = () => (
  <>
    <PageMeta title="Contact" description={contact.description} />
    <PageHeader
      title={
        <>
          {contact.title} <em className="text-accent">{contact.emphasis}</em>
        </>
      }
      lede={contact.lede}
    />

    <Container className="grid gap-16 lg:grid-cols-12 lg:gap-x-12">
      <section aria-labelledby="contact-form-heading" className="lg:col-span-7">
        <SectionHeader id="contact-form-heading" title={contact.form.headline} className="mb-9" />
        <ContactForm />
      </section>

      <aside
        aria-label="About my interests and other places to find me"
        className="space-y-14 lg:col-span-4 lg:col-start-9"
      >
        <Reveal as="section" aria-labelledby="contact-interests-heading">
          <SectionHeader
            id="contact-interests-heading"
            kicker={contact.interests.kicker}
            title={contact.interests.title}
          />
          <p className="mt-5 text-ink-soft">{contact.interests.blurb}</p>
          {contact.interests.groups.map((group) => (
            <div key={group.title} className="mt-7">
              <h3 className="kicker">{group.title}</h3>
              <ul className="mt-2 divide-y border-y">
                {group.items.map((item) => (
                  <li key={item} className="py-2.5 text-ink">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Reveal>

        <Reveal as="section" delay={0.1} aria-labelledby="contact-elsewhere-heading">
          <SectionHeader
            id="contact-elsewhere-heading"
            kicker={contact.elsewhereKicker}
            title={contact.elsewhereTitle}
          />
          <SocialLinks showLabels className="mt-5 flex-col gap-3 text-lg" />
        </Reveal>
      </aside>
    </Container>
  </>
);

export default ContactPage;

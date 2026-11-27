import { useId, useState } from 'react';

import { ChevronDown } from 'lucide-react';

import { Reveal } from 'components/motion/Reveal';
import { blogPage } from 'content/blog/page';

import CollapsePanel from './CollapsePanel';
import PostList from './PostList';

/**
 * One category on /blog: the name (a disclosure button inside the <h2>), post
 * count and blurb in a left column, the ruled post rows on the right.
 *
 * The whole group can be collapsed from its heading. Long groups stay
 * condensed: only the first `blogPage.initialVisible` posts show until
 * "Show N more" is used. Hidden rows are unmounted (out of the a11y tree).
 */
const CategoryGroup = ({ group, headingId, className = '' }) => {
  const [open, setOpen] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const panelId = useId();
  const moreId = useId();

  const count = group.posts.length;
  const head = group.posts.slice(0, blogPage.initialVisible);
  const rest = group.posts.slice(blogPage.initialVisible);

  return (
    <section
      aria-labelledby={headingId}
      className={`border-t lg:grid lg:grid-cols-12 lg:gap-x-8 ${className}`.trim()}
    >
      <Reveal className="pt-8 lg:col-span-4 lg:pr-6 lg:pt-9">
        <p className="kicker">
          {count} {count === 1 ? 'post' : 'posts'}
        </p>
        <h2 className="mt-2 font-display text-3xl font-normal leading-none tracking-tight text-ink sm:text-4xl">
          <button
            type="button"
            id={headingId}
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((value) => !value)}
            className="group -ml-1 inline-flex min-h-11 items-center gap-3 px-1 text-left transition-colors duration-200 hover:text-accent"
          >
            {group.name}
            <ChevronDown
              aria-hidden="true"
              strokeWidth={1.75}
              className={`size-5 shrink-0 text-ink-muted transition-transform duration-300 ease-out-expo group-hover:text-accent ${open ? 'rotate-180' : ''}`}
            />
          </button>
        </h2>
        {group.description && (
          <p className="mt-4 max-w-[32ch] text-sm leading-relaxed text-ink-muted">
            {group.description}
          </p>
        )}
      </Reveal>

      <div className="lg:col-span-8">
        <CollapsePanel id={panelId} open={open}>
          <PostList posts={head} />
          {rest.length > 0 && (
            <>
              <CollapsePanel id={moreId} open={expanded} className="border-t">
                <PostList posts={rest} />
              </CollapsePanel>
              <button
                type="button"
                aria-expanded={expanded}
                aria-controls={moreId}
                onClick={() => setExpanded((value) => !value)}
                className="kicker group inline-flex min-h-11 items-center gap-2 border-t pr-2 transition-colors duration-200 hover:text-ink"
              >
                {expanded ? blogPage.showFewer : blogPage.showMore(rest.length)}
                <ChevronDown
                  aria-hidden="true"
                  strokeWidth={1.75}
                  className={`size-4 transition-transform duration-300 ease-out-expo ${expanded ? 'rotate-180' : ''}`}
                />
              </button>
            </>
          )}
        </CollapsePanel>
      </div>
    </section>
  );
};

export default CategoryGroup;

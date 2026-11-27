/**
 * Headline facts as oversized serif figures over mono captions, separated by
 * hairlines. A real <dl>: the caption is the term, the figure its value (the
 * figure is pulled visually first with `order-first`).
 */
const FactList = ({ id, title, facts }) => (
  <>
    <h3 id={id} className="kicker">
      {title}
    </h3>
    <dl className="mt-4 divide-y border-y">
      {facts.map(({ number, label }) => (
        <div key={label} className="flex items-baseline gap-5 py-5 lg:flex-col lg:gap-3 lg:py-7">
          <dd className="order-first w-28 shrink-0 font-display text-5xl leading-none tracking-tight text-ink sm:w-36 sm:text-6xl lg:w-auto lg:text-7xl">
            {number}
          </dd>
          <dt className="kicker">{label}</dt>
        </div>
      ))}
    </dl>
  </>
);

export default FactList;

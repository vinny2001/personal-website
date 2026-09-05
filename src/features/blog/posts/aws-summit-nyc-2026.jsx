export const meta = {
  slug: 'aws-summit-nyc-2026',
  title: 'AWS Summit NYC 2026: The Year Agentic AI Grew Up',
  date: '2026-06-17',
  category: "This Year's Goals",
  tags: ['Research', 'AWS', 'Conference', 'Agentic AI', 'Software Engineering', 'Cloud Computing'],
  excerpt:
    'Notes from the Javits Center: the AWS NYC Summit was wall-to-wall agentic AI. Three takeaways on why guardrails come before power, how agents are collapsing the gap between product and engineering, and why humans-in-the-loop are non-negotiable.',
  readingTime: '6 min read',
};

const AwsSummitNYC2026 = () => (
  <article>
    <figure className="post-figure post-figure--portrait">
      <img
        src="/images/aws-summit-nyc-2026-hero.jpg"
        alt="AWS Summit New York City banner hanging in the glass atrium of the Javits Center"
        className="post-figure__img"
      />
    </figure>

    <h2>Quick summary</h2>
    <p>
      I spent June 17th at the{' '}
      <a
        href="https://aws.amazon.com/events/summits/new-york/"
        target="_blank"
        rel="noopener noreferrer"
      >
        AWS Summit in New York City
      </a>
      , and the through-line was right there in the program:{' '}
      <em>&quot;new agentic AI capabilities across work, development, and security.&quot;</em>{' '}
      Dr. Swami Sivasubramanian (VP of Agentic AI at AWS) and Southwest Airlines CIO Lauren Woods
      headlined a day where almost every keynote, breakout, and booth was about{' '}
      <strong>agentic AI</strong> — systems that don&apos;t just answer, but plan, call tools, and
      take action on your behalf. The new services (Amazon Quick, AWS Context, Bedrock AgentCore,
      AWS Continuum, Kiro Mobile, AWS Transform, the AWS DevOps Agent) all point the same direction:
      making it fast to build agents that are grounded in real business data and safe to let loose.
    </p>
    <p>
      What stuck with me wasn&apos;t any single launch. It was three ideas that showed up again and
      again, from the mainstage down to hallway conversations.
    </p>

    <blockquote>
      <strong>TL;DR</strong> — Agentic AI is production-ready, but only when you build the fences
      before you turn on the horsepower, treat agents as the connective tissue between product and
      engineering, and keep a human in the loop for the calls that actually matter.
    </blockquote>

    <h2>Three takeaways</h2>

    <h3>1. AI needs guardrails first, power second</h3>
    <p>
      The most memorable demo of the day was a cautionary tale. An &quot;Agentic Refund
      Automation&quot; reference build — think of it as Amazon&apos;s payment-ops assistant, wired
      into DynamoDB streams, Lambda triggers, and a Bedrock agent that can look up runbooks and file
      incident reports — was walked through failure mode by failure mode. The lesson: when the agent
      is allowed to read user-supplied text <em>and</em> take privileged actions in the same loop,
      <strong> prompt injection stops being a party trick.</strong> Crafted input from a customer-
      facing field nudged the payment workflow into carrying out actions no one intended. The fix
      wasn&apos;t a smarter model — it was scoping tool permissions, separating the untrusted input
      channel from the action channel, and putting hard limits on what the agent can do without
      sign-off.
    </p>
    <figure className="post-figure">
      <img
        src="/images/aws-summit-nyc-2026-keynote.jpg"
        alt="Conference mainstage with a slide reading Telemetry, Context, Reasoning, Actions"
        className="post-figure__img"
      />
      <figcaption className="post-figure__caption">
        Telemetry → Context → Reasoning → Actions. Every stage in an agent loop is a place a
        guardrail has to live.
      </figcaption>
    </figure>
    <p>
      The security vendors are leaning into this hard. Wiz showed a three-agent model that treats
      security as a closed loop: a <strong>Red / offensive agent</strong> that probes the environment
      through the lens of an external adversary and generates realistic attack hypotheses, a{' '}
      <strong>Blue / defensive agent</strong> that automates threat hunting and validates alerts
      against full telemetry, and a <strong>Green / resolution agent</strong> that turns confirmed
      findings into prioritized remediation and drives down mean-time-to-remediation. Offense sharpens
      detection, defense validates what actually matters, remediation feeds back into the next round
      of offense. AWS pitched the same philosophy at the platform level with{' '}
      <a
        href="https://aws.amazon.com/blogs/security/introducing-aws-continuum-security-at-machine-speed/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <strong>AWS Continuum</strong>
      </a>
      , a security-and-observability agentic platform that builds threat models directly from your
      code in real time as it changes.
    </p>
    <p>
      Takeaway: the interesting engineering in agentic systems isn&apos;t the prompt. It&apos;s the
      blast radius.
    </p>

    <h3>2. Agentic AI bridges the gap between product and engineering</h3>
    <p>
      The launch I&apos;ll be watching most closely is{' '}
      <a href="https://aws.amazon.com/quick/" target="_blank" rel="noopener noreferrer">
        <strong>Amazon Quick</strong>
      </a>{' '}
      — an agentic platform for work that ingests, transforms, qualifies, analyzes, and visualizes
      data from a wide range of sources, and its companion{' '}
      <a
        href="https://aws.amazon.com/blogs/machine-learning/context-intelligence-for-your-data-and-ai-agents-at-scale/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <strong>AWS Context</strong>
      </a>
      , which provides context intelligence for all data and agents at scale. Context builds a{' '}
      <strong>self-learning knowledge graph</strong> that reasons at the graph level over both
      structured and unstructured data, with Iceberg-native metadata, so agents can ask questions
      across sources that were never designed to talk to each other.
    </p>
    <p>
      Why that matters: the expensive gap on most teams isn&apos;t writing code — it&apos;s the
      translation layer between &quot;what the business needs&quot; and &quot;what the system does.&quot;
      When an agent can pull business context, requirements, and data sources into one place, the
      product manager&apos;s intent and the engineer&apos;s implementation start converging on the
      same artifact. A few other announcements reinforced the theme:
    </p>
    <ul>
      <li>
        <a href="https://kiro.dev/" target="_blank" rel="noopener noreferrer">
          <strong>Kiro</strong>
        </a>
        , the agentic IDE, now has <strong>Kiro Mobile</strong> on iOS — the focus is the entire
        end-to-end system: integrating business logic and requirements, producing solutions, and
        reducing technical debt rather than just autocompleting functions.
      </li>
      <li>
        <a
          href="https://aws.amazon.com/transform/continuous-modernization/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <strong>AWS Transform</strong>
        </a>{' '}
        does continuous modernization — keeping a codebase current behind the scenes so modernization
        stops being a quarterly project.
      </li>
      <li>
        The{' '}
        <a href="https://aws.amazon.com/devops-agent/" target="_blank" rel="noopener noreferrer">
          <strong>AWS DevOps Agent</strong>
        </a>{' '}
        picked up a release-management feature, pushing agents further into the delivery pipeline,
        not just the editor.
      </li>
    </ul>
    <p>
      Takeaway: the org chart line between &quot;defines the problem&quot; and &quot;builds the
      solution&quot; is getting blurry, and that&apos;s mostly a good thing.
    </p>

    <h3>3. Agents aren&apos;t capable without humans</h3>
    <figure className="post-figure post-figure--portrait">
      <img
        src="/images/aws-summit-nyc-2026-robot.jpg"
        alt="Vincenzo D'Aria standing next to a humanoid robot on the AWS Summit expo floor"
        className="post-figure__img"
      />
      <figcaption className="post-figure__caption">
        The expo floor was full of autonomy demos — and every serious one had a person in the loop.
      </figcaption>
    </figure>
    <p>
      For all the autonomy on display, the mature guidance was consistent:{' '}
      <strong>humans-in-the-loop are what make agent workflows actually work.</strong> People keep
      agents inside their execution guardrails, catch context drift before it compounds, and approve
      the irreversible steps. Just as importantly, a human checkpoint is what makes the whole thing{' '}
      <strong>auditable</strong> — you need a record of who approved what, and why, for compliance and
      legal reasons long before you need it for peace of mind.
    </p>
    <p>
      Even the tooling built for speed assumes this.{' '}
      <a href="https://aws.amazon.com/bedrock/agentcore/" target="_blank" rel="noopener noreferrer">
        <strong>Bedrock AgentCore</strong>
      </a>{' '}
      is designed to take you from idea to working agent in minutes with no orchestration or
      infrastructure
      setup, any model you want, plus web search that grounds agents in current, accurate
      information without data or queries ever leaving AWS, and <strong>Bedrock Managed Knowledge
      Bases</strong> for fully managed RAG over enterprise data. Fast to stand up — and still meant to
      run with a person watching the parts that count.
    </p>
    <p>
      Takeaway: &quot;autonomous&quot; is a spectrum, and the right amount of human is a design
      decision, not a failure to automate.
    </p>

    <h2>What I&apos;m taking back to work</h2>
    <ul>
      <li>
        Audit any agent that touches both untrusted input and privileged actions — separate the
        channels, scope the tool permissions, cap what runs without approval.
      </li>
      <li>
        Treat business context as infrastructure. A knowledge graph or well-maintained context layer
        is what lets agents build the right thing, not just a thing.
      </li>
      <li>
        Design the human checkpoints deliberately: which steps need approval, what gets logged, and
        who signs off — before shipping, not after the incident review.
      </li>
    </ul>

    <h2>My call to action</h2>
    <p>
      If you&apos;re building with agents right now, start from the guardrails and work outward. Map
      the blast radius of every tool your agent can call, decide where a human has to say yes, and
      make sure every one of those decisions leaves a trail. The power is already here and it&apos;s
      cheap to access — the differentiator in 2026 is whether you can deploy it safely. I&apos;d love
      to compare notes if you&apos;re working through the same problems.
    </p>
  </article>
);

export default AwsSummitNYC2026;

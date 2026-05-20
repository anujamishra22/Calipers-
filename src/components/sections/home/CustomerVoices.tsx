import { Heart, MessageCircle, Repeat2, BarChart2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Tweet = {
  name: string;
  handle: string;
  role: string;
  initials: string;
  avatarBg: string;
  avatarText: string;
  verified?: boolean;
  body: React.ReactNode;
  date: string;
  replies: string;
  reposts: string;
  likes: string;
  views: string;
  variant?: "light" | "dark" | "accent";
  colSpan: 4 | 5 | 6 | 7 | 8;
};

const COL_SPAN_CLASS: Record<Tweet["colSpan"], string> = {
  4: "sm:col-span-6 lg:col-span-4",
  5: "sm:col-span-6 lg:col-span-5",
  6: "sm:col-span-6 lg:col-span-6",
  7: "sm:col-span-12 lg:col-span-7",
  8: "sm:col-span-12 lg:col-span-8",
};

const TWEETS: Tweet[] = [
  {
    name: "Sofia Reyes",
    handle: "sofreyes",
    role: "Director of Data, CloudPeak Analytics",
    initials: "SR",
    avatarBg: "var(--color-accent)",
    avatarText: "#fff",
    verified: true,
    body: (
      <>
        Our release cycle just dropped from <strong>6 weeks to 12 days</strong>{" "}
        after rolling out the @calipersai MLOps stack. The eval gates and rollout
        flags alone paid for the engagement. Honestly unreasonable.
      </>
    ),
    date: "9:47 AM · Mar 14",
    replies: "84",
    reposts: "612",
    likes: "2.1K",
    views: "48.3K",
    variant: "light",
    colSpan: 7,
  },
  {
    name: "Daniel Chen",
    handle: "danchen",
    role: "CTO, Helix Health",
    initials: "DC",
    avatarBg: "#0a0a08",
    avatarText: "#fff",
    verified: true,
    body: (
      <>
        Took our HIPAA-compliant copilot from prototype to live in{" "}
        <strong>7 weeks</strong>. Zero PHI leakage in red-team. The compliance
        layer @calipersai ships with is built right.
      </>
    ),
    date: "11:18 AM · May 1",
    replies: "37",
    reposts: "208",
    likes: "1.4K",
    views: "22.1K",
    variant: "light",
    colSpan: 5,
  },
  {
    name: "Priya Natarajan",
    handle: "priyabuilds",
    role: "Supply Chain Director, Forsight",
    initials: "PN",
    avatarBg: "#fff",
    avatarText: "#0047FF",
    verified: true,
    body: (
      <>
        Cleared <strong>$4M</strong> in excess inventory after deploying their
        forecasting models. <strong>2% error margin</strong> on Q3 demand. Our
        ops team thinks we cheated.
      </>
    ),
    date: "4:02 PM · Feb 6",
    replies: "129",
    reposts: "844",
    likes: "3.6K",
    views: "92.4K",
    variant: "accent",
    colSpan: 4,
  },
  {
    name: "Aisha Khan",
    handle: "aishak",
    role: "Head of AI, Vector Logistics",
    initials: "AK",
    avatarBg: "#FF6B35",
    avatarText: "#fff",
    body: (
      <>
        @calipersai shipped an LLM gateway, observability, and cost guardrails
        before our internal team finished kickoff. We just stopped fighting the
        platform and started building.
      </>
    ),
    date: "3:33 PM · Apr 11",
    replies: "52",
    reposts: "318",
    likes: "1.7K",
    views: "31.7K",
    variant: "light",
    colSpan: 4,
  },
  {
    name: "Marcus Webb",
    handle: "marcuswebb",
    role: "VP Ops, Northwind Bank",
    initials: "MW",
    avatarBg: "#1f2937",
    avatarText: "#fff",
    verified: true,
    body: (
      <>
        We replaced <strong>3 vendors</strong> with Calipers One.
        Workflows + inference + analytics in one pane. CFO is happy.
        Engineers are happy. Rare combo.
      </>
    ),
    date: "8:09 AM · Mar 22",
    replies: "98",
    reposts: "474",
    likes: "2.5K",
    views: "61.0K",
    variant: "dark",
    colSpan: 4,
  },
  {
    name: "Arjun Mehta",
    handle: "arjunbuilds",
    role: "VP Engineering, Nexus Corp",
    initials: "AM",
    avatarBg: "#0047FF",
    avatarText: "#fff",
    verified: true,
    body: (
      <>
        Eight weeks. From zero to a production RAG assistant. The eval loop and
        release discipline @calipersai brought is the difference between a cool
        demo and something we can actually ship.
      </>
    ),
    date: "2:14 PM · Apr 28",
    replies: "143",
    reposts: "921",
    likes: "4.2K",
    views: "118K",
    variant: "light",
    colSpan: 5,
  },
  {
    name: "Lina Park",
    handle: "linapark",
    role: "Founder, Strata AI",
    initials: "LP",
    avatarBg: "#a855f7",
    avatarText: "#fff",
    body: (
      <>
        If you&apos;re going from prototype → production and you hate yak-shaving
        infra, hire @calipersai. They obsess over the boring parts so we don&apos;t
        have to. 10/10 would deploy again.
      </>
    ),
    date: "6:55 PM · Apr 19",
    replies: "61",
    reposts: "287",
    likes: "1.9K",
    views: "27.5K",
    variant: "light",
    colSpan: 7,
  },
];

function XLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M18.244 2H21l-6.51 7.43L22 22h-6.778l-4.785-6.118L4.8 22H2.043l6.96-7.95L2 2h6.95l4.32 5.61L18.244 2zm-2.378 18h1.886L7.187 4H5.18l10.686 16z" />
    </svg>
  );
}

function VerifiedBadge({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-label="Verified account"
    >
      <path
        fill="#0047FF"
        d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484z"
      />
      <path
        fill="#fff"
        d="m15.3 9.8-4.59 4.6-2-2-1.42 1.42 3.42 3.42 6-6L15.3 9.8z"
      />
    </svg>
  );
}

function TweetCard({ tweet }: { tweet: Tweet }) {
  const isDark = tweet.variant === "dark";
  const isAccent = tweet.variant === "accent";

  const baseColor = isDark
    ? "bg-[#0e1116] text-white"
    : isAccent
      ? "bg-[var(--color-accent)] text-white"
      : "bg-white text-[var(--color-void)]";

  const mutedColor = isDark
    ? "text-white/55"
    : isAccent
      ? "text-white/85"
      : "text-[var(--color-gray-500)]";

  const dividerColor = isDark
    ? "border-white/10"
    : isAccent
      ? "border-white/25"
      : "border-black/10";

  const hoverHighlight = isDark
    ? "hover:bg-[#161a22]"
    : isAccent
      ? "hover:bg-[#0035cc]"
      : "hover:bg-[#fafafa]";

  return (
    <article
      className={cn(
        "group relative col-span-12 flex flex-col self-start border-2 border-[var(--color-void)] p-3.5 shadow-[4px_4px_0px_var(--color-void)] transition-[transform,box-shadow,background-color] duration-150 ease-out hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0px_var(--color-void)] motion-reduce:transition-none sm:p-4",
        COL_SPAN_CLASS[tweet.colSpan],
        baseColor,
        hoverHighlight,
      )}
    >
      <header className="flex items-start gap-2">
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center border-2 border-[var(--color-void)] text-xs font-bold"
          style={{
            background: tweet.avatarBg,
            color: tweet.avatarText,
            fontFamily: "var(--font-mono)",
          }}
          aria-hidden
        >
          {tweet.initials}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1">
            <span className="truncate font-bold">{tweet.name}</span>
            {tweet.verified && <VerifiedBadge className="h-4 w-4 shrink-0" />}
          </div>
          <div className={cn("text-mono-sm truncate", mutedColor)}>
            @{tweet.handle}
          </div>
        </div>
        <XLogo
          className={cn(
            "h-4 w-4 shrink-0 opacity-80",
            isAccent ? "text-white" : isDark ? "text-white" : "text-[var(--color-void)]",
          )}
        />
      </header>

      <p
        className={cn(
          "mt-2.5 text-sm leading-snug sm:text-[15px]",
          isAccent ? "text-white" : "",
        )}
      >
        {tweet.body}
      </p>

      <p className={cn("mt-2 text-mono-sm", mutedColor)}>{tweet.role}</p>

      <div className="mt-3">
        <div className={cn("text-mono-sm", mutedColor)}>{tweet.date}</div>
        <div
          className={cn(
            "mt-2 flex items-center justify-between border-t pt-2 text-mono-sm",
            mutedColor,
            dividerColor,
          )}
        >
          <span className="flex items-center gap-1">
            <MessageCircle className="h-3.5 w-3.5" />
            {tweet.replies}
          </span>
          <span className="flex items-center gap-1">
            <Repeat2 className="h-3.5 w-3.5" />
            {tweet.reposts}
          </span>
          <span className="flex items-center gap-1">
            <Heart className="h-3.5 w-3.5" />
            {tweet.likes}
          </span>
          <span className="flex items-center gap-1">
            <BarChart2 className="h-3.5 w-3.5" />
            {tweet.views}
          </span>
        </div>
      </div>
    </article>
  );
}

export function CustomerVoices() {
  return (
    <section className="relative bg-[var(--color-void)] py-6 text-white md:py-8">
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.4)_1px,transparent_1px)] [background-size:40px_40px]" />

      <div className="relative mx-auto max-w-[var(--container-max)] px-4 md:px-[var(--container-padding)]">
        <div className="mb-6 flex flex-col items-start gap-3 md:mb-8 md:flex-row md:items-end md:justify-between md:gap-4">
          <div className="max-w-2xl">
            <p className="raw-badge border-white text-white">VOICES // 2026</p>
            <h2
              className="mt-3 text-display-lg uppercase tracking-tight text-white md:mt-4"
              style={{ fontSize: "24px", lineHeight: 1.15 }}
            >
              SHIPPED. PROVEN.
              <br />
              <span className="text-[var(--color-accent)]">POSTED ABOUT.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-white/70 md:text-[15px]">
            What builders, operators, and engineering leaders say about working
            with Calipers — pulled from the timeline, lightly redacted.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-2 md:gap-3">
          {TWEETS.map((tweet) => (
            <TweetCard key={tweet.handle} tweet={tweet} />
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/15 pt-4 text-mono-sm text-white/55 md:mt-8 md:pt-5">
          <span>1,200+ engineering teams • 99.9% SLA • 50+ integrations</span>
          <span className="tracking-widest">— FROM PROTOTYPE TO PRODUCTION —</span>
        </div>
      </div>
    </section>
  );
}

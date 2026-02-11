<template>
  <div class="min-h-screen bg-ox-dark text-white overflow-x-hidden">
    <!-- Mouse glow layer -->
    <div
      class="pointer-events-none fixed inset-0 z-0"
      :style="{ background: glowBg }"
    ></div>

    <!-- Top ambient glow -->
    <div
      class="pointer-events-none fixed left-1/2 -top-64 z-0 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-ox-red/15 blur-3xl"
    ></div>

    <!-- Header -->
    <header
      class="sticky top-0 z-50 border-b border-white/10 bg-ox-dark/70 backdrop-blur"
    >
      <div
        class="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between"
      >
      <!-- LOGO -->
        <a href="#" class="flex items-center gap-3">
          <img
            :src="OrdonexLogo"
            alt="Ordonex logo"
            class="h-10 w-10 rounded-2xl object-contain bg-black/20 p-1 ring-1 ring-white/10
                   transition hover:scale-105 hover:ring-ox-red/50
                   hover:shadow-[0_0_30px_rgba(208,0,0,0.35)]"
          />
          <div class="leading-tight">
            <div class="text-sm font-extrabold tracking-tight">
              Ordonex Community
            </div>
            <div class="text-xs text-white/60">Play • Compete • Grow</div>
          </div>
        </a>

        <nav class="hidden md:flex items-center gap-6 text-sm">
          <a
            v-for="n in nav"
            :key="n.href"
            :href="n.href"
            class="text-white/70 hover:text-white transition"
            @click.prevent="scrollTo(n.href)"
          >
            {{ n.label }}
          </a>
        </nav>

        <div class="flex items-center gap-2">
          <a href="#join" class="hidden sm:inline-flex">
            <BaseButton variant="secondary">See How to Join</BaseButton>
          </a>
          <a href="#join">
            <BaseButton>Join Now</BaseButton>
          </a>
        </div>
      </div>
    </header>

    <!-- Main -->
    <main class="relative z-10" @mousemove="onMouseMove">
      <!-- HERO -->
      <section class="mx-auto max-w-6xl px-4 pt-16 sm:pt-20">
        <div class="grid lg:grid-cols-2 items-center gap-10">
          <div>
            <div class="mb-4 flex flex-wrap items-center gap-2">
              <Chip>Weekly Tournaments</Chip>
              <Chip>Watch Parties</Chip>
              <Chip>Rewards & Ranks</Chip>
            </div>

            <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight reveal">
              A gaming community that feels like a
              <span class="text-ox-red">real squad</span>.
            </h1>

            <p class="mt-4 max-w-xl text-base leading-relaxed text-white/70 reveal">
              Find teammates, level up your skills, and stay consistent with events you’ll actually show up for —
              online and in gaming centers.
            </p>

            <div class="mt-7 flex flex-wrap gap-3 reveal">
              <BaseButton @click="openLink(discordLink)">Join Discord</BaseButton>
              <BaseButton variant="secondary" @click="scrollTo('#events')">
                Explore Events
              </BaseButton>
              <button
                class="text-white/70 hover:text-white transition text-sm font-semibold"
                @click="scrollTo('#community')"
              >
                See the vibe →
              </button>
            </div>

            <div class="mt-8 grid grid-cols-3 gap-3 sm:gap-4 reveal">
              <Stat label="Active members" value="2,400+"></Stat>
              <Stat label="Monthly events" value="18+"></Stat>
              <Stat label="Prize pools" value="JOD 5k+"></Stat>
            </div>
          </div>

          <!-- HERO VISUAL -->
          <div class="relative reveal">
            <div
              class="grain relative overflow-hidden rounded-[2.25rem] bg-white/5 p-6 ring-1 ring-white/10"
            >
              <div class="absolute inset-0 opacity-70">
                <div
                  class="absolute -left-28 top-10 h-80 w-80 rounded-full bg-ox-red/20 blur-3xl"
                ></div>
                <div
                  class="absolute -right-28 bottom-10 h-80 w-80 rounded-full bg-white/10 blur-3xl"
                ></div>
              </div>

              <div class="relative">
                <div class="flex items-center justify-between">
                  <div>
                    <div class="text-sm font-semibold">Live Queue</div>
                    <div class="mt-1 text-xs text-white/60">
                      Find teammates in under 60 seconds
                    </div>
                  </div>
                  <span
                    class="rounded-full bg-green-500/15 px-3 py-1 text-xs font-semibold text-green-300 ring-1 ring-green-500/20"
                  >
                    Online
                  </span>
                </div>

                <div class="mt-6 grid gap-3">
                  <div
                    v-for="row in liveQueue"
                    :key="row.game"
                    class="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3 ring-1 ring-white/10"
                  >
                    <div>
                      <div class="text-sm font-semibold">{{ row.game }}</div>
                      <div class="text-xs text-white/60">{{ row.mode }}</div>
                    </div>
                    <span class="text-xs font-semibold text-red-200">
                      Need: {{ row.need }}
                    </span>
                  </div>
                </div>

                <div class="mt-6 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                  <div class="flex items-center justify-between">
                    <div class="text-sm font-semibold">Next Event</div>
                    <div class="text-xs text-white/60">Tonight • 9:30PM</div>
                  </div>
                  <div class="mt-2 text-xs text-white/70">
                    Watch Party + Mini challenges + giveaways
                  </div>
                  <div class="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/10">
                    <div class="h-full w-[68%] rounded-full bg-ox-red"></div>
                  </div>
                  <div class="mt-2 text-xs text-white/60">68% spots filled</div>
                </div>
              </div>
            </div>

            <div
              class="pointer-events-none absolute -bottom-6 -left-6 h-24 w-24 rounded-3xl bg-ox-red/15 blur-2xl"
            ></div>
          </div>
        </div>
      </section>

      <!-- FEATURES -->
      <section id="features" class="mx-auto max-w-6xl px-4 pt-20">
        <SectionTitle
          eyebrow="Why people stay"
          title="Designed to keep you active, not just “joined”."
          desc="Events + structure + rewards. Everything pushes members to show up, improve, and meet the right people."
        ></SectionTitle>

        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon="🏆"
            title="Tournaments that feel serious"
            desc="Clean brackets, rules, scheduling, and announcements—no chaos. Play weekly and climb ranks."
          ></FeatureCard>

          <FeatureCard
            icon="🤝"
            title="Team finding that actually works"
            desc="Role-based LFG, verified ranks, and quick matches. Meet people who play your style."
          ></FeatureCard>

          <FeatureCard
            icon="🎥"
            title="Watch parties & hype nights"
            desc="Pre-iftar / pre-suhour sessions, streams, live chat, and mini-games to keep it fun."
          ></FeatureCard>

          <FeatureCard
            icon="🎁"
            title="Rewards & community points"
            desc="Earn points for participation, wins, helping others, or creating content. Redeem perks."
          ></FeatureCard>

          <FeatureCard
            icon="🧠"
            title="Skill growth sessions"
            desc="Short coaching blocks, VOD reviews, aim routines, and map guides—simple and repeatable."
          ></FeatureCard>

          <FeatureCard
            icon="🛡️"
            title="Good vibes moderation"
            desc="Clear rules, anti-toxicity enforcement, and a culture that protects new members."
          ></FeatureCard>
        </div>
      </section>

      <!-- EVENTS -->
      <section id="events" class="mx-auto max-w-6xl px-4 pt-20">
        <SectionTitle
          eyebrow="Calendar"
          title="A schedule that makes people come back."
          desc="Your community should feel alive every week. Here’s a clean way to present it."
        ></SectionTitle>

        <div class="grid gap-4 lg:grid-cols-3">
          <EventCard
            title="Weekly Tournament"
            meta="Every Thu • 8:00PM"
            tag="Competitive"
            :bullets="['Bracket + rules', 'Prize pool', 'Highlights clip']"
            @reserve="openLink(eventsLink)"
          ></EventCard>

          <EventCard
            title="Watch Party Night"
            meta="Sat • 10:30PM"
            tag="Social"
            :bullets="['Live chat', 'Mini challenges', 'Giveaways']"
            @reserve="openLink(eventsLink)"
          ></EventCard>

          <EventCard
            title="Chill Survival Session"
            meta="Mon • 9:00PM"
            tag="Casual"
            :bullets="['3-hour vibe', 'Friends-friendly', 'No grind pressure']"
            @reserve="openLink(eventsLink)"
          ></EventCard>
        </div>
      </section>

      <!-- COMMUNITY -->
      <section id="community" class="mx-auto max-w-6xl px-4 pt-20">
        <SectionTitle
          eyebrow="Proof"
          title="People join for the events. They stay for the people."
          desc="Show testimonials like this to instantly make the page feel real."
        ></SectionTitle>

        <div class="grid gap-4 lg:grid-cols-3">
          <Testimonial
            name="Ahmad"
            role="Valorant player"
            quote="I finally found teammates who take the game seriously without being toxic."
          ></Testimonial>

          <Testimonial
            name="Sara"
            role="Community member"
            quote="Watch parties made me feel like I’m part of something—super fun and organized."
          ></Testimonial>

          <Testimonial
            name="Omar"
            role="Gaming center partner"
            quote="Their tournaments bring consistent traffic. Promotion + structure is on point."
          ></Testimonial>
        </div>
      </section>

      <!-- JOIN -->
      <section id="join" class="mx-auto max-w-6xl px-4 py-20">
        <div
          class="relative overflow-hidden rounded-[2.5rem] bg-white/5 p-8 ring-1 ring-white/10 sm:p-10 grain"
        >
          <div class="absolute inset-0">
            <div
              class="absolute -left-24 top-0 h-72 w-72 rounded-full bg-ox-red/20 blur-3xl"
            ></div>
            <div
              class="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-white/10 blur-3xl"
            ></div>
          </div>

          <div class="relative grid lg:grid-cols-2 items-center gap-8">
            <div class="reveal">
              <h3 class="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Ready to join the squad?
              </h3>
              <p class="mt-3 text-base text-white/70">
                Join in under a minute. Get your role, pick your games, and start showing up to events.
              </p>

              <div class="mt-6 flex flex-wrap gap-3">
                <BaseButton @click="openLink(discordLink)">Join Discord</BaseButton>
                <BaseButton variant="secondary" @click="openLink(instaLink)">
                  Follow Updates
                </BaseButton>
              </div>

              <p class="mt-4 text-xs text-white/50">
                Put your real links here: Discord + Instagram @ordonex.jo
              </p>
            </div>

            <div class="grid gap-3 sm:grid-cols-2 reveal">
              <MiniStep k="Step 1" v="Join Discord"></MiniStep>
              <MiniStep k="Step 2" v="Choose roles + games"></MiniStep>
              <MiniStep k="Step 3" v="Join weekly events"></MiniStep>
              <MiniStep k="Step 4" v="Earn points & perks"></MiniStep>
            </div>
          </div>
        </div>
      </section>

      <!-- FAQ -->
      <section id="faq" class="mx-auto max-w-6xl px-4 pb-20">
        <SectionTitle
          eyebrow="FAQ"
          title="Quick answers (so people don’t bounce)."
          desc="Keep it short. Remove friction. Then push them to the join button."
        ></SectionTitle>

        <div class="mx-auto grid max-w-3xl gap-3">
          <FAQItem
            v-for="(item, idx) in faqs"
            :key="item.q"
            :q="item.q"
            :a="item.a"
            :open="faqOpen === idx"
            @toggle="faqOpen = faqOpen === idx ? null : idx"
          ></FAQItem>
        </div>
      </section>

      <footer class="border-t border-white/10 bg-black/30">
        <div
          class="mx-auto max-w-6xl px-4 py-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <div class="text-sm text-white/60">
            © {{ year }} Ordonex • Built with ❤️ in Jordan
          </div>
          <div class="flex items-center gap-5 text-sm">
            <a
              class="text-white/60 hover:text-white"
              href="#features"
              @click.prevent="scrollTo('#features')"
              >Features</a
            >
            <a
              class="text-white/60 hover:text-white"
              href="#events"
              @click.prevent="scrollTo('#events')"
              >Events</a
            >
            <a
              class="text-white/60 hover:text-white"
              href="#join"
              @click.prevent="scrollTo('#join')"
              >Join</a
            >
          </div>
        </div>
      </footer>
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount, ref } from "vue";

import OrdonexLogo from "./assets/Ordonex_Logo.png";

import BaseButton from "./components/BaseButton.vue";
import Chip from "./components/Chip.vue";
import Stat from "./components/Stat.vue";
import SectionTitle from "./components/SectionTitle.vue";
import FeatureCard from "./components/FeatureCard.vue";
import EventCard from "./components/EventCard.vue";
import Testimonial from "./components/Testimonial.vue";
import MiniStep from "./components/MiniStep.vue";
import FAQItem from "./components/FAQItem.vue";

/** Links (replace these) */
const discordLink = "https://discord.gg/REPLACE_ME";
const instaLink = "https://instagram.com/ordonex.jo";
const eventsLink = "https://instagram.com/ordonex.jo";

/** Nav */
const nav = [
  { label: "Features", href: "#features" },
  { label: "Events", href: "#events" },
  { label: "Community", href: "#community" },
  { label: "FAQ", href: "#faq" },
];

/** Hero visual mock */
const liveQueue = [
  { game: "Valorant", mode: "5v5 Ranked", need: "1 Sentinel" },
  { game: "FC 25", mode: "2v2", need: "1 Partner" },
  { game: "Fortnite", mode: "Trios", need: "1 IGL" },
];

/** FAQ */
const faqs = [
  {
    q: "Is it free to join?",
    a: "Yes. Some tournaments may have optional entry fees depending on prize pools, but community access is free.",
  },
  {
    q: "Do I need to be a pro player?",
    a: "No. We run both competitive and casual events. You’ll find people at your level.",
  },
  {
    q: "Where do events happen?",
    a: "Online (Discord + streams) and sometimes in partnered gaming centers. We post schedules weekly.",
  },
  {
    q: "How do I find teammates?",
    a: "Use LFG channels by game + role. We also do weekly matchmaking sessions.",
  },
];

const faqOpen = ref(0);
const year = new Date().getFullYear();

/** Smooth scroll */
function scrollTo(hash) {
  const el = document.querySelector(hash);
  el?.scrollIntoView({ behavior: "smooth" });
}

/** Open links safely */
function openLink(url) {
  window.open(url, "_blank", "noopener,noreferrer");
}

/** Mouse glow */
const mx = ref(50);
const my = ref(50);

function onMouseMove(e) {
  mx.value = e.clientX;
  my.value = e.clientY;
}

const glowBg = computed(
  () =>
    `radial-gradient(600px circle at ${mx.value}px ${my.value}px, rgba(208,0,0,0.18), transparent 40%)`
);

/** Reveal on scroll (IntersectionObserver) */
let io;

onMounted(() => {
  const els = document.querySelectorAll(".reveal");
  io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) en.target.classList.add("show");
      });
    },
    { threshold: 0.12 }
  );
  els.forEach((el) => io.observe(el));
});

onBeforeUnmount(() => io?.disconnect());
</script>

<style>
/* Reveal animation */
.reveal {
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}
.reveal.show {
  opacity: 1;
  transform: translateY(0);
}

/* Grain overlay */
.grain {
  position: relative;
}
.grain::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)' opacity='.22'/%3E%3C/svg%3E");
  mix-blend-mode: overlay;
  opacity: 0.35;
}
</style>

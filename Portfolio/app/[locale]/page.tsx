import Hero from "@/components/sections/hero"
import StatsDashboard from "@/components/stats-dashboard"
import NowSection from "@/components/now-section"
import CodingActivityChart from "@/components/coding-activity-chart"
import ScrollReveal from "@/components/scroll-reveal"

export default function Home() {
  return (
    <div className="space-y-12 pb-12 md:space-y-16 md:pb-16">
      {/* Hero Section */}
      <ScrollReveal direction="up">
        <div className="">
          <Hero />
        </div>
      </ScrollReveal>

      {/* Now Section */}
      <ScrollReveal direction="left" delay={0.2}>
        <div className="mx-auto w-full max-w-4xl">
          <NowSection />
        </div>
      </ScrollReveal>

      {/* Coding Activity Chart */}
      <ScrollReveal direction="right" delay={0.2}>
        <div className="mx-auto w-full max-w-6xl">
          <CodingActivityChart />
        </div>
      </ScrollReveal>

      {/* Stats Dashboard */}
      <ScrollReveal direction="up" delay={0.2}>
        <div className="mx-auto w-full max-w-6xl">
          <StatsDashboard />
        </div>
      </ScrollReveal>
    </div>
  )
}

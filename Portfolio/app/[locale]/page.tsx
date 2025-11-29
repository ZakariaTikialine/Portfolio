import Hero from "@/components/sections/hero"
import StatsDashboard from "@/components/stats-dashboard"
import Testimonials from "@/components/testimonials"
import NowSection from "@/components/now-section"
import CodingActivityChart from "@/components/coding-activity-chart"
import ScrollReveal from "@/components/scroll-reveal"

export default function Home() {
  return (
    <div className="space-y-20 pb-20">
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

      {/* Testimonials */}
      <ScrollReveal direction="up" delay={0.4}>
        <div className="mx-auto w-full max-w-4xl">
          <Testimonials />
        </div>
      </ScrollReveal>
    </div>
  )
}

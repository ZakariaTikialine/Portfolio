import Hero from "@/components/sections/hero"
import StatsDashboard from "@/components/stats-dashboard"
import Testimonials from "@/components/testimonials"
import NowSection from "@/components/now-section"
import CodingActivityChart from "@/components/coding-activity-chart"
import ScrollReveal from "@/components/scroll-reveal"

export default function Home() {
  return (
    <div className="space-y-12 pb-20">
      <ScrollReveal direction="up">
        <Hero />
      </ScrollReveal>

      <ScrollReveal direction="left" delay={0.2}>
        <div className="max-w-4xl">
          <NowSection />
        </div>
      </ScrollReveal>

      <ScrollReveal direction="right" delay={0.2}>
        <div className="max-w-4xl">
          <CodingActivityChart />
        </div>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.2}>
        <div className="max-w-4xl">
          <StatsDashboard />
        </div>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.4}>
        <div className="max-w-4xl">
          <Testimonials />
        </div>
      </ScrollReveal>
    </div>
  )
}

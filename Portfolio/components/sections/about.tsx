const About = () => {
  return (
    <section id="about" className="py-20 md:py-32 border-t border-border/50">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">About Me</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-accent to-secondary rounded-full" />
        </div>

        <div className="space-y-6 text-muted-foreground leading-relaxed">
          <p>
            I'm a passionate developer and data scientist who thrives at the intersection of multiple disciplines. My
            journey combines rigorous backend engineering with thoughtful frontend design, enhanced by data-driven
            insights and machine learning innovation.
          </p>
          <p>
            What drives me is the challenge of solving complex problems elegantly. Whether I'm designing a scalable
            system, optimizing algorithms, or exploring AI applications, I approach each project with the same
            philosophy: simplicity through depth.
          </p>
          <p>
            I'm particularly fascinated by systems design, constraint satisfaction problems, and how AI can augment
            human decision-making. I believe that great software isn't just about technology—it's about understanding
            problems deeply and crafting solutions that are both powerful and intuitive.
          </p>
          <p>
            Currently, I'm deepening my expertise in Go for backend systems, exploring machine learning fundamentals,
            and continuously pushing the boundaries of what's possible with modern web technologies and AI.
          </p>
        </div>

        {/* Key highlights */}
        <div className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-border/50">
          <div className="text-center">
            <div className="text-2xl font-bold text-accent mb-1">10+</div>
            <div className="text-sm text-muted-foreground">Projects Shipped</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent mb-1">5+</div>
            <div className="text-sm text-muted-foreground">Tech Stacks</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent mb-1">∞</div>
            <div className="text-sm text-muted-foreground">Always Learning</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

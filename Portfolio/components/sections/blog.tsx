import { ArrowRight } from "lucide-react"

const Blog = () => {
  return (
    <section id="blog" className="py-20 md:py-32 border-t border-border/50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Learning Journey</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-accent to-secondary rounded-full" />
          </div>

          {/* Now Learning Widget */}
          <div className="mb-12 p-6 rounded-lg border border-accent/50 bg-accent/5 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <p className="text-sm font-semibold text-accent">Currently Exploring</p>
            </div>
            <p className="text-lg text-foreground font-medium">Go & System Design Patterns</p>
            <p className="text-sm text-muted-foreground mt-2">
              Deep diving into backend systems architecture, distributed computing concepts, and writing performant
              services in Go.
            </p>
          </div>

          {/* Blog posts placeholder */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold mb-4">Recent Posts</h3>
            {[
              {
                title: "Machine Learning Fundamentals: From Theory to Practice",
                date: "Coming Soon",
                readTime: "8 min read",
              },
              {
                title: "Building Scalable Backend Systems with Go",
                date: "Coming Soon",
                readTime: "12 min read",
              },
              {
                title: "Constraint Satisfaction Problems: Solving Real-World Optimization",
                date: "Coming Soon",
                readTime: "10 min read",
              },
            ].map((post) => (
              <article
                key={post.title}
                className="group p-4 rounded-lg border border-border/50 hover:border-accent/50 hover:bg-card/50 transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold group-hover:text-accent transition-colors">{post.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {post.date} • {post.readTime}
                    </p>
                  </div>
                  <ArrowRight
                    size={18}
                    className="text-muted-foreground group-hover:text-accent transition-colors opacity-0 group-hover:opacity-100"
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Blog

"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Github, Linkedin, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
    setFormData({ name: "", email: "", message: "" })
  }

  return (
    <section id="contact" className="py-20 md:py-32 border-t border-border/50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Let's Work Together</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-accent to-secondary rounded-full mx-auto mb-4" />
            <p className="text-muted-foreground">
              Have a project in mind or want to discuss ideas? I'd love to hear from you.
            </p>
          </div>

          {/* Contact form */}
          <form onSubmit={handleSubmit} className="space-y-6 mb-12">
            <Input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="bg-card/50 border-border/50 rounded-lg focus:border-accent focus:ring-accent/50"
              required
            />
            <Input
              type="email"
              name="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              className="bg-card/50 border-border/50 rounded-lg focus:border-accent focus:ring-accent/50"
              required
            />
            <Textarea
              name="message"
              placeholder="Tell me about your project or idea..."
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className="bg-card/50 border-border/50 rounded-lg focus:border-accent focus:ring-accent/50 resize-none"
              required
            />
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg">
              Send Message
              <Send size={18} className="ml-2" />
            </Button>
          </form>

          {/* Direct contact links */}
          <div className="p-6 rounded-lg border border-border/50 bg-card/30 backdrop-blur-sm">
            <p className="text-sm text-muted-foreground mb-4 text-center">Or reach out directly:</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:zakaria@example.com"
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-border/50 hover:border-accent/50 hover:bg-muted transition-colors"
              >
                <Mail size={18} />
                Email
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-border/50 hover:border-accent/50 hover:bg-muted transition-colors"
              >
                <Github size={18} />
                GitHub
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-border/50 hover:border-accent/50 hover:bg-muted transition-colors"
              >
                <Linkedin size={18} />
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact

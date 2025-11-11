"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Command } from "cmdk"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { usePathname } from "next/navigation"

const commands = [
  { id: "home", label: "Home", href: "/" },
  { id: "about", label: "About", href: "/about" },
  { id: "experience", label: "Experience", href: "/experience" },
  { id: "education", label: "Education", href: "/education" },
  { id: "skills", label: "Skills", href: "/skills" },
  { id: "projects", label: "Projects", href: "/projects" },
  { id: "blog", label: "Blog", href: "/blog" },
  { id: "contact", label: "Contact", href: "/contact" },
]

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = (command: () => void) => {
    setOpen(false)
    command()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="overflow-hidden p-0 shadow-lg">
        <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group]:overflow-hidden] [&_[cmdk-group-heading]]:text-xs">
          <Command.Input placeholder="Type a command or search..." />
          <Command.List className="max-h-[300px] overflow-y-auto">
            <Command.Empty>No results found.</Command.Empty>
            <Command.Group heading="Navigation">
              {commands.map((command) => (
                <Command.Item
                  key={command.id}
                  value={command.id}
                  onSelect={() =>
                    runCommand(() => {
                      router.push(command.href)
                    })
                  }
                  className={`cursor-pointer font-mono text-sm ${
                    pathname === command.href ? "bg-accent text-accent-foreground" : ""
                  }`}
                >
                  <span className="text-accent mr-2">{">"}</span>
                  {command.label}
                </Command.Item>
              ))}
            </Command.Group>
          </Command.List>
          <div className="border-t px-2 py-1.5 text-xs text-muted-foreground">
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </div>
        </Command>
      </DialogContent>
    </Dialog>
  )
}

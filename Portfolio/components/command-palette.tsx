"use client"

import { useEffect, useMemo, useState } from "react"
import { Command } from "cmdk"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useTranslations } from "next-intl"
import { usePathname, useRouter, locales } from "@/navigation"

const commandItems = [
  { id: "home", href: "/" },
  { id: "about", href: "/about" },
  { id: "experience", href: "/experience" },
  { id: "education", href: "/education" },
  { id: "skills", href: "/skills" },
  { id: "projects", href: "/projects" },
  { id: "blog", href: "/blog" },
  { id: "contact", href: "/contact" },
]

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const tNav = useTranslations("nav")
  const tCommand = useTranslations("command")
  const normalizedPath = useMemo(() => {
    const localePattern = new RegExp(`^/(?:${locales.join("|")})(?=/|$)`)
    const stripped = pathname.replace(localePattern, "")
    return stripped === "" ? "/" : stripped
  }, [pathname])

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
        <Command className="**:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:font-mono **:[[cmdk-group-heading]]:text-xs **:[[cmdk-group-heading]]:text-muted-foreground **:[[cmdk-group-heading]]:uppercase **:[[cmdk-group]]:overflow-hidden">
          <Command.Input placeholder={tCommand("placeholder")} />
          <Command.List className="max-h-[300px] overflow-y-auto">
            <Command.Empty>{tCommand("empty")}</Command.Empty>
            <Command.Group heading={tCommand("heading")}>
              {commandItems.map((command) => (
                <Command.Item
                  key={command.id}
                  value={command.id}
                  onSelect={() =>
                    runCommand(() => {
                      router.push(command.href)
                    })
                  }
                  className={`cursor-pointer font-mono text-sm ${
                    normalizedPath === command.href ? "bg-accent text-accent-foreground" : ""
                  }`}
                >
                  <span className="text-accent mr-2">{">"}</span>
                  {tNav(command.id)}
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

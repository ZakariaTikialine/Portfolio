import type { ReactNode, SVGProps } from "react"
import { cn } from "@/lib/cn"

/*
 * Custom icon set for the Cross-Section system. Every glyph sits on a 24px grid with a 1.6 stroke.
 * Several carry the amber "node", the same square the stack's trace uses, so the icons read as
 * part of this site rather than a generic library. Brand marks keep their official shapes.
 */

type IconProps = SVGProps<SVGSVGElement>

function Icon({ children, className, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={cn("size-4 shrink-0", className)}
      {...props}
    >
      {children}
    </svg>
  )
}

/** The amber square from the stack trace. */
function Node({ x, y }: { x: number; y: number }) {
  return <rect x={x} y={y} width={3} height={3} rx={0.7} className="fill-trace stroke-none" />
}

/** Leaves the page: a trace from a node out to the top-right corner. */
export function ArrowOutIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M8.5 15.5 16.5 7.5" />
      <path d="M10.5 7.5h6v6" />
      <Node x={5} y={16} />
    </Icon>
  )
}

/** Jumps further down the page. */
export function ArrowDownIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 8.5V18" />
      <path d="m7.5 13.5 4.5 4.5 4.5-4.5" />
      <Node x={10.5} y={3.5} />
    </Icon>
  )
}

/** Back to the top. */
export function ArrowUpIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 15.5V6" />
      <path d="m7.5 10.5 4.5-4.5 4.5 4.5" />
      <Node x={10.5} y={17.5} />
    </Icon>
  )
}

/** Back towards the start of the reading direction (flip in RTL). */
export function ArrowBackIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M15.5 12H6" />
      <path d="M10.5 7.5 6 12l4.5 4.5" />
      <Node x={17.5} y={10.5} />
    </Icon>
  )
}

/** The CV: a page whose lines are the four strata, with a download notch. */
export function DocumentIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M6.5 3.5h7.5l4 4v13h-11.5z" />
      <path d="M14 3.5v4h4" />
      <path d="M9.5 11h5M9.5 14h5M9.5 17h3" />
    </Icon>
  )
}

export function MailIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x={3.5} y={6.5} width={15} height={11.5} rx={2} />
      <path d="m4.5 8 6.5 5 6.5-5" />
      <Node x={18} y={3} />
    </Icon>
  )
}

export function CopyIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x={8.5} y={8.5} width={11} height={11} rx={2} />
      <path d="M15.5 5.5V5A1.5 1.5 0 0 0 14 3.5H5A1.5 1.5 0 0 0 3.5 5v9A1.5 1.5 0 0 0 5 15.5h.5" />
    </Icon>
  )
}

export function CheckIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </Icon>
  )
}

/** Sends a message to an endpoint: an arrow arriving at a wall. */
export function SendIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3.5 12h11" />
      <path d="M10.5 7.5 15 12l-4.5 4.5" />
      <path d="M19.5 5.5v13" />
    </Icon>
  )
}

/** Theme switch: a half-filled disc. Rotate it 180° to show the other theme. */
export function ContrastIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx={12} cy={12} r={8} />
      <path d="M12 4a8 8 0 0 1 0 16Z" className="fill-current" />
    </Icon>
  )
}

/** Menu as three strata of decreasing length, ending on a node. */
export function MenuIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 7h16M4 12h12M4 17h7" />
      <Node x={13.5} y={15.5} />
    </Icon>
  )
}

export function CloseIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m6 6 12 12M18 6 6 18" />
    </Icon>
  )
}

/** Mortarboard with its tassel ending on a node. */
export function EducationIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 4.5 21 9l-9 4.5L3 9z" />
      <path d="M7 11.2V15c0 1.4 2.2 2.7 5 2.7s5-1.3 5-2.7v-3.8" />
      <path d="M21 9v4" />
      <Node x={19.5} y={13.5} />
    </Icon>
  )
}

/** A hexagonal seal with a check. */
export function SealIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 3 19.5 7.5v9L12 21l-7.5-4.5v-9z" />
      <path d="m8.5 12 2.5 2.5 4.5-5" />
    </Icon>
  )
}

/** Success state; the check draws itself when the `draw` class is animated. */
export function SuccessIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx={12} cy={12} r={9} />
      <path d="m7.5 12.5 3 3 6-6.5" pathLength={1} className="draw" />
    </Icon>
  )
}

/* Brand marks (paths from Simple Icons, CC0). */

export function GitHubIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )
}

export function LinkedInIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

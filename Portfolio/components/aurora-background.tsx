const AuroraBackground = () => {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="aurora-blob aurora-blob-1 absolute -top-1/4 left-1/4 h-[36rem] w-[36rem] rounded-full bg-accent/20 blur-[120px]" />
      <div className="aurora-blob aurora-blob-2 absolute top-1/3 -right-1/4 h-[32rem] w-[32rem] rounded-full bg-secondary/20 blur-[120px]" />
      <div
        className="aurora-blob aurora-blob-1 absolute -bottom-1/4 left-1/3 h-[28rem] w-[28rem] rounded-full bg-accent/10 blur-[120px]"
        style={{ animationDelay: "-9s" }}
      />
    </div>
  )
}

export default AuroraBackground

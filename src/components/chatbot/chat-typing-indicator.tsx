interface ChatTypingIndicatorProps {
  label: string
}

export function ChatTypingIndicator({ label }: ChatTypingIndicatorProps) {
  return (
    <div className="flex w-full justify-start" role="status" aria-label={label}>
      <div className="rounded-2xl rounded-bl-md border border-border/50 bg-muted/80 px-4 py-3 shadow-sm backdrop-blur-sm">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          {[0, 150, 300].map((delay) => (
            <span
              key={delay}
              className="chat-typing-dot size-1 rounded-full bg-muted-foreground/70"
              style={{ animationDelay: `${delay}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

'use client'

interface ChatSuggestionsProps {
  suggestions: readonly string[]
  disabled?: boolean
  onSelect: (suggestion: string) => void
}

export function ChatSuggestions({ suggestions, disabled, onSelect }: ChatSuggestionsProps) {
  if (suggestions.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2 px-4 pb-2">
      {suggestions.map((suggestion) => (
        <button
          key={suggestion}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(suggestion)}
          className="cursor-pointer rounded-full border border-border/60 bg-background/60 px-3 py-1.5 text-left text-xs text-foreground transition-colors duration-200 hover:border-primary/40 hover:bg-primary/5 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
        >
          {suggestion}
        </button>
      ))}
    </div>
  )
}

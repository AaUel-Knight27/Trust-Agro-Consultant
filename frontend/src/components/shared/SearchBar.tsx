'use client'
import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Search, X } from 'lucide-react'

interface SearchBarProps {
  onSearch: (query: string) => void
  placeholder?: string
}

export function SearchBar({ onSearch, placeholder = 'Search articles...' }: SearchBarProps) {
  const [value, setValue] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(value)
    }, 400)
    return () => clearTimeout(timer)
  }, [value, onSearch])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handleClear = () => {
    setValue('')
    onSearch('')
  }

  return (
    <div className="relative">
      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="pl-9 pr-9"
      />
      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X size={14} />
        </button>
      )}
    </div>
  )
}

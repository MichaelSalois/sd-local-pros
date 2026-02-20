'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ChevronDown, MapPin, Wrench } from 'lucide-react';

interface SearchOption {
  slug: string;
  label: string;
}

interface SearchBarProps {
  categories: SearchOption[];
  neighborhoods: SearchOption[];
}

function Dropdown({
  options,
  value,
  onChange,
  placeholder,
  icon: Icon,
}: {
  options: SearchOption[];
  value: string;
  onChange: (slug: string) => void;
  placeholder: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    if (!query) return options;
    const q = query.toLowerCase();
    return options.filter((o) => o.label.toLowerCase().includes(q));
  }, [options, query]);

  const selectedLabel = options.find((o) => o.slug === value)?.label || '';

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
        setQuery('');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative flex-1 min-w-0">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => {
          setIsOpen(true);
          setTimeout(() => inputRef.current?.focus(), 0);
        }}
      >
        <Icon className="w-4 h-4 text-apple-gray-mid shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={isOpen ? query : selectedLabel}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={() => {
            setIsOpen(true);
            setQuery('');
          }}
          placeholder={placeholder}
          className="flex-1 min-w-0 text-[15px] text-apple-black placeholder:text-apple-gray-mid border-0 outline-none bg-transparent"
        />
        <ChevronDown
          className={`w-4 h-4 text-apple-gray-mid shrink-0 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-lg border border-black/5 z-50 max-h-60 overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="px-4 py-3 text-sm text-apple-gray-mid">
              No results found
            </div>
          ) : (
            filtered.map((option) => (
              <button
                key={option.slug}
                onClick={() => {
                  onChange(option.slug);
                  setIsOpen(false);
                  setQuery('');
                }}
                className={`w-full text-left px-4 py-2.5 text-[15px] transition-colors first:rounded-t-2xl last:rounded-b-2xl ${
                  option.slug === value
                    ? 'bg-apple-blue/5 text-apple-blue font-medium'
                    : 'text-apple-black hover:bg-black/[0.03]'
                }`}
              >
                {option.label}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default function SearchBar({ categories, neighborhoods }: SearchBarProps) {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('');

  function handleSearch() {
    if (selectedCategory && selectedNeighborhood) {
      router.push(`/${selectedCategory}/${selectedNeighborhood}`);
    } else if (selectedCategory) {
      router.push(`/${selectedCategory}`);
    } else if (selectedNeighborhood) {
      router.push(`/neighborhoods/${selectedNeighborhood}`);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }

  return (
    <div className="max-w-2xl mx-auto mb-8" onKeyDown={handleKeyDown}>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-0 bg-white rounded-2xl sm:rounded-button shadow-card border border-black/5 p-3 sm:p-2 sm:pl-5 focus-within:shadow-card-hover focus-within:border-apple-blue/30 transition-all">
        {/* Category Picker */}
        <div className="flex-1 min-w-0 px-2 sm:px-0">
          <Dropdown
            options={categories}
            value={selectedCategory}
            onChange={setSelectedCategory}
            placeholder="What do you need?"
            icon={Wrench}
          />
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-px h-6 bg-black/10 mx-3 shrink-0" />

        {/* Neighborhood Picker */}
        <div className="flex-1 min-w-0 px-2 sm:px-0">
          <Dropdown
            options={neighborhoods}
            value={selectedNeighborhood}
            onChange={setSelectedNeighborhood}
            placeholder="Your neighborhood"
            icon={MapPin}
          />
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          disabled={!selectedCategory && !selectedNeighborhood}
          className="btn-primary !rounded-button text-[15px] !py-2.5 !px-6 shrink-0 disabled:opacity-40 disabled:cursor-not-allowed sm:ml-2"
        >
          <Search className="w-4 h-4 sm:hidden" />
          <span>Search</span>
        </button>
      </div>

      {/* Helper text */}
      <p className="text-xs text-apple-gray-mid mt-2 text-center">
        {selectedCategory && selectedNeighborhood
          ? 'Press Search to see matching pros'
          : selectedCategory
          ? 'Add a neighborhood to narrow your results'
          : selectedNeighborhood
          ? 'Pick a service to find pros in your area'
          : 'Select a service and neighborhood to get started'}
      </p>
    </div>
  );
}
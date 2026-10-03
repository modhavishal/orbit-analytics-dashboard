"use client";

import { useRef, type KeyboardEvent, type RefObject } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";

type SearchFieldProps = {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  clearLabel: string;
  submitLabel: string;
  name?: string;
  inputRef?: RefObject<HTMLInputElement | null>;
  role?: "searchbox" | "combobox";
  ariaAutocomplete?: "none" | "inline" | "list" | "both";
  ariaExpanded?: boolean;
  ariaControls?: string;
  onFocus?: () => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
};

export function SearchField({
  id,
  label,
  placeholder,
  value,
  onChange,
  onClear,
  clearLabel,
  submitLabel,
  name,
  inputRef,
  role,
  ariaAutocomplete,
  ariaExpanded,
  ariaControls,
  onFocus,
  onKeyDown,
}: SearchFieldProps) {
  const internalInputRef = useRef<HTMLInputElement>(null);
  const fieldRef = inputRef ?? internalInputRef;

  return (
    <div className="relative w-full">
      <label className="sr-only" htmlFor={id}>
        {label}
      </label>
      <Search
        aria-hidden="true"
        className="pointer-events-none absolute left-3 top-1/2 z-10 size-4 -translate-y-1/2 text-muted-foreground"
      />
      <Input
        ref={fieldRef}
        id={id}
        name={name}
        type="text"
        role={role}
        aria-label={label}
        aria-autocomplete={ariaAutocomplete}
        aria-expanded={ariaExpanded}
        aria-controls={ariaControls}
        autoComplete="off"
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        className={`h-10 rounded-xl border-border/80 bg-card pl-9 text-sm shadow-sm shadow-foreground/[0.02] transition focus:border-primary/50 focus:ring-2 focus:ring-primary/10 ${
          value ? "pr-[5.25rem]" : "pr-11"
        }`}
      />
      {value && onClear ? (
        <button
          type="button"
          aria-label={clearLabel}
          onClick={() => {
            onClear();
            fieldRef.current?.focus();
          }}
          className="absolute right-9 top-1/2 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
        >
          <X aria-hidden="true" className="size-4" />
        </button>
      ) : null}
      <button
        type="submit"
        aria-label={submitLabel}
        className="absolute right-1 top-1/2 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-lg bg-muted/80 text-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring"
      >
        <Search aria-hidden="true" className="size-4" />
      </button>
    </div>
  );
}

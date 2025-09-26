import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ViewportFixService {
  private lastFocused: Element | null = null;

  constructor() {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    document.addEventListener('focusin', (e) => {
      const t = e.target as Element | null;
      if (t && (t.matches('input, textarea, select, [contenteditable]'))) {
        this.lastFocused = t;
      }
    });

    document.addEventListener('focusout', () => {
      // small delay to let the keyboard dismiss
      setTimeout(() => {
        try {
          window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
        } catch {
          window.scrollTo(0, 0);
        }
        // nudge layout to clear accidental zoom
        const el = document.documentElement;
        const prev = el.style.transform;
        el.style.transform = 'translateZ(0)';
        requestAnimationFrame(() => { el.style.transform = prev; });
      }, 250);
    });
  }
}

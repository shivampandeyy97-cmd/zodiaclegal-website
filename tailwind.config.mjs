/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: 'var(--color-ink)',
          elevated: 'var(--color-ink-elevated)',
          muted: 'var(--color-ink-muted)',
        },
        paper: {
          DEFAULT: 'var(--color-paper)',
          warm: 'var(--color-paper-warm)',
          card: 'var(--color-surface)',
        },
        brass: {
          DEFAULT: 'var(--color-brass)',
          light: 'var(--color-brass-light)',
          dark: 'var(--color-brass-dark)',
        },
        content: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          muted: 'var(--color-text-muted)',
          inverse: 'var(--color-text-inverse)',
        },
        border: {
          subtle: 'var(--color-border)',
          strong: 'var(--color-border-strong)',
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)'],
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
      },
      maxWidth: {
        container: '75rem', // 1200px
        prose: '68ch',
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
      },
    },
  },
  plugins: [],
};

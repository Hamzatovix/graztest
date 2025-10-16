/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        // Типографическая шкала под итальянскую эстетику: крупные изящные заголовки и спокойное тело
        // Используем кастомные ключи, чтобы применять как text-h1/text-body и т.д.
        h1: [
          '2.75rem', // ~44px
          { lineHeight: '1.15', letterSpacing: '-0.01em', fontWeight: '600' }
        ],
        h2: [
          '2.125rem', // ~34px
          { lineHeight: '1.2', letterSpacing: '-0.005em', fontWeight: '600' }
        ],
        h3: [
          '1.75rem', // ~28px
          { lineHeight: '1.25', letterSpacing: '0', fontWeight: '600' }
        ],
        h4: [
          '1.5rem', // 24px
          { lineHeight: '1.3', letterSpacing: '0', fontWeight: '600' }
        ],
        h5: [
          '1.25rem', // 20px
          { lineHeight: '1.35', letterSpacing: '0', fontWeight: '600' }
        ],
        h6: [
          '1.125rem', // 18px
          { lineHeight: '1.4', letterSpacing: '0', fontWeight: '600' }
        ],
        body: [
          '1rem', // 16px
          { lineHeight: '1.7', letterSpacing: '0', fontWeight: '400' }
        ],
        'body-sm': [
          '0.9375rem', // 15px
          { lineHeight: '1.65', letterSpacing: '0', fontWeight: '400' }
        ],
        small: [
          '0.875rem', // 14px
          { lineHeight: '1.6', letterSpacing: '0', fontWeight: '400' }
        ],
        caption: [
          '0.8125rem', // 13px
          { lineHeight: '1.5', letterSpacing: '0.005em', fontWeight: '400' }
        ],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        }
      },
      fontFamily: {
        // Шрифтовые семейства: заголовки — Playfair Display, текст — Lato
        serif: ['Playfair Display', 'serif'],
        sans: ['Lato', 'system-ui', 'Segoe UI', 'Roboto', 'sans-serif']
      },
      backgroundImage: {
        'gradient-olive': 'linear-gradient(135deg, hsl(75 30% 45%), hsl(65 35% 50%))',
        'gradient-green': 'linear-gradient(135deg, hsl(120 35% 50%), hsl(130 40% 55%))'
      },
      boxShadow: {
        'soft': '0 4px 20px -4px hsl(75 30% 45% / 0.15)',
        'card': '0 2px 12px -2px hsl(75 20% 40% / 0.12)'
      },
      keyframes: {
        'fade-in': {
          from: {
            opacity: '0',
            transform: 'translateY(10px)'
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        'scale-in': {
          from: {
            opacity: '0',
            transform: 'scale(0.95)'
          },
          to: {
            opacity: '1',
            transform: 'scale(1)'
          }
        }
      },
      animation: {
        'fade-in': 'fade-in 0.6s ease-out forwards',
        'scale-in': 'scale-in 0.4s ease-out forwards'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
}



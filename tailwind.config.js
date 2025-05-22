/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))", // Brand Bright Green
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))", // Brand Teal
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))", // Brand Lime
          foreground: "hsl(var(--accent-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        'brand-bright-green': '#2ac37a',
        'brand-teal': '#47b49e',
        'brand-lime': '#87c44d',
        'brand-light-gray': '#f9fafb',
        'brand-dark': '#2b2e2f',
        'brand-light-blue-gray': '#d5dfe3',
        "color-1": "hsl(var(--color-1))",
        "color-2": "hsl(var(--color-2))",
        "color-3": "hsl(var(--color-3))",
        "color-4": "hsl(var(--color-4))",
        "color-5": "hsl(var(--color-5))",
        muted: {
          DEFAULT: "#f7f7f7", // Light gray
          foreground: "#374151"
        },
        destructive: {
          DEFAULT: "#FF5630",
          foreground: "#FFFFFF",
        },
        success: {
          DEFAULT: "#36B37E",
          foreground: "#FFFFFF"
        },
        warning: {
          DEFAULT: "#FFAB00",
          foreground: "#FFFFFF"
        },
        info: {
          DEFAULT: "#00B8D9",
          foreground: "#FFFFFF"
        },
        popover: {
          DEFAULT: "#FFFFFF",
          foreground: "#0F172A",
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#0F172A",
        },
        skeleton: "var(--skeleton)",
        btn: {
          border: "var(--btn-border)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        DEFAULT: "0.5rem",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
      boxShadow: {
        input: [
          "0px 2px 3px -1px rgba(0, 0, 0, 0.1)",
          "0px 1px 0px 0px rgba(25, 28, 33, 0.02)",
          "0px 0px 0px 1px rgba(25, 28, 33, 0.08)",
        ].join(", "),
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "gradient-animation": "gradient-animation 15s ease infinite",
        "gradient-text-animation": "gradient-text-animation 5s ease-in-out infinite",
        "gradient-x": "gradient-x 8s ease-in-out infinite",
        "glow": "glow 3s ease-in-out infinite alternate",
        "float": "float 6s ease-in-out infinite",
        "bounce-slow": "bounce 3s infinite",
        "spin-slow": "spin 6s linear infinite",
        "ripple": "ripple 2s ease calc(var(--i, 0) * 0.2s) infinite",
        "orbit": "orbit calc(var(--duration) * 1s) linear infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "rainbow": "rainbow var(--speed, 2s) infinite linear",
        "shimmer": "shimmer 6s ease-in-out infinite",
        "shimmer-slide": "shimmer-slide 3s ease-in-out infinite",
        "scale-in": "scale-in 0.7s ease-in-out",
        "slide-in": "slide-in 0.3s ease-out",
        "slide-down": "slide-down 0.3s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "fade-out": "fade-out 0.3s ease-out",
        "pop-in": "pop-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
        "heartbeat": "heartbeat 1.5s ease-in-out"
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.8 },
        },
        "gradient-animation": {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        "gradient-text-animation": {
          '0%': { backgroundPosition: '0% center' },
          '50%': { backgroundPosition: '100% center' },
          '100%': { backgroundPosition: '0% center' },
        },
        "gradient-x": {
          '0%': { backgroundPosition: '0% 50%', backgroundSize: '200% 200%' },
          '50%': { backgroundPosition: '100% 50%', backgroundSize: '200% 200%' },
          '100%': { backgroundPosition: '0% 50%', backgroundSize: '200% 200%' },
        },
        "glow": {
          'from': { boxShadow: '0 0 5px -5px rgba(121, 82, 246, 0.5)' },
          'to': { boxShadow: '0 0 15px 3px rgba(143, 109, 242, 0.6)' },
        },
        "float": {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        ripple: {
          "0%, 100%": { transform: "translate(-50%, -50%) scale(1)" },
          "50%": { transform: "translate(-50%, -50%) scale(0.9)" },
        },
        orbit: {
          "0%": {
            transform:
              "rotate(0deg) translateY(calc(var(--radius) * 1px)) rotate(0deg)",
          },
          "100%": {
            transform:
              "rotate(360deg) translateY(calc(var(--radius) * 1px)) rotate(-360deg)",
          },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        rainbow: {
          "0%": { "background-position": "0%" },
          "100%": { "background-position": "200%" },
        },
        shimmer: {
          "0%": { opacity: 0.5, transform: "scale(1)" },
          "50%": { opacity: 0.7, transform: "scale(1.05)" },
          "100%": { opacity: 0.5, transform: "scale(1)" },
        },
        "shimmer-slide": {
          "0%": { transform: "translateX(-150%)" },
          "50%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(150%)" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "slide-in": {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "slide-down": {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-out": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        "pop-in": {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "50%": { transform: "scale(1.03)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "heartbeat": {
          "0%": { transform: "scale(1)" },
          "14%": { transform: "scale(1.15)" },
          "28%": { transform: "scale(1)" },
          "42%": { transform: "scale(1.15)" },
          "70%": { transform: "scale(1)" },
        }
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(to right, #2ac37a, #47b49e)',
      }
    },
  },
  plugins: [],
}; 
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './@/**/*.{ts,tsx}', // <- HERE
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "enterFromRight": {
          from: { opacity: "0", transform: 'translateX(200px)' },
          to: { opacity: "1", transform: 'translateX(0)' },
        },
        "enterFromLeft": {
          from: { opacity: "0", transform: 'translateX(-200px)' },
          to: { opacity: "1", transform: 'translateX(0)' },
        },
        "exitToRight": {
          from: { opacity: "1", transform: 'translateX(0)' },
          to: { opacity: "0", transform: 'translateX(200px)' },
        },
        "exitToLeft": {
          from: { opacity: "1", transform: 'translateX(0)' },
          to: { opacity: "0", transform: 'translateX(-200px)' },
        },
        "scaleIn": {
          from: { opacity: "0", transform: 'rotateX(-10deg) scale(0.9)' },
          to: { opacity: "1", transform: 'rotateX(0deg) scale(1)' },
        },
        "scaleOut": {
          from: { opacity: "1", transform: 'rotateX(0deg) scale(1)' },
          to: { opacity: "0", transform: 'rotateX(-10deg) scale(0.95)' },
        },
        "fadeIn": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fadeOut": {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "scaleIn": 'scaleIn 200ms ease',
        "scaleOut": 'scaleOut 200ms ease',
        "fadeIn": 'fadeIn 200ms ease',
        "fadeOut": 'fadeOut 200ms ease',
        "enterFromLeft": 'enterFromLeft 250ms ease',
        "enterFromRight": 'enterFromRight 250ms ease',
        "exitToLeft": 'exitToLeft 250ms ease',
        "exitToRight": 'exitToRight 250ms ease',
      }
    },
  },
  plugins: [],
}
export default config

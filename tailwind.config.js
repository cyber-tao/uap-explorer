/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        uap: {
          base: 'var(--uap-base)',
          surface: 'var(--uap-surface)',
          elevated: 'var(--uap-surface-elevated)',
          ivory: 'var(--uap-ivory)',
          muted: 'var(--uap-muted)',
          cyan: 'var(--uap-cyan)',
          amber: 'var(--uap-amber)',
          high: 'var(--uap-high)',
          medium: 'var(--uap-medium)',
          low: 'var(--uap-low)',
          speculative: 'var(--uap-speculative)',
          nuclear: 'var(--uap-nuclear)',
        },
      },
    },
  },
  plugins: [],
}

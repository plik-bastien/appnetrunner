module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      colors: {
        corp: '#00e5ff',
        runner: '#ff2d2d',
        cpBg: '#0a0f14',
        cpSurface: '#0f1923',
        cpLine: '#102532',
        cpAccent: '#fcee09'
      },
      fontFamily: {
        techno: ['Rajdhani','system-ui','sans-serif'],
        mono: ['Share Tech Mono','ui-monospace','SFMono-Regular','Menlo','monospace']
      },
      boxShadow: { cpGlow: '0 0 0 2px rgba(252,238,9,0.15), 0 0 25px rgba(0,229,255,0.15)' }
    },
  },
  plugins: [],
}

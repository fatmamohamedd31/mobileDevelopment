// Single source of truth for colours.
// Used by tailwind.config.js (class names) and by TS code that needs raw hex (icons, Switch).
// Palette name: "Tide & Saffron" - deep teal ink, warm sand, saffron + coral accents.
const palette = {
  ink: '#12262B',
  muted: '#5F7A7E',
  line: '#E1DCD0',
  sand: '#F6F2EA',
  card: '#FFFFFF',
  mist: '#E3EFED',

  tide: '#0E7C86',
  'tide-dark': '#0A5C64',
  'tide-soft': '#D5ECEA',

  saffron: '#F2A33A',
  'saffron-dark': '#9A5B00',
  'saffron-soft': '#FCEBCF',

  coral: '#E4572E',
  'coral-dark': '#B03A18',
  'coral-soft': '#FADBD1',

  sage: '#3FA27B',
  'sage-dark': '#237A58',
  'sage-soft': '#D6EEE3',
};

module.exports = { palette };

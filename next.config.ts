// next.config.ts
import nextPWA from 'next-pwa';

const withPWA = nextPWA({
  dest: 'public',
});

export default withPWA({
  // autres configurations Next.js
});
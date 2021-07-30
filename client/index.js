function bootstrap() {
  import('./src/app.js');
}

if (document.readyState !== 'loading') {
  bootstrap();
} else {
  window.addEventListener('DOMContentLoaded', bootstrap, { once: true });
}

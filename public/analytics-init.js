const meta = document.querySelector('meta[name="ga4-id"]');
const analyticsId = meta?.content;

if (analyticsId) {
  const dataLayer = window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag('js', new Date());
  gtag('config', analyticsId);
}

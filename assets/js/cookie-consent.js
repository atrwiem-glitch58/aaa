// cookie-consent.js
(function() {
  const CONSENT_KEY = 'aw_cookie_consent';
  const GTM_ID = 'GTM-5S56J85B';

  function injectGTM() {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({'gtm.start': new Date().getTime(), event:'gtm.js'});
    var f = document.getElementsByTagName('script')[0],
        j = document.createElement('script');
    j.async = true;
    j.src = 'https://www.googletagmanager.com/gtm.js?id=' + GTM_ID;
    if(f && f.parentNode) {
      f.parentNode.insertBefore(j, f);
    } else {
      document.head.appendChild(j);
    }
  }

  function hideBanner() {
    const banner = document.getElementById('cookie-consent-banner');
    if (banner) {
      banner.style.opacity = '0';
      setTimeout(() => { banner.style.display = 'none'; }, 300);
    }
  }

  function setConsent(accepted) {
    localStorage.setItem(CONSENT_KEY, accepted ? 'true' : 'false');
    hideBanner();
    if (accepted) {
      injectGTM();
    }
  }

  function createBanner() {
    const banner = document.createElement('div');
    banner.id = 'cookie-consent-banner';
    banner.className = 'cookie-banner';
    banner.innerHTML = `
      <div class="cookie-banner__inner container">
        <div class="cookie-banner__content">
          <strong>Gestion des cookies</strong>
          <p>Nous utilisons des traceurs pour mesurer l'audience de notre site (Google Analytics) afin d'améliorer votre expérience. Vous pouvez accepter ou refuser ces cookies.</p>
        </div>
        <div class="cookie-banner__actions">
          <button id="cookie-btn-refuse" class="btn btn--outline btn--sm">Refuser tout</button>
          <button id="cookie-btn-accept" class="btn btn--primary btn--sm">Accepter tout</button>
        </div>
      </div>
    `;
    document.body.appendChild(banner);

    document.getElementById('cookie-btn-accept').addEventListener('click', function() {
      setConsent(true);
    });
    
    document.getElementById('cookie-btn-refuse').addEventListener('click', function() {
      setConsent(false);
    });
  }

  function init() {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (consent === 'true') {
      injectGTM();
    } else if (consent === null) {
      createBanner();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

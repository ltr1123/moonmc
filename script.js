/* MoonMC — script.js */
(function () {
  'use strict';

  var IP_JAVA = 'jogar.moonmc.com.br';
  var IP_BEDROCK = 'jogar.moonmc.com.br:25600';

  /* ── Loader ── */
  window.addEventListener('load', function () {
    setTimeout(function () {
      var loader = document.getElementById('loader');
      if (loader) loader.classList.add('hidden');
    }, 500);
  });

  /* ── Navbar scroll ── */
  var navbar = document.getElementById('navbar');
  function onScroll() {
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── Mobile menu ── */
  var hamburger = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
    });
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
      });
    });
  }

  /* ── Active nav on scroll ── */
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.navbar-menu a');
  function onScrollSpy() {
    var pos = window.scrollY + 120;
    var current = sections[0] ? sections[0].id : 'inicio';
    var last = null;
    sections.forEach(function (section) {
      if (section.offsetTop <= pos) {
        last = section;
      }
    });
    if (last) current = last.id;
    navLinks.forEach(function (link) {
      var isActive = link.getAttribute('href') === '#' + current;
      link.classList.toggle('active', isActive);
    });
  }
  window.addEventListener('scroll', onScrollSpy, { passive: true });
  onScrollSpy();

  /* ── Reveal on scroll ── */
  var revealEls = document.querySelectorAll('[data-reveal]');
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(function (el) { revealObserver.observe(el); });

  /* ── Stars canvas ── */
  var canvas = document.getElementById('stars');
  if (canvas && canvas.getContext) {
    var ctx = canvas.getContext('2d');
    var stars = [];
    var resizeTimer;
    function buildStars() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      var count = Math.floor(window.innerWidth * window.innerHeight / 9000);
      stars = [];
      for (var i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 1.4 + 0.3,
          tw: Math.random() * Math.PI * 2
        });
      }
    }
    function drawStars() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      var t = performance.now() / 1200;
      stars.forEach(function (s) {
        var alpha = 0.25 + 0.55 * (0.5 + 0.5 * Math.sin(s.tw + t));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(216, 224, 240, ' + alpha + ')';
        ctx.fill();
      });
      requestAnimationFrame(drawStars);
    }
    buildStars();
    drawStars();
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(buildStars, 200);
    });
  }

  /* ── Copy IP + modal ── */
  var toast = document.getElementById('toast');
  var toastText = document.getElementById('toast-text');
  var modal = document.getElementById('ip-modal');
  var modalDeviceInfo = document.getElementById('modal-device-info');
  var btnOpenMinecraft = document.getElementById('btn-open-minecraft');
  var modalDownloadLinks = document.getElementById('modal-download-links');
  var toastTimer;

  function showToast(msg) {
    if (!toast) return;
    toastText.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('show'); }, 2600);
  }

  function detectDevice() {
    var ua = navigator.userAgent;
    if (/Windows/i.test(ua)) return 'windows';
    if (/iPhone|iPad|iPod/i.test(ua)) return 'ios';
    if (/Android/i.test(ua)) return 'android';
    if (/Mac/i.test(ua)) return 'mac';
    return 'desktop';
  }

  function getDeviceName(device) {
    var names = {
      windows: 'Windows',
      ios: 'iPhone/iPad',
      android: 'Android',
      mac: 'Mac',
      desktop: 'Computador'
    };
    return names[device] || 'Computador';
  }

  function getDownloadLinks(device) {
    var links = {
      windows: [
        { url: 'https://www.xbox.com/en-US/games/store/minecraft-java-bedrock-edition-for-pc/9nxp44l49shj', label: 'Java & Bedrock', icon: 'fa-solid fa-gamepad', cls: 'download-windows' },
        { url: 'https://www.xbox.com/en-US/games/store/minecraft-for-windows/9nblggh2jhxj', label: 'Bedrock only', icon: 'fa-solid fa-cube', cls: 'download-windows' }
      ],
      ios: [
        { url: 'https://apps.apple.com/app/minecraft/id479516143', label: 'iOS', icon: 'fa-brands fa-apple', cls: 'download-ios' }
      ],
      android: [
        { url: 'https://play.google.com/store/apps/details?id=com.mojang.minecraftpe', label: 'Android', icon: 'fa-brands fa-google-play', cls: 'download-android' }
      ],
      mac: [
        { url: 'https://apps.apple.com/app/minecraft/id479516143', label: 'Mac', icon: 'fa-brands fa-apple', cls: 'download-ios' }
      ],
      desktop: [
        { url: 'https://www.xbox.com/en-US/games/store/minecraft-java-bedrock-edition-for-pc/9nxp44l49shj', label: 'Java & Bedrock', icon: 'fa-solid fa-gamepad', cls: 'download-windows' },
        { url: 'https://apps.apple.com/app/minecraft/id479516143', label: 'iOS', icon: 'fa-brands fa-apple', cls: 'download-ios' },
        { url: 'https://play.google.com/store/apps/details?id=com.mojang.minecraftpe', label: 'Android', icon: 'fa-brands fa-google-play', cls: 'download-android' }
      ]
    };
    return links[device] || links.desktop;
  }

  function openMinecraft() {
    var device = detectDevice();
    if (device === 'windows' || device === 'mac') {
      window.location.href = 'minecraft://';
    } else if (device === 'ios' || device === 'android') {
      window.location.href = 'minecraft://';
    } else {
      window.location.href = 'minecraft://';
    }
  }

  function updateModalForDevice() {
    var device = detectDevice();
    var deviceName = getDeviceName(device);
    var links = getDownloadLinks(device);

    var versionSelect = document.getElementById('modal-version-select');
    var actionsJava = document.getElementById('modal-actions-java');
    var stepsJava = document.getElementById('modal-steps-java');
    var actionsBedrock = document.getElementById('modal-actions-bedrock');
    var stepsBedrock = document.getElementById('modal-steps-bedrock');
    var actionsMobile = document.getElementById('modal-actions-mobile');
    var modalDivider = document.querySelector('.modal-divider');

    if (versionSelect) versionSelect.style.display = 'none';
    if (actionsJava) actionsJava.style.display = 'none';
    if (stepsJava) stepsJava.style.display = 'none';
    if (actionsBedrock) actionsBedrock.style.display = 'none';
    if (stepsBedrock) stepsBedrock.style.display = 'none';
    if (actionsMobile) actionsMobile.style.display = 'none';
    if (modalDivider) modalDivider.style.display = 'flex';

    if (modalDeviceInfo) {
      modalDeviceInfo.textContent = '';
    }

    if (device === 'windows') {
      if (versionSelect) versionSelect.style.display = 'block';
      if (modalDeviceInfo) {
        modalDeviceInfo.textContent = 'Qual versão você joga?';
      }
    } else if (device === 'ios' || device === 'android') {
      if (actionsMobile) actionsMobile.style.display = 'flex';
    } else {
      if (actionsBedrock) actionsBedrock.style.display = 'flex';
      if (stepsBedrock) stepsBedrock.style.display = 'block';
    }

    if (modalDownloadLinks) {
      modalDownloadLinks.innerHTML = '';
      links.forEach(function (link) {
        var a = document.createElement('a');
        a.href = link.url;
        a.target = '_blank';
        a.rel = 'noopener';
        a.className = 'download-link ' + link.cls;
        a.innerHTML = '<i class="' + link.icon + '"></i> ' + link.label;
        modalDownloadLinks.appendChild(a);
      });
    }

    var btnSelectJava = document.getElementById('btn-select-java');
    var btnSelectBedrock = document.getElementById('btn-select-bedrock');
    var btnOpenMinecraft = document.getElementById('btn-open-minecraft');
    var btnOpenMinecraftMobile = document.getElementById('btn-open-minecraft-mobile');

    if (btnSelectJava) {
      btnSelectJava.onclick = function () {
        if (versionSelect) versionSelect.style.display = 'none';
        if (actionsJava) actionsJava.style.display = 'flex';
        if (stepsJava) stepsJava.style.display = 'block';
        if (modalDeviceInfo) {
          modalDeviceInfo.textContent = '';
        }
      };
    }

    if (btnSelectBedrock) {
      btnSelectBedrock.onclick = function () {
        if (versionSelect) versionSelect.style.display = 'none';
        if (actionsBedrock) actionsBedrock.style.display = 'flex';
        if (stepsBedrock) stepsBedrock.style.display = 'block';
        if (modalDeviceInfo) {
          modalDeviceInfo.textContent = '';
        }
      };
    }

    if (btnOpenMinecraft) {
      btnOpenMinecraft.onclick = function () {
        openMinecraft();
      };
    }

    if (btnOpenMinecraftMobile) {
      btnOpenMinecraftMobile.onclick = function () {
        openMinecraft();
      };
    }
  }

  function openModal() {
    if (!modal) return;
    updateModalForDevice();
    modal.classList.add('open');
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    return Promise.resolve();
  }

  document.querySelectorAll('[data-play]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      openModal();
    });
  });

  var navbarServerInfo = document.getElementById('navbar-server-info');
  if (navbarServerInfo) {
    navbarServerInfo.addEventListener('click', function () {
      openModal();
    });
    navbarServerInfo.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal();
      }
    });
  }

  document.querySelectorAll('.ip-copy[data-ip]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var ip = btn.getAttribute('data-ip');
      copyText(ip).then(function () {
        showToast('IP copiado: ' + ip);
        btn.classList.add('copied');
        setTimeout(function () { btn.classList.remove('copied'); }, 1800);
      });
    });
  });

  document.querySelectorAll('.btn-copy-ip-modal').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var ip = btn.getAttribute('data-ip');
      copyText(ip).then(function () {
        showToast('IP copiado: ' + ip);
        btn.classList.add('copied');
        setTimeout(function () { btn.classList.remove('copied'); }, 1800);
      });
    });
  });

  modal && modal.querySelectorAll('[data-close]').forEach(function (el) {
    el.addEventListener('click', function () { modal.classList.remove('open'); });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal) modal.classList.remove('open');
  });

  /* ── Buy drawer ── */
  var buyDrawer = document.getElementById('buy-drawer');
  var buyPlanName = document.getElementById('buy-plan-name');
  var bodyEl = document.body;

  document.querySelectorAll('[data-buy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var plan = btn.getAttribute('data-buy');
      if (buyPlanName) buyPlanName.textContent = plan;
      if (buyDrawer) {
        buyDrawer.classList.add('open');
        bodyEl.style.overflow = 'hidden';
      }
    });
  });

  if (buyDrawer) {
    buyDrawer.querySelectorAll('[data-close-drawer]').forEach(function (el) {
      el.addEventListener('click', function () {
        buyDrawer.classList.remove('open');
        bodyEl.style.overflow = '';
      });
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && buyDrawer) {
      buyDrawer.classList.remove('open');
      bodyEl.style.overflow = '';
    }
  });

  /* ── Server status ── */
  var statusText = document.getElementById('status-text');
  var statusDot = document.querySelector('.status-dot');
  var playerCount = document.getElementById('player-count');
  var playerCountNav = document.getElementById('player-count-nav');
  var STATUS_SOURCES = [
    'https://api.mcstatus.io/v2/status/java/jogar.moonmc.com.br',
    'https://api.mcsrvstat.us/3/jogar.moonmc.com.br'
  ];

  function applyStatus(data) {
    if (data && data.online) {
      statusText.textContent = 'Servidor online';
      if (statusDot) statusDot.className = 'status-dot online';
      var count = data.players && data.players.online != null ? data.players.online : '?';
      if (playerCount) playerCount.textContent = count;
      if (playerCountNav) playerCountNav.textContent = count;
    } else {
      statusText.textContent = 'Servidor offline';
      if (statusDot) statusDot.className = 'status-dot offline';
      if (playerCount) playerCount.textContent = '0';
      if (playerCountNav) playerCountNav.textContent = '0';
    }
  }

  function checkStatus() {
    if (!statusText) return;
    var settled = false;
    function tryNext(i) {
      if (i >= STATUS_SOURCES.length) {
        statusText.textContent = 'Status indisponível';
        if (statusDot) statusDot.className = 'status-dot offline';
        return;
      }
      var controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
      var timeout = controller ? setTimeout(function () { controller.abort(); }, 15000) : null;
      fetch(STATUS_SOURCES[i], { signal: controller ? controller.signal : undefined })
        .then(function (res) { return res.json(); })
        .then(function (data) {
          if (!settled) {
            settled = true;
            applyStatus(data);
          }
        })
        .catch(function () {
          tryNext(i + 1);
        })
        .then(function () {
          if (timeout) clearTimeout(timeout);
        });
    }
    tryNext(0);
  }
  checkStatus();
  setInterval(checkStatus, 60000);
})();

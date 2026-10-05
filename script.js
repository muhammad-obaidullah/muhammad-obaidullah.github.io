// Footer year
var yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Word-by-word reveal for the About paragraph
(function () {
  var el = document.querySelector('[data-reveal]');
  if (!el) return;

  var text = el.textContent.trim();
  var words = text.split(/\s+/);
  el.textContent = '';
  words.forEach(function (w, i) {
    var span = document.createElement('span');
    span.className = 'word';
    span.textContent = w + (i < words.length - 1 ? ' ' : '');
    el.appendChild(span);
  });

  var spans = el.querySelectorAll('.word');
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var ratio = entry.intersectionRatio;
        var revealCount = Math.floor(spans.length * Math.min(ratio * 1.6, 1));
        spans.forEach(function (s, i) {
          s.classList.toggle('revealed', i < revealCount);
        });
      }
    });
  }, { threshold: Array.from({ length: 21 }, function (_, i) { return i / 20; }) });

  observer.observe(el);
})();

// Skills accordion
(function () {
  var items = document.querySelectorAll('.accordion-item');
  items.forEach(function (item, idx) {
    var trigger = item.querySelector('.accordion-trigger');
    if (!trigger) return;
    if (idx === 0) item.classList.add('open');
    trigger.addEventListener('click', function () {
      var wasOpen = item.classList.contains('open');
      items.forEach(function (i) { i.classList.remove('open'); });
      if (!wasOpen) item.classList.add('open');
    });
  });
})();

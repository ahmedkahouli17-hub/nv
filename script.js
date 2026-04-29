const tzSelect = document.getElementById('tzSelect');
const addBtn = document.getElementById('addTz');
const clocks = document.getElementById('clocks');
const localNow = document.getElementById('localNow');
const hourFormat = document.getElementById('hourFormat');

// Liste des fuseaux horaires
const zones = ['UTC', 'Europe/Paris', 'America/New_York', 'Asia/Tokyo', 'Africa/Tunis'];

// Remplir le selecteur
zones.forEach(z => {
  const opt = document.createElement('option');
  opt.value = z;
  opt.textContent = z;
  tzSelect.appendChild(opt);
});

// Liste des horloges actives
const list = [];

// Fonction pour créer les graduations du cadran
function createTicks(analogDiv) {
  for (let i = 0; i < 60; i++) {
    const tick = document.createElement('div');
    tick.style.position = 'absolute';
    tick.style.width = '2px';
    tick.style.backgroundColor = i % 5 === 0 ? '#7dd3fc' : '#7dd3fc60';
    tick.style.height = i % 5 === 0 ? '12px' : '6px';
    tick.style.left = '50%';
    tick.style.top = i % 5 === 0 ? '8%' : '11%';
    tick.style.transform = `translateX(-50%) rotate(${i * 6}deg)`;
    tick.style.transformOrigin = '50% 100%';
    analogDiv.appendChild(tick);
  }
}

// Créer une horloge (NUMÉRIQUE + ANALOGIQUE)
function createClock(zone) {
  const card = document.createElement('div');
  card.className = 'clock-card';
  
  const title = document.createElement('h3');
  title.textContent = zone === 'local' ? '📍 Local (système)' : zone;
  
  // Horloge ANALOGIQUE
  const analog = document.createElement('div');
  analog.className = 'analog';
  
  const hourHand = document.createElement('div');
  hourHand.className = 'hand hour';
  
  const minuteHand = document.createElement('div');
  minuteHand.className = 'hand minute';
  
  const secondHand = document.createElement('div');
  secondHand.className = 'hand second';
  
  analog.appendChild(hourHand);
  analog.appendChild(minuteHand);
  analog.appendChild(secondHand);
  
  // Ajouter les graduations
  createTicks(analog);
  
  // Horloge NUMÉRIQUE
  const digital = document.createElement('div');
  digital.className = 'digital';
  digital.textContent = '--:--:--';
  
  card.appendChild(title);
  card.appendChild(analog);
  card.appendChild(digital);
  clocks.appendChild(card);
  
  return { zone, digital, analog, hourHand, minuteHand, secondHand };
}

// Ajouter un fuseau
addBtn.onclick = () => {
  const zone = tzSelect.value;
  if (!list.find(c => c.zone === zone)) {
    list.push(createClock(zone));
  } else {
    alert('Ce fuseau est déjà affiché !');
  }
};

// Mettre à jour l'heure
function update() {
  const now = new Date();
  localNow.textContent = now.toLocaleTimeString('fr-FR');
  
  list.forEach(c => {
    try {
      const parts = new Intl.DateTimeFormat('fr-FR', {
        timeZone: c.zone === 'local' ? Intl.DateTimeFormat().resolvedOptions().timeZone : c.zone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).formatToParts(now);
      
      let h, m, s;
      parts.forEach(p => {
        if (p.type === 'hour') h = parseInt(p.value, 10);
        if (p.type === 'minute') m = parseInt(p.value, 10);
        if (p.type === 'second') s = parseInt(p.value, 10);
      });
      
      // Calcul des rotations pour l'analogique
      const secDeg = s * 6;
      const minDeg = (m + s / 60) * 6;
      const hrDeg = ((h % 12) + m / 60) * 30;
      
      c.secondHand.style.transform = `translateX(-50%) rotate(${secDeg}deg)`;
      c.minuteHand.style.transform = `translateX(-50%) rotate(${minDeg}deg)`;
      c.hourHand.style.transform = `translateX(-50%) rotate(${hrDeg}deg)`;
      
      // Affichage numérique
      const displayH = hourFormat.value === "12" ? ((h % 12) || 12) : h;
      c.digital.textContent = `${String(displayH).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    } catch(e) {
      c.digital.textContent = '--:--:--';
    }
  });
}

// Mettre à jour toutes les secondes
setInterval(update, 1000);

// Ajouter une horloge locale par défaut
list.push(createClock('local'));

// Premier affichage
update();
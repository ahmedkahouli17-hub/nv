const tzSelect = document.getElementById('tzSelect');
const addBtn = document.getElementById('addTz');
const clocks = document.getElementById('clocks');
const localNow = document.getElementById('localNow');
const hourFormat = document.getElementById('hourFormat');

const zones = ['UTC','Europe/Paris','America/New_York','Asia/Tokyo','Africa/Tunis'];

zones.forEach(z => {
  const opt = document.createElement('option');
  opt.value = z;
  opt.textContent = z;
  tzSelect.appendChild(opt);
});

function createClock(zone) {
  const card = document.createElement('div');
  card.className = 'clock-card';
  
  const title = document.createElement('h3');
  title.textContent = zone;
  
  const digital = document.createElement('div');
  digital.className = 'digital';
  digital.textContent = '--:--:--';
  
  card.appendChild(title);
  card.appendChild(digital);
  clocks.appendChild(card);
  
  return { zone, digital };
}

const list = [];

addBtn.onclick = () => {
  const zone = tzSelect.value;
  list.push(createClock(zone));
};

// Mise à jour de l'heure
function update() {
  const now = new Date();
  localNow.textContent = now.toLocaleTimeString();
  
  list.forEach(c => {
    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: c.zone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).formatToParts(now);
    
    let h, m, s;
    parts.forEach(p => {
      if(p.type === 'hour') h = parseInt(p.value);
      if(p.type === 'minute') m = parseInt(p.value);
      if(p.type === 'second') s = parseInt(p.value);
    });
    
    const displayH = hourFormat.value === "12" ? ((h % 12) || 12) : h;
    c.digital.textContent = `${String(displayH).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  });
}

setInterval(update, 1000);

// Ajouter une horloge par défaut
list.push(createClock('local'));
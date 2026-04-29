# 🕒 Horloge Analogique + Numérique – Multi fuseaux horaires

## 📝 Description du projet

Cette application web interactive permet d’afficher simultanément l’heure sous deux formats (analogique et numérique) pour plusieurs fuseaux horaires.  
L’utilisateur peut :

- Ajouter dynamiquement des horloges pour différents fuseaux horaires (UTC, Paris, New York, Tokyo, Tunis, etc.)
- Choisir d’afficher ou non l’horloge analogique et/ou numérique pour toutes les cartes
- Basculer entre le format 12h et 24h
- Voir en temps réel l’heure locale du système

Chaque horloge analogique possède des aiguilles animées (heures, minutes, secondes) ainsi que des graduations précises sur le cadran.

---

## 💻 Technologies utilisées

- **HTML5** – structure de la page
- **CSS3** – design responsive, thème sombre, animations
- **JavaScript (ES6)** – logique métier, manipulation du DOM, gestion du temps
- **API Intl.DateTimeFormat** – gestion avancée des fuseaux horaires

---

## ⚙️ Fonctionnalités principales

| Fonctionnalité | Description |
|----------------|-------------|
| 🕘 Horloge analogique | Aiguilles heures, minutes, secondes + graduations |
| 🔢 Horloge numérique | Affichage HH:MM:SS avec format 12h/24h |
| 🌍 Multi fuseaux | Ajout/suppression visuelle de fuseaux via une liste |
| ✅ Checkbox de filtrage | Afficher/masquer les deux types d’horloges indépendamment |
| ⏱️ Mise à jour temps réel | Rafraîchissement chaque seconde |
| 📍 Heure locale | Affichage permanent en haut de page |

---

## 🌐 Lien vers la page GitHub Pages

> 🔗 [**Accéder à l’horloge universelle**](https://ahmedkahouli.github.io/NOM_DU_REPO/)

*(Remplacez `VOTRE_NOM_UTILISATEUR` et `NOM_DU_REPO` par les vrais identifiants une fois le projet en ligne)*

---

## 🧠 Nouveautés explorées

Pendant ce projet, j’ai découvert et appris à maîtriser plusieurs notions :

- **`Intl.DateTimeFormat` avec `timeZone`** : une manière fiable et native de gérer les fuseaux horaires sans bibliothèque externe.
- **La rotation CSS (`transform: rotate()`)** : pour animer les aiguilles d’horloge avec un centre de rotation maîtrisé (`transform-origin`).
- **Génération dynamique de graduations** : création en JavaScript de 60 petits traits sur le cadran.
- **Synchronisation entre affichage analogique et numérique** à partir d’un même objet `Date`.
- **Gestion de l’état UI via des `checkbox`** qui influencent toutes les cartes d’horloge (masquage collectif).

---

## ❗ Difficultés rencontrées

| Difficulté | Contexte |
|------------|----------|
| 🧭 Calcul des rotations des aiguilles | Convertir heures/minutes/secondes en degrés précis (ex: tenir compte des minutes pour l’aiguille des heures) |
| 🌍 Fuseau "local" | Fallait capturer le fuseau système plutôt que d’utiliser `'local'` comme chaîne |
| 🎨 CSS responsive | Maintenir des cadrans circulaires beaux sur toutes les tailles d’écran |
| 🕒 Format 12h/24h | Appliquer le changement à toutes les horloges numériques sans recalculer tout l’objet `Date` |
| 🧩 Affichage conditionnel | Gérer l’affichage analogique/numérique à l’ajout d’une nouvelle horloge |

---

## ✅ Solutions apportées

1. **Calcul des aiguilles**  
   - Heures : `(h % 12 + m/60) * 30`  
   - Minutes : `(m + s/60) * 6`  
   - Secondes : `s * 6`  
   *(testé avec plusieurs fuseaux horaires)*

2. **Fuseau local fiable**  
   Utilisation de `Intl.DateTimeFormat().resolvedOptions().timeZone` pour récupérer le vrai fuseau système.

3. **Responsive**  
   - `grid` CSS avec `auto-fit` et `minmax(220px, 1fr)`  
   - Taille fixe de l’horloge analogique (150x150) pour éviter la déformation.

4. **Format 12h/24h**  
   Écoute de l’événement `change` sur le `select` + simple condition ternaire au moment du rendu numérique.

5. **Checkbox appliquées aux futures horloges**  
   Lors de la création d’une nouvelle carte, le style `display` est immédiatement défini selon l’état des cases à cocher (et non pas seulement après un changement).

---

## 📁 Structure du projet
projet-horloge/
│
├── index.html # Structure HTML (horloges, contrôles)
├── style.css # Thème sombre, animations, responsive
├── script.js # Logique (update, création horloges, gestion fuseaux)
└── README.md # Ce fichier

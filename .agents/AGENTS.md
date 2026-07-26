# Directives & Charte Esthétique — Atelier Willehem

## 1. Zéro Émoji (Strict)
- **Aucun émoji** (ex: 📞, ⚡, 🛡️, 🔍, ☀️, 🌧️, etc.) ne doit être présent dans le code HTML/CSS/JS.
- Conserver une typographie 100% épurée, sobre et artisanale haut de gamme.

## 2. Typographie & Couleurs (Light Theme & Sobriété)
- **Thème Clair** : Utiliser les fonds clairs natifs du design system (`var(--bg)` `#FAFAF7`, `var(--bg-alt)` `#F3F1EC`, `var(--bg-card)` `#FFFFFF`).
- **Titres (H1, H2, H3)** : Typographie `font-family: var(--font-display)` (Lexend Deca) avec graisse légère `font-weight: 300` (jamais de gras lourd 700 sur les titres principaux H1).
- **Bandeaux & Labels (`.section-label`)** : Texte brut avec indicateur typographique natif sans aplats de couleur, overlays ou fonds cuivrés voyants.
- **Boutons & Cartes** : Formes épurées, bordures fines (`1px solid var(--border)`), ombrages très légers (`var(--sh-card)`).

## 3. Tarification & Simulateurs (Règles Commerciales)
- **Main-d'œuvre de Pose** : Tarif fixe à **150 € TTC par volet** (strictement sans remise de volume, ni rabais de 15%/25%).
- **Grille Matériel Velux** : Utiliser les prix exacts du catalogue par code dimensionnel (`CK01`, `CK02`, `CK04`, `MK04`, `MK06`, `MK08`, `PK06`, `PK08`, `PK10`, `SK06`, `SK08`, `UK04`, `UK08`, `Code 6`, `Code 9`) et par gamme (`SSL Solaire Alu`, `SML Électrique Alu`, `SSS Souple Solaire`).
- **Nomenclature** : Ne jamais afficher les références de stock internes (ex: `SSL CK01 0000SA`) dans l'interface client. Exclure les modèles obsolètes (ex: volet manuel `SHL`).

## 4. Ergonomie Mobile (Responsive)
- **Simulateurs Multi-lignes** : Les sélecteurs et cartes s'empilent en 1 colonne fluide sur smartphone (< 900px).
- **Libellés des boutons CTA** : Raccourcir les textes trop longs sur mobile (ex: `Demander mon devis →` sur mobile via `.hide-mobile` vs version complète sur ordinateur).

## 5. Navigation (Fil d'Ariane)
- **Présence Obligatoire** : Un fil d'ariane (`.breadcrumb`) doit être présent sur toutes les pages du site (sauf la page d'accueil).
- **Style** : Il doit respecter la charte graphique et utiliser la couleur cuivre (`var(--copper)`) au survol et pour l'élément final, plutôt que le zinc.

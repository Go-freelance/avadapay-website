# Grille Actualités avec affichage progressif

## Objectif

Afficher les articles des pages `/fr/actualites` et `/en/news` dans une grille de quatre cartes par ligne sur desktop, avec deux lignes visibles initialement et un bouton permettant d’afficher huit articles supplémentaires à chaque clic.

## Comportement

- Afficher 8 articles au chargement initial.
- Afficher 8 articles supplémentaires à chaque clic sur « Voir plus » ou « Show more ».
- Masquer le bouton lorsque tous les articles sont visibles.
- Ne pas afficher le bouton lorsque la liste contient 8 articles ou moins.
- Conserver l’ordre antéchronologique actuel.

## Mise en page

- Mobile : 1 carte par ligne.
- Tablette : 2 cartes par ligne.
- Desktop large : 4 cartes par ligne.
- Adapter les indications de taille de `next/image` à une largeur de carte proche de 25 % sur desktop.

## Architecture

Créer un composant client partagé responsable uniquement du nombre de cartes visibles et du bouton. Les pages restent des Server Components : elles récupèrent les articles, génèrent les métadonnées et les données structurées, puis transmettent des données sérialisables au composant partagé.

Toutes les cartes sont rendues dans le HTML et les cartes au-delà de la limite courante sont masquées avec l’attribut `hidden`. Les liens vers les articles restent ainsi présents dans le document généré, tandis que l’interface ne montre que le lot demandé.

## Accessibilité

- Le bouton utilise un libellé localisé explicite.
- La zone de la grille possède un identifiant ciblé par `aria-controls`.
- Le focus reste sur le bouton après l’ajout d’un lot afin de ne pas perturber la navigation au clavier.

## Vérification

- Vérifier la compilation Next.js et le typage des fichiers modifiés.
- Vérifier automatiquement les limites de 8, 16 et fin de liste dans la logique du composant.
- La validation visuelle finale sera réalisée par le propriétaire du site.

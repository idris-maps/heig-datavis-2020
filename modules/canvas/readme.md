# L'élément `<canvas>`

Dans ce cours nous avons utilisé le `<svg>` pour créer des graphiques sur une page web. Mais il existe aussi un autre moyen de dessiner sur le web, l'élément `<canvas>`.

Lisez [cette page observable](https://observablehq.com/@idris-maps/canvas) pour avoir une idée de comment ça marche.

Il est possible de faire des visualisations aussi bien sur l'élément `<svg>` que sur un `<canvas>`. La différence fondamentale est qu'avec le `<svg>` tout ce que nous dessinons est accessible dans le [DOM](https://developer.mozilla.org/fr/docs/Web/API/Document_Object_Model). Si vous ouvrez l'inspecteur du navigateur vous pouvez voir tous les éléments qui composent le `<svg>`. Avec un `<canvas>`, vous ne verrez que l'élément `<canvas>`. Le dessin ne se fait pas en ajoutant des éléments au DOM mais dans un contexte extérieur.

Il y a des avantages et désavantages avec les deux techniques.

L'avantage d'avoir tous les éléments dans le DOM, comme avec le `<svg>`, est que vous pouvez accéder à un élément en utilisant par exemple `document.getElementById('mon-id')`. Vous pouvez ainsi rentrer dans la structure du `<svg>` et modifier des éléments. Vous pouvez ajouter des événements sur des éléments. Par exemple faire quelque chose quand un élément est cliqué. Vous pouvez également changer certaines propriétés des éléments `<svg>` avec du CSS. Ceci n'est pas possible sur les éléments dessinés sur le `<canvas>` puisqu'ils ne sont pas des éléments DOM.

Le fait de mettre tous les éléments dans le DOM, comme avec le `<svg>` fait que, si vous avez des milliers, ou des millions, d'éléments, la page va devenir très lente. Le navigateur doit lire ces milliers d'éléments. Si vous dessinez sur un `<canvas>`, le nombre d'objets dessinés a moins d'importance parce que pour le navigateur il ne s'agit que d'un élément. Le travail de dessiner est passé directement à la carte graphique. Ceci est encore plus important si vous créez des animations. Quand un élément `<svg>` est animé il faut trouver l'élément dans le DOM et modifier un attribut. Par exemple l'attribut `x` pour bouger l'élément sur l'axe horizontal. Dans une animation ceci doit être fait plusieurs fois par seconde (60 généralement). Si vous avez 1000 éléments, cette opération doit être répétée 60000 fois par seconde.

Pour faire court, si vous dessinez quelque chose de très complexe avec beaucoup d'éléments (et en particulier si vous avez l'intention de l'animer), utilisez le `<canvas>`. Si vous souhaitez pouvoir accéder aux éléments et créer des interactions, utilisez `<svg>`.
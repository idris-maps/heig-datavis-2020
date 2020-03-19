# Une visualisation n'est pas la réalité

Toute visualisation est une abstraction. Quand nous nous créons un graphique, nous montrons une version subjective de la réalité.

## Mentir avec un graphique

Dans son livre [How charts lie](http://albertocairo.com/wp-content/uploads/2019/07/How-Charts-Lie-cover_high.jpg), le journaliste [Alberto Cairo](http://albertocairo.com/) démontre différentes manières de mentir avec un graphique.

### Mentir en visualisant

#### Avortements ou prévention du cancer

![Avortements vs. prévention du cancer](images/abortions_1.png)

Le graphique ci-dessus a été présenté par un sénateur américain opposé à l'avortement. Il montre qu'entre 2006 et 2013, le nombre d'avortement a augmenté alors que les efforts de prévention du cancer ont baissés. Le sous-entendu étant que les moyens mis à disposition pour les avortements affectent négativement d'autres pratiques médicales plus importante.

Le graphique ne comporte pas d'échelle sur l'axe vertical. Mais si nous regardons les chiffres. La prévention du cancer est effectivement passée de près de 2 millions à un million. Les avortement ont eux augmenté de 290'000 à 328'000.

Dans sa version corrigée, Alberto Cairo ajoute une échelle et et redessine les courbes par rapport à celle-ci.

![Avortements vs. prévention du cancer - version corrigée](images/abortions_2.png)

Quelle que soit la raison pour la baisse de prévention du cancer, elle peut difficilement être attribuée à l'augmentation des avortements.

#### Graphiques en 3D

Les graphiques en trois dimension sont rarement une bonne idée. À moins que le but soit d'embrouiller le lecteur. Un cas de figure imaginé par Cairo est un rapport annuel dans lequel une entreprise fictive souhaite montrer des résultats plus positifs qu'ils le sont vraiment.

![Ventes en 3D](images/3d_3.png)

La version corrigée ne donne pas la même impression de succès.

![Ventes en 2D](images/3d_3_correct.png)

### Mentir en choisissant les données

#### Différences salariales

Cairo cite un [article de la BBC](https://www.bbc.com/news/business-43156286), selon lequel les femmes gagnent 43% de moins que les hommes à la banque Barclays. Le chiffre n'est pas un mensonge en soit. Mais le sous-entendu que cette différence est uniquement due au sexe est erroné.

Le répartions des employés en catégories salariale et par sexe.

![Employés de Barclays](images/barclays.png)

Les femmes ne sont pas payées moins que les hommes pour le même boulot. Ce pourrait être le cas mais ces données ne nous disent rien là dessus. En revanche ce que nous disent les données est que plus de femmes travaillent dans des rôles "junior". Forcément moins bien payés que les postes de direction où les hommes sont majoritaires.

Le "mensonge" de l'article est le fait de parler de différences hommes-femmes au niveau du salaire plutôt qu'au niveau des chances d'avoir un poste mieux rémunéré.

#### Consomation de porno et politique

Dans le contexte très polarisé de la polique aux Etats-Unis, tous les moyens sont bons pour discréditer l'adversaire. La consomation de pornographie en est un.

![Clients pornhub et vote](images/porn_politics_1.png)

D'après le graphique ci-dessus les états qui ont voté Obama en 2012 ont vu plus de pages sur PornHub que les états républicains. Une exception: le Kansas, état républicain qui a de loin le plus de vues sur PornHub.

Comme discuté lors de la présentation de "PornHub insights", ceci ne dit rien sur le Kansas. PornHub géolocalise ses utilisateurs en fonction de leur adresse IP. Et il se trouve que le Kansas est pile au centre du pays.

![Kansas](images/porn_politics_2.png)

Si l'adresse IP d'un utilisateur se situe "quelque part aux Etats-Unis", PornHub va imaginer qu'il est au Kansas.

Ceci ne contredit en rien la thèse du graphique. Au contraire, si le Kansas républicain ne consomme pas autant de pages PornHub qu'il n'y parait, la tendance est encore plus favorable à la théorie que les démocrates sont plus vicelards.

Mais les données de PornHub ne sont pas seulement inexactes. Ce n'est certainement pas le seul moyen de consommer de la pornographie.

Pour contrer le graphique au-dessus, un partisan démocrate a créé un graphique démontrant qu'au contraire, les républicains consomment plus de pornographie.

![Abonnements porno et vote](images/porn_politics_3.png)

Cette fois la consomation de pornographie n'est plus représentées par le nombre de pages vues sur PornHub mais par le nombre d'abonnements à des sites pornographiques payants par état.

Mis à part le côté puéril d'essayer de discréditer ses adversaires en fonction de leur consommation supposée de pornographie, la morale est qu'en choisissant bien vos données, vous pouvez faire dire ce que vous voulez à un graphique.

### Mentir en interprétant les données

#### Le vaccin tue plus que la variole

![Morts de la varioles et du vaccion](images/smallpox_1.png)

Ce graphique fictif créé par Alberto Cairo démontre que plus d'enfants meurent du vaccin contre la variole que de la maladie elle-même. Est-ce un argument pour arrêter de vacciner? À première vue, oui. Mais regardons à quoi correspondent ces chiffres.

![Morts des vaccinés et des non-vaccinées](images/smallpox_2.png)

Sur une population de 1 million d'enfants, 990'000 sont vaccinés, 10'000 ne le sont pas. Sur les 990'000, 99 meurent des suites d'une réaction au vaccin. Sur les 10'000 non-vaccinés 40 meurent de la variole. Les chances de mourir sont respectivement de 0.01% et de 0.4%. Un enfant a 40 fois plus de chances de mourir s'il n'est pas vacciné.

## La cartographie

Dans le conte [Del rigor en la ciencia](https://es.wikipedia.org/wiki/Del_rigor_en_la_ciencia), le poète argentin [Jorge Luis Borges](https://fr.wikipedia.org/wiki/Jorge_Luis_Borges), raconte l'histoire d'un empire qui créa une carte de son territoire à l'échelle 1:1 pour pouvoir représenter tout ce qui s'y trouve. Quelques fragments sont encore visibles dans le désert...

La cartographie, encore plus que les autres formes de visualisations, est l'art de choisir de représenter une séléction de la réalité.

Ceci est une carte du parcours de chez moi à la HEIG.

![Le parcours de chez moi à la HEIG](images/mon_parcours.jpg)

Ne pouvant pas représenter chaque bâtiment, chaque champs, chaque arbre... que je passe en chemin, j'ai choisi de ne montrer que les moyens de transports et les lieux où je passe d'un moyen de transport à un autre. Il manque même des repères aussi grands que le Jura ou le lac de Neuchâtel.





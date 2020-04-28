# Utilisation de données

Le concept de "données" est assez abstrait. J'espère que vous en avez une vision plus précise après ce semestre. Nous avons vu différentes manières d'en trouver, de les transformer et de les visualiser. Pour ce dernier cours, je vais essayé d'élargir un peu l'horizon et voir comment des données sont utilisées.

## La valeur des données

Vous avez certainement entendu des expressions du style *les données sont le nouveau pétrol*. C'est évidemment une exagération mais les données peuvent avoir de la valeur. Parfois beaucoup de valeur.

Vous vous souvenez peut-être de ce [graphique](https://observablehq.com/@d3/bar-chart-race) représentant la valeurs de différentes marques dans le temps. Les marques "technologiques" en ont gagné beaucoup par rapport à d'autre depuis l'ère internet. Celles qui ont été crées depuis (IBM, Microsoft et Apple datent de bien avant internet), sont toutes basées sur les données.

Google et Facebook sont les plus grandes régies publicitaires de tous les temps. La valeur de ces entreprises réside dans leur capacité à collecter des données sur leurs utilisateurs. Celle-ci permettant à leurs clients de cibler au mieux la publicité. D'autres entreprises de l'ère internet, qui ne sont pas représentées ici, sont aussi presque exclusivement basées sur des données. Que vaudrait Airbnb ou Uber s'ils n'avaient pas des listes de personnes souhaitant louer leur appartement ou service?

Les données ne sont pas uniquement utilisées de manière brute: *Cette personne poste beaucoup de photos de chats, ça doit être un bon client pour la litière pour chat*. Une grande partie de la valeur des données est ce qu'on peut en inférer.

Prenez par exemple le site d'Amazon. L'expérience utilisateur ne semble pas avoir changé beaucoup depuis le début du millénaire. Ce n'est pas parce qu'il n'ont pas les moyens de faire un site plus joli. C'est parce que c'est ce format qui génère le plus de ventes. Ils le savent en ayant observé le comportement de millions d'utilisateurs, en essayant plusieurs variantes et en regardant ce qui marche le mieux.

De la même manière, si vous avez du mal à laisser les reseaux sociaux, c'est voulu. Des centaines d'ingénieurs et de psychologues travaillent là-dessus. Ils font des essais, collectent des données et arrivent à une forme optimale pour garder l'utilisateur le plus longtemps possible.

Même les entreprises qui ne sont pas des entreprises technologiques ont besoin de données. Cet [article du New York Times](https://www.nytimes.com/2012/02/19/magazine/shopping-habits.html) relate une anecdote amusante. C'est un père qui se pleins chez une chaîne de supermarchés que ça fille reçoit des offres pour des produits pour bébés. Il est fâché parce qu'il n'y a pas d'histoire de bébés pour sa fille qu'il suppose vièrge. Mais il s'avère après quelques mois que c'est le supermarché qui avait raison. En observant l'historique d'achats de millions de clients (grâce à la *carte du magasin*), ils peuvent prédire une possible naissance. Nous changeons rarement nos habitudes d'achats, sauf dans des situations exceptionnelles comme l'arrivée un enfant. Il est important pour un supermarché de voir arriver ces moments.

## Prédiction et apprentissage machine

Comme le supermarché, beaucoup d'entreprises ont besoin de faire des prédictions. Il existe des méthodes statistiques qui peuvent être faites par un humain. Mais de plus en plus nous demandons à des machines de le faire pour nous. L'*intelligence artificielle* (AI) et l'*apprentissage machine* (machine learning) sont devenus des mots à la mode. Décrire exactement comment cela fonctionne ne fait malheureusement pas partie de mes compétences. Mais en gros, il s'agit de créer des programmes informatiques qui apprennent d'eux-mêmes.

Voici un exemple, un peu stupide, que j'ai créé pour voir comment l'ordinateur prédit une fonction mathématique. Regardez comment ça marche [ici](https://observablehq.com/@idris-maps/apprentissage-automatique).

Il s'agit de passer des données à un classificateur en lui disant *si tu vois ça, retourne ça*. Imaginons que nous souhaitons apprendre à une machine à reconnaître si une image représente un chien ou un chat. Nous lui donnons des images en lui disant *ceci est une image de chat* ou *ceci est un chien*. Comme à une personne qui ne sait pas ce qu'est un chien ou un chat. Une fois que nous lui en avons donné suffisamment, nous devrions pouvoir lui donner une image et il dira s'il croit que c'est un chien ou un chat.

Un peu comme le classificateur de repas dans la série Silicon Valley:

[![Silicon Valley - Hot dog classifier](https://img.youtube.com/vi/vIci3C4JkL0/0.jpg)](https://www.youtube.com/watch?v=vIci3C4JkL0)

La blague dans la séquence ci-dessus est que l'application ne reconnaît que s'il s'agit d'un hot-dog ou pas. Pour qu'elle puisse reconnaître plus de produits, il aurait fallu lui montrer plus de photos avec une description de ce que c'est. Et c'est souvent ça la difficulté de l'apprentissage machine, trouver assez de données à fournir.

Vous avez probablement affaire à ce types de robots tous les jours. Quand vous faites une recherche sur internet. Quand vous êtes sur un site de commerce en ligne qui vous propose des articles qui vont avec ce que vous avez dans le panier. Quand vous voyez une publicité. Quand vous lisez le flux d'un réseau social.

Les voitures autonomes ne sont pas encore au point mais il s'agira aussi d'une machine ayant appris comment réagir dans une certaine situation après qu'on lui ait montré énormément de situations différentes et ce qu'il aurait fallu faire. Encore des données. Beaucoup de données.

### Un apprentissage raté

Il y a quelques années, j'étais à un [hackathon sur le thème des droits de l'homme](http://theport.ch/home/diplohack-2016-impact-hub/). Une des équipes avait eu l'idée de créer un classificateur pour voir si une photo représente un enfant-soldat. Ne me demandez pas l'utilité d'un tel outil. Il y a plusieurs manières de faire ça. Pour que ça marche il faudrait probablement un classificateur pour reconnaître une arme sur une photo et un autre pour reconnaître un enfant. Mais c'était un hackathon, par définition c'est fait à la va-vite. Ils ont passé la nuit à collecter des images d'enfants et d'enfant-soldats. Est ce que vous arrivez à deviner le résultat?

Si vous donniez une image d'enfant noir à la machine elle supposait que c'était un enfant-soldat. Recherchez `enfants` et `enfant-soldats` sur "Google images", vous allez comprendre pourquoi. Du point de vue d'une machine qui n'a aucune idée de ce qu'elle voit, la règle la plus facile pour faire la difference entre les deux est la couleur de peau.

Tout ça pour dire que l'intelligence artificielle ne peut pas être plus intelligente que l'humain qui l'entraîne. *Garbage in, garbage out* est une notion aussi vieille que l'informatique, c'est encore plus le cas avec l'apprentissage machine.

### Manipuler une votation

Dans son livre [Mindf*ck](https://www.penguinrandomhouse.com/books/604375/mindfck-by-christopher-wylie/), [Christopher Wylie](https://en.wikipedia.org/wiki/Christopher_Wylie) raconte comment il pense avoir manipulé le résultat du vote sur le Brexit. Il a commencé comme assistant parlementaire pour le parti libéral du Canada. En tant que tel, il est allé voir comment Obama a utilisé les réseaux sociaux pour gagner l'éléction présidentielle de 2012. Il s'agissait de formatter le message en fonction de qui on veut convaincre. À l'époque la technique était assez rudimentaire mais fonctionnait relativement bien.

En continuant à travailler avec ces techniques de persuasion, Wylie a aussi aidé le parti Liberal Démocrate au Royaume-Uni. Puis à fini chez [SCL](https://en.wikipedia.org/wiki/SCL_Group), une boîte de communication qui entre autre s'occupait de décourager des jeunes de se tourner vers l'islamisme violent, ou de semer la paranoïa dans les cartels de drogue. Pour cela ils utilisaient des données et de la psychologie.

Grâce à une application de teste de personnalité pour téléphone portable, ils arrivent à mettre la main sur des millions de profiles facebook. En mettant en relation ces différents types de personnalité avec les données du réseau social, ils arrivent à créer un profile psychologique en fonction du comportement sur facebook. L'intérêt étant de savoir à l'avance quel type de message aura le plus d'effet sur la cible.

Lors du vote sur le Brexit, la filiale [Cambridge Analytica](https://en.wikipedia.org/wiki/Cambridge_Analytica) de SCL a un contrat avec la campagne "Vote leave", pour le Brexit. Ils ont utilisé ces données pour créer des messages très ciblés. Il y a plusieurs raisons de voter pour. Certaines sont peut-être même contradictoires. Mais si vous savez ce qui marche sur qui, tout le monde n'a pas besoin de voir le même message. Chaque cible ne voit que le message qui a le plus de chance de marcher.

Comme le vote était très seré il n'est pas impossible qu'ils aient vraiment réussi à changer le cours de l'histoire. L'affaire est connue comme le "scandale Cambridge Analytica". Il y a aussi un pendant américain puisque la même boite aurait aidé Donald Trump à se faire élire. La partie qui a fait scandale est que ces techniques aient été utilisées pour des éléctions. Mais celles-ci sont utilisées tous les jours dans le marketing et la communication d'entreprise.

L'apprentissage machine n'est qu'une technologie, elle peut être utilisée pour faire le bien comme le mal. Les jugements de valeurs sont subjectifs. Mais quoi que vous en fassiez, vous aurez besoin de données.

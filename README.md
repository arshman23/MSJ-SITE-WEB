# MSJ GROUP

Site vitrine statique de MSJ GROUP et de ses univers : **MSJ EXPERT**, **MSJ ASSURANCE**, **MSJ GESTION** et **MSJ DOMICILIATION**.

## Démarrer en local

Aucune installation ni compilation. Depuis le dossier du dépôt :

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Le serveur sert directement les fichiers HTML, CSS, JavaScript et images. Il doit rester en cours d’exécution pendant le travail. Utiliser le checkout existant ; aucun worktree supplémentaire n’est nécessaire.

## Pages et modifications

- `index.html` : accueil et présentation du groupe.
- `expert.html` : créations SAS/SASU/SARL/EURL à 960 € TTC et SCI à 1 080 € TTC, suivi, business plan, modifications et affiche actualisée (JPG/PDF).
- `assurance.html` : présentation et questions de protection.
- `gestion.html` : secrétariat externalisé, factures, documents salariés/attestations/assurances et e-mails ; tarif sur devis selon la taille et le volume.
- `domiciliation.html` : présentation de la domiciliation et prise de contact pour les modalités.
- `contact.html` : préparation d’un e-mail, copie et téléchargement de la demande.
- `informations.html` : identification communiquée, informations légales et confidentialité.
- `404.html` : page d’erreur GitHub Pages.
- `assets/site.css` : présentation et adaptation mobile.
- `assets/site.js` : menu mobile, affiche, anciens liens à ancres.
- `assets/contact.js` : validation et préparation du contact.
- `assets/CREDITS.txt` : provenance des visuels.

Les pages sont des fichiers HTML autonomes, sans dépendance distante. Les en-têtes et pieds de page communs doivent rester cohérents lors d’une modification. Tous les chemins usuels sont relatifs pour fonctionner dans le sous-dossier GitHub Pages.

## Contact

Le formulaire **ne transmet pas automatiquement** les données. Il prépare un e-mail à `cabinet@msjexpert.fr`. Le visiteur ouvre sa messagerie puis l’envoie lui-même ; il peut également copier ou télécharger son message. Aucun compte, clé API, stockage personnel ou service tiers n’est utilisé. Un envoi direct depuis le site nécessiterait un service de réception à configurer séparément.

Les liens `contact.html?service=expert`, `?service=assurance`, `?service=gestion` et `?service=domiciliation` présélectionnent le sujet.

## Publication

GitHub Pages : source **Deploy from a branch**, branche **main**, dossier **/ (root)**. Le fichier `.nojekyll` désactive la transformation Jekyll. Une mise à jour de `main` déclenche la publication GitHub Pages. Le site public est prévu à l’adresse `https://arshman23.github.io/MSJ-SITE-WEB/`.

## Vérifications

Contrôler la navigation de chaque page et les ancres, le menu mobile (dont Échap), les liens de contact avec présélection, la validation du formulaire, la préparation et le téléchargement de l’e-mail, l’affiche (ouverture, fermeture et téléchargement) et l’absence de débordement sur mobile. Tester aussi les pages directement sous `/MSJ-SITE-WEB/`, sans dépendre d’une navigation depuis l’accueil.

## Informations à compléter par l’éditeur

Les SIRET fournis sont repris tels quels pour MSJ EXPERT et MSJ ASSURANCE. Compléter les autres mentions applicables (forme juridique, capital, RCS, responsable de publication et mentions professionnelles d’assurance). L’adresse et l’e-mail proviennent de la base fournie. Les tarifs sont à confirmer par devis. Les informations d’identification de Gestion et Domiciliation, ainsi que les conditions de domiciliation, sont à compléter par l’éditeur. Ne pas inventer d’adresse agréée, d’autorisation ou de prestations contractuelles.

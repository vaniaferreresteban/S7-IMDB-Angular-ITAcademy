# S7: IMDB (Angular, ITAcademy)

Aquest lliurament està basat en una prova tècnica d'una gran empresa del sector e-commerce, que busca desenvolupadors/es front-end en la ciutat de Barcelona.

## Taula de Continguts

- [Sobre el Projecte](#sobre-el-projecte)
- [Característiques](#característiques)
- [Demostració Visual](#demostració-visual)
- [Tecnologies Utilitzades](#tecnologies-utilitzades)
- [Instal·lació](#installació)
- [Ús](#ús)
- [Llicència](#llicència)
- [Contacte](#contacte)

## Sobre el Projecte

La prova tècnica consisteix a: consumir les dades d'una API, mostrar-les en una pantalla a través d'un llistat i mostrar el detall de cada ítem del llistat.

## Característiques

Bona arquitectura:
POSTMAN per consumir APIs
Gestió de Guard per protegir rutes
Routing
Serveis
Token de tipus JWT

## Demostració Visual

Aquí pots veure un exemple de les pantalles principals de l'aplicació.

<img src="https://i.imgur.com/wKXfCYJ.jpeg" width="800">
<img src="https://i.imgur.com/T1pk39m.png" width="800">

## Tecnologies Utilitzades

Aquest projecte ha estat desenvolupat utilitzant les següents tecnologies:

- **[Angular](https://angular.dev/)** - v20.1.2
- **[Angular Material](https://material.angular.dev/)** - v20.1.2
- **[ngx Infinite Scroll](https://github.com/orizens/ngx-infinite-scroll)** - v20.0.0
- **[TypeScript](https://www.typescriptlang.org/)** - v5.8.2
- **[Node.js](https://nodejs.org/)** (Requerit per Angular CLI)
- **[Supabase](https://supabase.com/)**
- **HTML5**
- **SCSS** (Sass)

## Instal·lació

Per configurar i executar aquest projecte localment, segueix els següents passos:

### Prerequisits

Assegura't de tenir instal·lat Node.js

- **Node.js**: Descarrega'l i instal·la'l des de [nodejs.org](https://nodejs.org/). Es recomana una versió LTS.
- **Angular CLI**: Instal·la el CLI d'Angular globalment si encara no el tens (la versió del projecte és 20.0.5):
  ```bash
  npm install -g @angular/cli
  ```

### Passos d'Instal·lació

1.  **Clona el repositori:**
    ```bash
    git clone [https://github.com/vaniaferreresteban/S7-IMDB-Angular-ITAcademy.git](https://github.com/vaniaferreresteban/S7-IMDB-Angular-ITAcademy.git)
    ```
2.  **Navega al directori del projecte:**
    ```bash
    cd S7-S7-IMDB-Angular-ITAcademy
    ```
3.  **Instal·la les dependències de Node:**
    ```bash
    npm install
    ```

## Ús

Una vegada que hagis instal·lat les dependències, pots executar l'aplicació en un servidor de desenvolupament local o construir-la per a producció.

### Executar en Mode de Desenvolupament

Per iniciar l'aplicació en mode de desenvolupament amb recàrrega en viu:

```bash
ng serve
```

Obre el teu navegador i navega a http://localhost:4200/. L'aplicació es recarregarà automàticament si realitzes canvis als arxius font.

### Construir per a Producció

Per construir el projecte per a desplegament en un entorn de producció:

```Bash
ng build
```

Els artefactes de construcció s'emmagatzemaran al directori dist/.

##Executar Proves

Per executar les proves unitàries:

```Bash
ng test
```

## Llicència

This project is open-source and available under the MIT License.

## Contacte

Per a qualsevol pregunta o comentari, pots contactar amb la mantenidora del projecte:

Vania Ferrer Esteban
GitHub: vaniaferreresteban

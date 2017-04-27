# Typescript MEAN Seed Project 

`typescript-mean-seed` project is the Starter of the Typescript MEAN(MongoDB-Express-Angular-Node) Fullstack.

To explain the different parts,

-   [MongoDB](https://www.mongodb.com/) usually acts as the database for your application, in case you need to persist data. It's where we store records.
-   [ExpressJS](http://expressjs.com/) is a web framework for nodejs, usually used as a backend for web apps in the MEAN stack.
-   [Angular](https://angular.io/) is usually the `Typescript` client side MVC web framework. In this case, we will be using Angular 4.*.
-   [NodeJS](https://nodejs.org/en/) powers express, and will be the layer our server run on.


In order to being able to develop independently on the frontend and the backend, e.g. if you have backend devs and frontend devs on your team, I setup the basic structure of the boilerplate like this:

```text
typescript-mean-seed
│
├── .git
├── .gitmodules  <-- Manage the list of Git-Submodules
├── ...
├── package.json
│
├── backend/     <-- MongoDB-Express-Node of Git-Submodule (Subproject)
│ ├── .git
│ ├── src/
│ ├── ...
│ └── package.json
│
├── models/
│ ├── src/
│ ├── ...
│ └── package.json
│
├── frontend/    <-- Angular 4 of Git-Submodule (Subproject)
│ ├── .git
│ ├── ...
│ └── package.json
│
└── README.md
```

> *Git Submodules*: 
> `Submodules` allow you to keep a Git repository as a subdirectory of another Git repository. This lets you clone another `repository` into your `project` and keep your commits separate.
>> [Git-Submodules Quick Started](docs/Git-Submodules.md)

# Installation
First, get the code using:
```bash
$ git clone https://github.com/CodebitsDesign/typescript-mean-seed.git <project_name>
$ cd <project_name>
$ git submodule init
$ git submodule update
```
Then, since backend and frontend are well separated through a REST-API, they are also installed separately.

## Backend Setup
To install & run the `backend` run
```bash
$ cd backend && yarn
$ yarn start

// for running the tests:
$ yarn test
```
> The tests are also written in typescript.

## Frontend Setup
The frontend is suggested to be setup with [Angular Cli](https://github.com/angular/angular-cli). 

To install & run the `frontend` run
```bash
$ cd frontend && yarn
$ yarn start

// for running the tests:
$ yarn test
```
> The tests are also written in typescript.


## Models / Shared Code
the `backend` / `frontend` just pull the `models` package from `npm` registry and can run totally independently, while still writing the code only once. 

> Add the npm package to `package.json` if you want to use the models package published:

```json
"dependencies": {
  ...
  "typescript-mean-models": "^0.0.1"
}
```


----------------------------------------------------------

# Development
The project is split into subprojects that can be developed independently. 
Those subprojects are the `backend`, `frontend` and `models`.

### Backend-Development
The `backend` is a separate git submodule and is located at `backend`. 
To get going, install as described above, then start a server with

```bash
$ yarn start
```

or run the tests using
```bash
$ yarn test
```

### Frontend-Development
See [Angular Cli](https://github.com/angular/angular-cli).
The frontend is a separate git submodule and is located at `frontend`. 

-[MEAN App with Angular 2 and the Angular CLI](https://scotch.io/tutorials/mean-app-with-angular-2-and-the-angular-cli)
-[Easily Develop Node.js and MongoDB Apps with Mongoose](https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications)

To get going, install as described above, then start Typescript Angular apps which created by `angular-cli` with

```bash
$ yarn start
```

or run the tests using
```bash
$ yarn test
```

### Models-Development
Since both the `backend` and the `frontend` are using the same data-structure, the data-models are stored and maintained independently.

In order to write new models, add a new `my-model.model.ts` file and export it in `index.d.ts`. 
Once you're done, you can `npm version patch`(or `yarn version`) and then `npm publish`(or `yarn publish`) the models to the `npm` registry. 
Like this, the models are retrievable by `npm install` in the `backend-` and `frontend-` projects, in order for them to be truly separated into their own git repository.

> Add the npm package to `package.json` if you want to use the models package published:

```json
"dependencies": {
  ...
  "typescript-mean-models": "^0.0.1"
}
```

> One advantage of using NodeJs in the backend, is that `frontend` and `backend`
> can share pieces of code. One example where it's pretty obvious that
> sharing makes sense are the data-models. 
> If `backend` and `frontend` should run independently (e.g. if you just want to send someone > the backend code), this shared code can become a separate `npm` package library. 
> Like this, the backend / frontend just pull the models from the `npm` registry (add to  > "dependencies" field of `package.json` file) and can run totally independently, while still > writing the code only once. 
> Of course, having to `npm version patch`(or `yarn version`) and `npm publish`(or `yarn > publish`) the models to the `npm` registry all the time in order to use them in the `backend` > / `frontend` is a bit annoying, but that's the tradeoff of modular code.



----------------------------------------------------------

# Foreword
The interest in the MEAN Stack (Mongo-Express-Angular-Node) seems to have peaked in May 2016 according to Google Trends.
While I can imagine a multitude of reasons for this
(from Anguar now being Angular 2 to mean / meanjs.org being
quite out of date, or the rise of other frameworks / libs like ReactJS or MeteorJS)
, it's still a viable full-stack-js solution.

For me, however, with one big change:
`JavaScript MEAN` becomes **`Typescript MEAN`**.


The use of `typescript` is literally exploding at the moment. `Angular` is now
completely re-written in `typescript`. So is RxJS. The list of projects
migrating is long, which is a good thing for friends of `typed` languages.
However, for the backend-part (Mongo-Express-Node) of the MEAN stack, I haven't
found a good `Typescript` boilerplate yet. By good I mean 100% Typescript,
including the unit tests. So I set out to create this boilerplate.
And this is what's resulted from it.



# Installation

First, get the code using

```
git clone https://github.com/bersling/typescript-mongo-express-angular-node-seed.git project-name
cd project-name
git submodule init
git submodule update
```

Then, since backend and frontend are well separated through a REST-API,
they are also installed separately.

## Backend Setup
To install & run the backend run
```
cd backend && npm install
npm start
```
or alternatively to `npm start`, for running the tests:
```
npm test
```

The backend has good test coverage for the boilerplate code using mocha and chai.
The tests are also written in typescript.

## Frontend Setup
The frontend is suggested to be setup with [Angular Cli](https://github.com/angular/angular-cli).
Like this you're also at Angular's newest version (Angular 2, Angular 4, Angular 5, ...).
Refer to the Angular-Cli docs for more information.

In case you're not into Angular, you could also just use any other
frontend architecture, since the backend is just a REST-API to consume.
For example you could go with ReactJS & Redux, or no framework at all!

## Models / Shared Code
One advantage of using NodeJs in the backend, is that `frontend` and `backend`
can share pieces of code. One example where it's pretty obvious that
sharing makes sense are the data-models. 
If `backend` and `frontend` should run independently (e.g. if you just want to send someone the backend code), this shared code can become a separate `npm` package library. 
Like this, the backend / frontend just pull the models from the `npm` registry (add to  "dependencies" field of `package.json` file) and can run totally independently, while still writing the code only once. 
Of course, having to `npm version patch`(or `yarn version`) and `npm publish`(or `yarn publish`) the models to the `npm` registry all the time in order to use them in the `backend` / `frontend` is a bit annoying, but that's the tradeoff of modular code.


# Development

The project is split into subprojects that can be developed independently.
Those subprojects are the `backend`, `frontend` and
`models`.

## Backend-Development
The backend is a separate git submodule and is located at `backend`.
To get going, install as described above, then start a server with
```
npm start
```
or run the tests using
```
npm test
```


For further details, consult the backend repository's readme.

## Frontend-Development
See [Angular Cli](https://github.com/angular/angular-cli).


## Models
Since both the backend and the frontend are using the same data-structure,
the data-models are stored and maintained independently.

In order to write new models, add a new `my-model.model.ts` file and
export it in `index.d.ts`. Once you're done, you can `npm version patch`
and then `npm publish`. Like this the models are retrievable by `npm`
in the backend- and frontend-projects, in order for them to be truly separated into their own git repos.



<div align="center">
	<img alt="Proffy" src="https://raw.githubusercontent.com/JoaoVSouto/fastfeet-frontend/master/src/assets/images/logo.png" />
</div>
<h3 align="center">Delivery management made easy</h3>

## 💻 Overview

**FastFeet** is a system for managing deliveries and all the things related, such as delivery mans, recipients and all the problems that could occur on a package delivery.

In there you can search for, list, edit, cancel, create and delete deliveries. You can perform all these operations on deliveryman and recipient records as well. It is a truly manager! 🌟

_This project is the final challenge of the [Rocketseat](https://rocketseat.com.br/)'s GoStack bootcamp! 🚀_

## 🌴 Implementation

The FastFeet layout was based on [this prototype](https://xd.adobe.com/view/62e829fc-4f10-4ac8-70d2-d39b429d43ee-14d9/grid). But it was implemented in a way that is fully **responsive** 📱 and **accessible** ♿️.

### Watch this [video tour](https://drive.google.com/file/d/1T_rU0cqIixA8SD99Zua5hcVLG_RH9nYQ/view?usp=sharing) 🎥 to see what is like to use the system.

## :zap: Techs

The following technologies were used to build this project:

- [ReactJS](https://reactjs.org/) - _A JavaScript library for building user interfaces_
- [Typescript](https://www.typescriptlang.org/) - _Open-source language which gives types to Javascript_
- [Redux](https://redux.js.org/) - _A Predictable State Container for JS Apps_
- [Redux-Saga](https://redux-saga.js.org/) - _Redux middleware for making side effects_
- [Redux Persist](https://github.com/rt2zz/redux-persist) - _Easy Redux store persist and rehydration_
- [react-input-mask](https://github.com/sanniassin/react-input-mask) - _Input masking component for React_
- [React-Select](https://react-select.com/) - _Select control component for React_
- [react-modal](https://github.com/reactjs/react-modal) - _Accessible modal dialog component for React_
- [Styled Components](https://styled-components.com/) - _CSS in JS styling library for React_
- [styled-breakpoints](https://github.com/mg901/styled-breakpoints) - _Simple and powerful tool for creating breakpoints in styled components and emotion._
- [Formik](https://formik.org/) - _Form management library for React_
- [Yup](https://github.com/jquense/yup) - _Dead simple Object schema validation_
- [Axios](https://github.com/axios/axios) - _Promise based HTTP client for the browser and node.js_
- [Prettier](https://prettier.io/), [ESLint](https://eslint.org/) and [EditorConfig](https://editorconfig.org/) - _For standardizing and formatting code_

## 🚀 Usage

This project is divided on the following two repos:

1. [Backend](https://github.com/JoaoVSouto/fastfeet-backend)
2. [Frontend](https://github.com/JoaoVSouto/fastfeet-frontend)

💡You have to have the backend running to have a full experience on frontend.

#### Laying the groundwork

Running this project requires a few programs that have to be installed on your computer:

- [Node.js v12+](https://nodejs.org/en/)
- [Yarn package manager](https://yarnpkg.com/)
- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/)

#### 🎲 Running backend

```bash
# Clones the backend repo
$ git clone https://github.com/JoaoVSouto/fastfeet-backend.git

# Changes directory to backend folder
$ cd fastfeet-backend

# Creates postgres docker container
$ docker run --name fastfeet -e POSTGRES_USER=fastfeet -e POSTGRES_PASSWORD=fastfeet -p 5432:5432 -d postgres

# Installs dependencies
$ yarn

# Creates database migrations
$ yarn typeorm migration:run

# Creates database seeds
$ yarn seed:run

# Spins up the server on port 3333
$ yarn dev
```

#### 🧭 Running frontend

```bash
# Clones the frontend repo
$ git clone https://github.com/JoaoVSouto/fastfeet-frontend.git

# Changes directory to frontend folder
$ cd fastfeet-frontend

# Installs dependencies
$ yarn

# Spins up the dev server on port 3000
$ yarn start
```

## :page_facing_up: License

This project is under the MIT license. See the [LICENSE](https://github.com/JoaoVSouto/fastfeet-frontend/blob/master/LICENSE) for more information.

---

Carefully written by João Vítor Souto :ocean:

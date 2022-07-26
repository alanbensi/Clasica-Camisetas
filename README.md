# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


# Clásica Camisetas

## Instalación
### 1. Node.js
Para la ejecución de este proyecto es necesario tener node.js instalado. De no ser así, se lo puede descargar e instalar de https://nodejs.org/es/download/.

#### 1.1 Instalación de paquetes
Previa instalación de node.js y de los archivos de este proyecto, las dependencias se instalan con el siguiente comando:
```
npm install
```

Verifique que cualquier comando se haga teniendo la carpeta raíz del proyecto como current directory.
### 2. XAMPP
Este proyecto también trabaja con XAMPP. De no tenerlo, se lo puede descargar e instalar de https://www.apachefriends.org/es/index.html.
En el panel de control de este sistema, se requiere que los módulos Apache y MySQL esten activados para poder operar con la base de datos.
### 3. Configuración de datos de conexión a la base de datos
En el archivo **config.js** de la carpeta **db** se encuentran los datos de conexión a la base de datos. De ser necesario, pueden ser editados en ese archivo. Estos son:
```
NAME = 'clasicacamisetas';    // nombre de la base de datos
USER = 'root';                // usuario
PASSWORD = '';                // contraseña
HOST = 'localhost';           // host
PORT = '3306';                // numero del puerto
```
### 4. Instalación de base de datos
Acceder a http://localhost/phpmyadmin/ desde el navegador para poder crear la base de datos. 
En el panel de la izquierda, se debe seleccionar "Nueva" y en la sección que se abre crear una nueva base de datos con el nombre que se encuentra en el archivo **config.js**, mencionado en el paso anterior.
#### 4.1 Comando para crear las tablas
```
node db/tables.js
```
#### 4.2 Comando para crear dos usuarios admin
```
node db/user_admin.js
```
Los datos para poder acceder con los usuarios admin son:
```
  {
    username: "SuperAdmin",
    password: "pass"
  },
  {
    username: "SuperAdmin2",
    password: "pass"
  }
```
### 5. Iniciar Server.js
```
node server.js
```
## Documentación 
Para más información sobre como interactuar con los endpoints de este proyecto, remitirse a la documentación que se encuentra en el archivo **spec.yaml** y puede abrirse en [Swagger Editor](https://editor.swagger.io/)


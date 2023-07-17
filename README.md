
### Explicacion de los endpoinds 

###### Tabla Pacientes 
- Endpoind #1
- Method = GET 
http://127.121.12.6:9102/pacientes/orden
- Este endponidn me muestra todos los pacientes ordenados alfabeticamente

- Endpoind #2
- Method = GET 
http://127.121.12.6:9102/pacientes/citas/parameto_id_medico

Ejemplo:http://127.121.12.6:9102/citas/pacientes/123456
- Este endponidn me muestra todos los pacientes que tienen citas con un médico específico


###### Tabla Citas
- Endpoind #1
- Method = GET 
http://127.121.12.6:9102/citas/orden
- Este endponidn me muestra todos las citas ordenados por su campo codigo de cita

- Endpoind #2
- Method = GET 
http://127.121.12.6:9102/citas/:id_paciente

Ejemplo :http://127.121.12.6:9102/citas/1
- Este endponidn me muestra la próxima cita para un paciente específico





###### Tabla Medico
- Endpoind #1
- Method = GET 
http://127.121.12.6:9102/Medico/especialidad/:especialiad

Ejemplo :http://127.121.12.6:9102/Medico/especialidad/Cardiología
- Este endponidn me muestra todos los médicos de una especialidad específica





# Desarrollo de entorno del proyecto
# Proyecto de nodejs
se instala con npm init -y


# Nodemon
npm i -E -D nodemon

--Este se instala para la ejeccucion de node en cada cambio realizado en el archivo app.js

# Express
npm i -E express

- Este se usa para el enrrutado, los endpionds de la aplicacion y para crear el servidor 

// https://expressjs.com/es/4x/api.html#express

# Dotenv
```
npm i -E -D dotenv
```

- Este es el que me permite manejar las variables de entorno
las colco de forma local usando la funcion config()

```javascript
import dotenv from 'dotenv';
dotenv.config();
```

luego ya puedes acceder a las variables de entorno asi: 
```javascript
let config = JSON.parse(process.env.MY_CONNECT);
```

- https://github.com/motdotla/dotenv

# Mysql2
```
npm i -E -D mysql2
```

- Este es una interfas patra interactuar con bases de datos MySQL esmucho mas rapida y efectiva.

// https://github.com/sidorares/node-mysql2

#### Instalamos class-transformer y class-validator
npm i -E -D class-validator
npm i -E -D class-tranformer

#### Instalamos la libreria para manejar DTO y Configuramos nuestro entorno de desarrollo

``` 
npm init -y
```

<Permite convertir objetos JavaScript/TypeScript en estructuras de datos JSON y viceversa>
npm i -E -D class-transformer

<Una dependencia requerida por class-transformer. Proporciona la capacidad de utilizar metadatos de decoradores en tiempo de ejecución en TypeScript>
npm i -E -D reflect-metadata

<Es un lenguaje de programación basado en JavaScript que agrega características de tipo estático a JavaScript>
npm i -E -D typescript

<Esta libreria es para ejecutar los cambios en el servidor en tiempo real>
npm i -E -D nodemon  

- Como debe estar el package.json
```json
  "scripts": {
    "dev":"nodemon ./app",
    "tsc": "tsc -w"
  },
```
- Creamos el archivo tscongig.json y colocamos lo siguiente
```json
{
    "compilerOptions": {
        "target": "es6", 
        "module": "ES6", 
        "moduleResolution": "node",
        "outDir": "./controller", 
        "esModuleInterop": true,
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true
    }
}
```
##### luego hacemos validos los cambios de la siguientre manera
- Agregamos esta linea en el archico package.json
    ```
    "tsc": "tsc -w"
    ```
    - Quedando el archivo asi
y despues tenemos el comando tsc __nombredelArchivo



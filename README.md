## Open Weather App

Este es un challenge tanto de back-end como de front-end para una aplicación para pedir el pronóstico del clima. Actualmente te permite dar el clima actual de la locación de donde se está viendo la página web junto con el pronóstico extendido de los siguientes 5 días.

También tenés la posiblidad de buscar el clima por ciudad, justo con su pronóstico extendido.

## Instalación

```bash
$ git clone https://github.com/javiash/Open-Weather-App
cd Open-Weather-App
```

**Back-end**

`Express - Cors - Axios - Nodemon`

```bash
cd server
npm install
npm start
```

**Front-end**
App creada con `create-react-app`

`React - fortawesome - @reduxjs/toolkit - axios - moment - node-sass - react-dom - react-redux - react-scripts`

```bash
cd client
npm install
npm start
```

---

## Uso

**Back-end**

Para ver la página web en modo producción deberán ir a la dirección http://localhost:4000

Para hacer consultas a la API deberán usar estas rutas en Postman o programa similar.

> Ruta base: http://localhost:4000/v1

> \*/location/
Esta dirección te dará el clima de tu locación actual en base a tu ip

> _/current/:ciudad
Esta dirección te permite acceder al clima de la ciudad que ingreses como parámetro o el clima de tu locación actual en base a tu ip si no se agregan parámetros. Ej: `_/current/`La forma correcta de escribir una ciudad es usando "-" en lugar de espacios. Ej:`\*/current/buenos-aires`

> _/forecast/:ciudad
Esta dirección te permite acceder al pronóstico de los próximos 5 días de la ciudad que ingreses como parámetro o el clima de tu locación actual en base a tu ip si no se agregan parámetros. Ej: `_/forecast/`La forma correcta de escribir una ciudad es usando "-" en lugar de espacios. Ej:`\*/forecast/nueva-york`

_Otros parámetros permitidos:_

| Parámetro | Por defecto | Opciones                        | Acción                                                        |
| --------- | ----------- | ------------------------------- | ------------------------------------------------------------- |
| lang      | 'es'        | Ver lista de idiomas soportados | Permite selecciar el idioma en el que se devuelve el pedido   |
| units     | metric      | 'metric', 'imperial'            | permite cambiar de grados Celcius (Cº) y grado Farenheit (Fº) |

Ej: `*/current/paris?lang=fr`o `*/current/california?lang=en&units=imperial`

_Idiomas soportados_
We support the following languages that you can use with the corresponded lang values:

- `af` Afrikaans
- `al` Albanian
- `ar` Arabic
- `az` Azerbaijani
- `bg` Bulgarian
- `ca` Catalan
- `cz` Czech
- `da` Danish
- `de` German
- `el` Greek
- `en` English
- `eu` Basque
- `fa` Persian (Farsi)
- `fi` Finnish
- `fr` French
- `gl` Galician
- `he` Hebrew
- `hi` Hindi
- `hr` Croatian
- `hu` Hungarian
- `id` Indonesian
- `it` Italian
- `ja` Japanese
- `kr` Korean
- `la` Latvian
- `lt` Lithuanian
- `mk` Macedonian
- `no` Norwegian
- `nl` Dutch
- `pl` Polish
- `pt` Portuguese
- `pt_br` Português Brasil
- `ro` Romanian
- `ru` Russian
- `sv, se` Swedish
- `sk` Slovak
- `sl` Slovenian
- `sp, es` Spanish
- `sr` Serbian
- `th` Thai
- `tr` Turkish
- `ua, uk` Ukrainian
- `vi` Vietnamese
- `zh_cn` Chinese Simplified
- `zh_tw` Chinese Traditional
- `zu` Zulu 

**Front-end**

Para ver la página en modo development deberán ingresar a la dirección http://localhost:3000

Al ingresar lo primero que verán es el clima y pronóstico de su ubicación actual basada en su ip.

En la parte inferior podrán buscar por ciudad, hasta 5 ciudades, su clima y su pronóstico de los siguientes 5 días.

En la parte superior hay un switch para cambiar entre grados Celcius y Farenheit, al igual que podrán cambiar el idioma de la página. Actualmente podrán elegir entre _español_, _inglés_ y _francés_

Está optimizado para ver tanto en el escritorio con en un teléfono celular.

---

Muchas gracias.

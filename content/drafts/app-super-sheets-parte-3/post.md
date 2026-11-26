---
title: "De copiar y pegar en Apps Script a un flujo de ingeniería real con IA (Parte 3)"
series: "App del súper con Google Sheets + IA"
part: 3
status: draft
platform: linkedin
format: "post + carrusel (slides.pdf)"
tags:
  - AppsScript
  - GoogleSheets
  - TDD
  - AgenticAI
  - SoftwareEngineering
  - Productividad
---

## Concepto del post

Cerrar la trilogía mostrando el salto natural cuando una web app sobre Google Sheets deja de ser un experimento de dos archivos y pasa a ser una herramienta que usas todos los días:

- **Problema real:** copiar y pegar `Code.gs` e `index.html` completos se vuelve tedioso cuando crece; estilos, lógica y vistas quedan mezclados y no ves un `diff` claro de qué cambió.
- **Solución práctica:** usar `clasp` (CLI oficial de Google) para sacar el proyecto a un repo local modular, sumar prácticas ligeras de ingeniería (Git, vista previa local, TDD con `node:test`, linter/Prettier, Husky y GitHub Actions) y apoyarte en un archivo de reglas para trabajar con un agente de código.
- **Flujo diario:** cero contacto con el editor web de Apps Script; validas en el entorno `/dev` y publicas en `/exec` sin cambiar la URL del teléfono.
- **Sin perder lo de Google:** mantienes infraestructura gratuita, Sheets como base de datos gestionada (y portátil si mañana cambias el frontend) y autenticación/autorización de Google.
- **Inclusivo para no-devs:** PMs y perfiles de negocio también pueden aprovecharlo con agentes de escritorio/CLI siguiendo un repositorio plantilla paso a paso — y si mañana el prototipo crece, se lo entregan a un desarrollador sobre una base ordenada.

---

## Copy del post (listo para LinkedIn)

```text
Copiar y pegar código en Apps Script te saca una web app en 5 minutos. Pero cuando la app crece y la usas todos los días, ese flujo deja de escalar.

En la Parte 1 y la Parte 2 te conté cómo armar una web app sobre Google Sheets sin servidores y sin pagar un dólar. Al principio el ida y vuelta con la IA es increíble: pides Code.gs e index.html, pegas y despliegas.

Hasta que llega el punto de quiebre: estilos, vistas y lógica viven en dos archivos gigantes. Para cambiar un detalle pequeño tienes que tocar y pegar el archivo completo, sin ver un diff claro de qué cambió y con miedo a romper algo que ya funciona.

Hoy sigo trabajando sobre Google Sheets y Apps Script, pero con la experiencia de desarrollo de una web app en regla y sin tocar el editor web. Así fue el salto:

1️⃣ Salí del editor web con clasp
Es la herramienta oficial de Google para manejar proyectos de Apps Script desde tu computadora. Separas el código en módulos claros (servidor, vistas, estilos, lógica) y mantienes tu historial en Git.

2️⃣ Sumé red de seguridad ligera (sin sobreingeniería)
Una carpeta dev/ que no se sube a Apps Script, con vista previa local y pruebas automáticas con TDD (usando node:test, sin dependencias pesadas, en ~1 segundo). Más linter, Prettier, Husky antes de subir cambios y pruebas automáticas en GitHub Actions.

3️⃣ Entornos de prueba y producción (/dev y /exec)
Apps Script ya trae una implementación de prueba (/dev) y otra productiva (/exec). Además, desde terminal puedes actualizar /exec sin cambiar la URL que ya tienes anclada en el teléfono.

4️⃣ Un agente con reglas claras (cero copiar y pegar)
Con el repo modular, tests y un archivo de reglas (AGENTS.md / CLAUDE.md), ya ni copio ni pego código:
- Le pido al agente la funcionalidad nueva.
- Aplica TDD, modifica solo los módulos necesarios y sube a /dev.
- Reviso el git diff y pruebo el enlace en vivo.
- Si todo cuadra, le digo "pasemos a producción" y actualiza /exec.

Lo mejor es lo que NO pierdes:
✅ La infraestructura sigue siendo de Google (cero servidores, $0)
✅ Google Sheets sigue siendo tu base de datos gestionada (y si mañana cambias el frontend por otra cosa, tus datos siguen intactos)
✅ Autenticación y autorización siguen resueltas por Google, y los secretos viven fuera del repo

¿Y si no eres developer? Esto también te sirve.
Aunque suene técnico, hoy con agentes en tu computadora (Claude, Gemini, Codex o ChatGPT) no tienes que dominar cada línea: el agente sigue las reglas y te guía paso a paso. Y si tu prototipo sobre Sheets crece y mañana decides pasárselo a un desarrollador, ya le entregas una base modular, documentada y con tests — no un archivo imposible de mantener.

En el carrusel te muestro el flujo completo paso a paso.

👇 En el primer comentario te dejo un repositorio plantilla para que puedas replicar esta estructura desde cero (más los enlaces a la Parte 1 y Parte 2).

¿En qué momento decides pasar un prototipo hecho con IA a un flujo con Git, tests y despliegue controlado?

#AppsScript #GoogleSheets #IA #AgenticAI #TDD #SoftwareEngineering
```

---

## Primer comentario sugerido (para no perder alcance por enlace externo)

```text
Aquí tienes el repositorio plantilla para arrancar tu propio proyecto de Apps Script modular con clasp, tests y reglas para tu agente (paso a paso en el README):
👉 [URL_REPO_PLANTILLA]

Y por si quieres ver la serie completa:
- Parte 1 (cómo armé la app del súper sobre Google Sheets + Gemini): https://lnkd.in/p/exBTdGHj
- Parte 2 (paso a paso para crear tu primera web app en 5 minutos): https://lnkd.in/p/eyJtpd-a
```

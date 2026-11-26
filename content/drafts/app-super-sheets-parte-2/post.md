---
title: "Cómo crear tu primera web app sobre Google Sheets + IA paso a paso"
series: "App del súper con Google Sheets + IA"
part: 2
status: ready
platform: linkedin
format: "post + carrusel (slides.pdf)"
demo_url: "https://script.google.com/macros/s/AKfycbzfhQ0cwqw0i6upPb4tRyVScO9cQ0AL6m_1W4JC2JuiAklepkZi7x82VtkOj5qO4y1u/exec"
tags:
  - AppsScript
  - GoogleSheets
  - IA
  - Gemini
  - LowCode
  - Productividad
---

## Copy del post (listo para LinkedIn)

En el post anterior te conté cómo me armé mi app del súper usando solo Google Sheets, Apps Script e IA, sin servidores ni pagar un dólar.

La pregunta que más salió fue la más práctica: **¿por dónde se empieza realmente?**

La verdad es que yo tampoco arranqué dominando Apps Script. Abrí el editor guiado por Gemini, le pedí unos datos de prueba para armar un dashboard sencillo, pegué el código y en minutos ya tenía una web app corriendo sobre mi propia hoja de cálculo.

En el carrusel te muestro el paso a paso real, con capturas del proceso completo desde cero:

1️⃣ Creas un Google Sheet con tus columnas (si no tienes datos, le pides a Gemini una tabla de prueba).
2️⃣ Entras a **Extensiones → Apps Script** desde la misma hoja.
3️⃣ Le pides a Gemini o Claude `Code.gs` e `index.html` indicándole tu pestaña y tus columnas exactas.
4️⃣ Pegas ambos archivos y guardas.
5️⃣ Vas a **Implementar → Nueva implementación → Aplicación web** y abres el enlace.

Y lo mejor viene después: **la iteración**.
¿Quieres filtros por categoría y comercio? ¿Un buscador de productos o pasar luego a cargar gastos desde el teléfono? Le pides el ajuste a la IA, actualizas `index.html` y vuelves a implementar. Tu Google Sheet sigue siendo la base de datos.

En el primer comentario te dejo la **demo funcionando en vivo** y el enlace a la **Parte 1** por si te la perdiste. 👇

🔜 En la **Parte 3** subimos el nivel: qué pasa cuando la app crece y copiar/pegar ya no alcanza. Cómo pasar esto a un flujo dev-friendly con archivos modulares, TDD y un agente de código con reglas definidas.

¿Qué herramienta sencilla montarías primero sobre un Google Sheet?

#AppsScript #GoogleSheets #IA #Gemini #LowCode #Productividad

---

## Primer comentario sugerido (para no perder alcance por enlace externo)

Por si quieres verla corriendo en vivo sobre el Google Sheet de prueba (solo lectura, cero servidores):
👉 https://script.google.com/macros/s/AKfycbzfhQ0cwqw0i6upPb4tRyVScO9cQ0AL6m_1W4JC2JuiAklepkZi7x82VtkOj5qO4y1u/exec

Y si te perdiste la **Parte 1** (donde conté cómo armé mi app del súper con OCR de facturas sobre Google Sheets + Gemini):
👉 https://lnkd.in/p/exBTdGHj

El prompt exacto para replicarla está en la **Slide 4** del carrusel. Solo cambias el nombre de la pestaña y las columnas por las tuyas.

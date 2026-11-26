---
title: "Guión de Slides — Tu primera web app sobre Google Sheets + IA"
series: "App del súper con Google Sheets + IA"
part: 2
status: draft
format: "linkedin-carousel"
---

# Estructura de carrusel (7 slides — visual y escaneable)

> Regla: 1 paso por slide, texto grande (2–3 líneas máx.) + captura real del proceso.

## Slide 1 — Portada
- **Titular:** De una hoja de cálculo a una web app en 5 minutos (sin servidores ni costos)
- **Subtítulo:** Paso a paso con Google Sheets + Apps Script + IA (Parte 2)
- **Visual:** Captura limpia del mini dashboard final funcionando (móvil o desktop).

## Slide 2 — Punto de partida: tu Google Sheet
- **Titular:** 1. Crea tu hoja en Google Sheets
- **Texto:** No necesitas base de datos. Tu hoja *es* la base de datos. Si no tienes datos todavía, pídele a Gemini una tabla de ejemplo (ej. Fecha, Producto, Categoría, Comercio, Monto).
- **Visual:** Captura del Google Sheet con 10–15 filas de datos de prueba.

## Slide 3 — Abrir Apps Script
- **Titular:** 2. Abre Apps Script desde la misma hoja
- **Texto:** En el menú superior: **Extensiones → Apps Script**. Ya viene integrado en Google Sheets, no hay que instalar nada.
- **Visual:** Captura resaltando el menú `Extensiones → Apps Script`.

## Slide 4 — El prompt a Gemini / Claude
- **Titular:** 3. Pídele el código a la IA
- **Texto:** Dale el nombre de tu pestaña, tus columnas exactas y qué quieres ver (ej. total gastado, resumen por categoría y una tabla con filtro). Pídele `Code.gs` + `index.html`.
- **Visual:** Caja con el prompt corto y concreto (copiable).

## Slide 5 — Pegar los 2 archivos
- **Titular:** 4. Pega y guarda
- **Texto:**
  - `Code.gs`: lee los datos de la hoja y sirve la web.
  - `index.html`: la interfaz visual del dashboard.
- **Visual:** Captura del editor de Apps Script mostrando los 2 archivos en el panel izquierdo.

## Slide 6 — Desplegar en 3 clics
- **Titular:** 5. Publica tu aplicación web
- **Texto:** **Implementar → Nueva implementación → Tipo: Aplicación web**. Acepta permisos y listo: tienes un link propio para abrir desde el navegador o el teléfono.
- **Visual:** Captura del modal de "Nueva implementación" + resultado en pantalla.

## Slide 7 — Cómo se itera + Cierre
- **Titular:** 6. Itera conversando con la IA
- **Texto:** ¿Quieres agregar un formulario para cargar gastos o un gráfico nuevo? Se lo pides a la IA, pegas el cambio y actualizas la implementación.
- **Puente a Parte 3:** Próximo post → cuando copiar y pegar ya no alcanza (archivos modulares, TDD y agente de código).
- **CTA:** ¿Qué herramienta sencilla montarías primero sobre un Google Sheet?

---
title: "Prompts para Gemini — Mini dashboard de lectura sobre Google Sheets + Apps Script"
series: "App del súper con Google Sheets + IA"
part: 2
status: draft
---

# Prompts listos para grabar (y compartir en el post)

Flujo pensado para una **web app sencilla de solo lectura** sobre Google Sheets, con 3 pasos claros: datos → primera versión → iteración.

---

## Prompt 1 — Crear los datos de prueba para Google Sheets

> Genera una tabla con 15 filas de datos ficticios de compras del supermercado y farmacia para pegar directamente en Google Sheets.
> Usa exactamente estas 5 columnas: `Fecha`, `Producto`, `Categoría`, `Comercio`, `Monto`.
> Usa fechas del último mes, 4 categorías distintas (Alimentos, Limpieza, Farmacia, Bebidas), 3 comercios distintos y montos numéricos simples sin símbolo de moneda.

---

## Prompt 2 — Generar la web app en Apps Script (v1, solo lectura)

> Tengo un Google Sheet con una pestaña llamada `Compras` y estas columnas en la fila 1: `Fecha`, `Producto`, `Categoría`, `Comercio`, `Monto`.
>
> Quiero crear una web app sencilla de solo lectura con Google Apps Script para ver un dashboard limpio y responsive (mobile-first) con mis gastos.
>
> Dame exactamente dos archivos listos para copiar y pegar:
> 1. `Code.gs`: con `doGet()` y una función que lea los datos de la pestaña `Compras` y los devuelva como JSON al frontend.
> 2. `index.html`: un dashboard moderno y limpio (HTML + CSS + JS vanilla, sin dependencias externas pesadas) que muestre:
>    - 3 tarjetas resumen: total gastado, cantidad de compras y comercio donde más gasté.
>    - Un resumen visual con barras de gasto por categoría.
>    - Una tabla con el detalle de las compras.
>
> Dame el código completo de ambos archivos y los pasos breves para desplegarlo como Aplicación web en Apps Script.

---

## Prompt 3 — Mostrar la iteración (v2)

> La versión anterior ya está funcionando. Ahora quiero iterar sobre el `index.html` manteniendo `Code.gs` igual.
>
> Agrega en la parte superior del dashboard:
> - Un selector para filtrar por `Categoría` y otro por `Comercio`.
> - Un buscador rápido por nombre de `Producto`.
>
> Cuando cambie cualquier filtro, deben actualizarse automáticamente las tarjetas resumen, las barras por categoría y la tabla.
> Devuélveme el archivo `index.html` completo listo para copiar y pegar.

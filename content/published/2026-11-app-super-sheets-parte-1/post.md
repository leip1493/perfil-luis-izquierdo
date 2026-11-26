---
title: "Mi app del súper con Google Sheets + IA"
series: "App del súper con Google Sheets + IA"
part: 1
status: published
platform: linkedin
published_at: "2026-11"
activity_id: "activity-10"
tags:
  - AppsScript
  - GoogleSheets
  - IA
  - Gemini
  - LowCode
  - Productividad
link: "https://www.linkedin.com/in/luis-enrique-izquierdo-pe%C3%B1a/"
---

La lista del mercado por WhatsApp no me alcanzaba, así que me armé una app con Google Sheets e IA, sin pagar un dólar.

En casa nos pasábamos la lista de compras por WhatsApp. Era cómodo, pero no podía marcar lo que ya había comprado, ni saber si algo salía más barato en otro lado, ni cuánto gastaba en el mercado o en la farmacia.

Así que me hice una herramienta para mí, una web app sobre Google Sheets con Apps Script:
✅ Lista de compras con check de lo que ya compré
📸 Escaneo una factura, o solo un producto con su precio, y Gemini hace de OCR: me crea el registro, que después puedo editar
🧮 Si es una factura, revisa que la suma de los productos cuadre con el total
📊 Métricas, tendencias y comparación de precios por producto y por lugar
📱 Mobile first y con modo offline, como una PWA. La uso todos los días desde el teléfono

Lo mejor es lo que NO tuve que hacer:
- Nada de infraestructura ni servidores
- Nada de autenticación: si tienes acceso a la hoja, tienes acceso a la app
- Nada de costos: la API de Gemini en su tier gratis me ha alcanzado de sobra
- Nada de app nativa: una web bien pensada para móvil fue suficiente

¿Y el código? Apps Script es JavaScript. En esta etapa ni lo escribí: le pedía a la IA el archivo completo, lo pegaba en el editor y desplegaba. Eso lo puede hacer cualquiera con Claude o Gemini.

¿No eres developer? Esto también es para ti.
Si eres de producto, de finanzas o simplemente amas tu Excel, la base de datos sigue siendo tu hoja de cálculo. La editas como siempre y la web app muestra la información de forma más clara. Puede ser una lista de compras, tus cuentas personales, la parte administrativa de tu negocio o un tablero para presentarle datos a tu equipo.

¿Tiene limitaciones? Sí. Corre dentro de un iframe, con todo lo que eso implica, y los precios no se sincronizan con los supermercados porque salen de mi propio historial de compras.

Aun así, para la gran mayoría de las herramientas personales alcanza de sobra. El límite real es lo que se te ocurra.

🔜 En el próximo post: qué pasa cuando copiar y pegar ya no alcanza. Cómo la llevé a un flujo dev-friendly con archivos modulares, TDD y un agente de código al que solo le dicto, con reglas definidas, para que funcione como una web app que se respete.

¿Qué herramienta te harías tú? 👇

#AppsScript #GoogleSheets #IA #Gemini #LowCode #Productividad

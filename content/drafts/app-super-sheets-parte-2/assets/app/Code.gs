/**
 * Dashboard de Compras — solo lectura.
 * Lee la pestaña "Compras" y sirve el dashboard como aplicación web.
 */

const SHEET_NAME = 'Compras';
const COLUMNS = ['Fecha', 'Producto', 'Categoría', 'Comercio', 'Monto'];

/**
 * Punto de entrada de la aplicación web.
 * @return {HtmlOutput}
 */
function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('Dashboard de Compras')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

/**
 * Devuelve las compras de la hoja como JSON para el frontend.
 * @return {string} Un array de compras serializado como JSON.
 */
function getCompras() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  if (!sheet) {
    throw new Error('No se encontró la pestaña "' + SHEET_NAME + '".');
  }

  const values = sheet.getDataRange().getValues();
  if (values.length < 2) {
    return JSON.stringify([]);
  }

  const headers = values.shift().map(function (header) {
    return String(header).trim();
  });

  const index = {};
  COLUMNS.forEach(function (name) {
    index[name] = headers.indexOf(name);
  });

  const missing = COLUMNS.filter(function (name) {
    return index[name] === -1;
  });
  if (missing.length) {
    throw new Error('Faltan columnas en la hoja: ' + missing.join(', ') + '.');
  }

  const timezone = SpreadsheetApp.getActiveSpreadsheet().getSpreadsheetTimeZone();

  const rows = values
    .filter(function (row) {
      return String(row[index['Producto']]).trim() !== '';
    })
    .map(function (row) {
      return {
        fecha: formatFecha(row[index['Fecha']], timezone),
        producto: String(row[index['Producto']]).trim(),
        categoria: String(row[index['Categoría']]).trim(),
        comercio: String(row[index['Comercio']]).trim(),
        monto: toNumber(row[index['Monto']])
      };
    });

  return JSON.stringify(rows);
}

/**
 * Convierte una fecha de Sheets a un texto estable para la interfaz.
 */
function formatFecha(value, timezone) {
  if (value instanceof Date) {
    return Utilities.formatDate(value, timezone, 'dd/MM/yyyy');
  }
  return String(value).trim();
}

/**
 * Normaliza el monto a número, aceptando coma o punto decimal.
 */
function toNumber(value) {
  if (typeof value === 'number') {
    return value;
  }
  const limpio = String(value).replace(/[^\d,.-]/g, '').replace(',', '.');
  const numero = Number(limpio);
  return isNaN(numero) ? 0 : numero;
}

// para generar el código del ticket. Importamos crypto, un módulo nativo de Node.js que nos permite generar bytes aleatorios de manera segura. Esto es importante para evitar patrones predecibles en los códigos generados.
import crypto from "crypto";

// 2. Exportamos la función principal para que pueda ser utilizada en otros archivos de nuestro proyecto.
export function generateTicketCode() {

  // 3. Definimos el catálogo de caracteres permitidos que va a contener el código del ticket,
  // (alfanumérico sin 'O', '0', 'I', '1' para evitar confusiones visuales).
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

  // 4. Creamos una función auxiliar que generará un segmento de texto de la longitud que le pidamos.
  const generateSegment = (length) => {

    // 5. Inicializamos una cadena de texto vacía donde iremos acumulando los caracteres aleatorios.
    let result = "";

    // 6. Generamos una secuencia de bytes verdaderamente aleatorios usando el módulo crypto 
    // (mucho más seguro que Math.random).
    const bytes = crypto.randomBytes(length);

    // 7. Iniciamos un bucle for que se ejecutará tantas veces como la longitud ('length') solicitada para el segmento.
    for (let i = 0; i < length; i++) {

      // 8.Generamos un índice aleatorio, para elegir de a un caracter dentro de nuestro
      // catálogo de caracteres 'chars' ("ABCDEFGHJKLMNPQRSTUVWXYZ23456789")
      // y a ese caracter lo almacenamos acumulándolo en la variable 'result'.
      result += chars[bytes[i] % chars.length];
    }

    // 9. Retornamos el segmento de caracteres ya construido.
    return result;
  };

  // 10. Generamos un primer bloque de 4 caracteres llamando a nuestra función auxiliar.
  const segment1 = generateSegment(4);

  // 11. Generamos un segundo bloque de 4 caracteres de la misma manera.
  const segment2 = generateSegment(4);

  // 12. Retornamos el código final formateado usando Plantillas de Cadena (Template Literals) con el prefijo "TKT-".
  return `TKT-${segment1}-${segment2}`;
}
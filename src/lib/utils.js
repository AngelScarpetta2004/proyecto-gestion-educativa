// Convierte el primer carácter en mayúscula
export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  
  // Formatea fechas en formato DD/MM/YYYY
  export function formatDate(dateString) {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("es-CO", options);
  }
  
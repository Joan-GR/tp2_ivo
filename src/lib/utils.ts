export function formatearCantidad(cantidad: number, unidad: string): string {
  if (cantidad <= 0) return "";
  return `${cantidad} ${unidad}`;
}

export function validarItem(nombre: string, cantidad: number): boolean {
  if (!nombre || nombre.trim() === "") return false;
  if (cantidad < 0) return false;
  return true;
}
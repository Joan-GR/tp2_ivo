import { describe, it, expect } from 'vitest';
import { formatearCantidad, validarItem } from './utils';

describe('formatearCantidad', () => {
  it('devuelve string vacío si la cantidad es 0', () => {
    expect(formatearCantidad(0, 'kg')).toBe('');
  });

  it('devuelve la cantidad y unidad correctamente', () => {
    expect(formatearCantidad(2, 'kg')).toBe('2 kg');
  });

  it('devuelve string vacío si la cantidad es negativa', () => {
    expect(formatearCantidad(-1, 'kg')).toBe('');
  });
});

describe('validarItem', () => {
  it('retorna false si el nombre está vacío', () => {
    expect(validarItem('', 1)).toBe(false);
  });

  it('retorna false si la cantidad es negativa', () => {
    expect(validarItem('Leche', -1)).toBe(false);
  });

  it('retorna true si el nombre y cantidad son válidos', () => {
    expect(validarItem('Leche', 2)).toBe(true);
  });
});
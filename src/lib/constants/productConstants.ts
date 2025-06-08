
export const CATEGORIES = {
  EMPANADAS: { id: 'empanadas', displayName: 'Empanadas Argentinas', internalName: 'Empanadas' },
  CASTANHAS: { id: 'castanhas', displayName: 'Castanha de Caju', internalName: 'Castanhas' },
  ALL: { id: 'all', displayName: 'Todos os Produtos' }
};

export const getCategoryDisplayName = (internalName: string): string => {
  if (internalName === CATEGORIES.EMPANADAS.internalName) return CATEGORIES.EMPANADAS.displayName;
  if (internalName === CATEGORIES.CASTANHAS.internalName) return CATEGORIES.CASTANHAS.displayName;
  return internalName;
};

import { createContext, useState } from 'react';
import { DESPESAS } from '../data/despesas';

export const DespesasContext = createContext({
  despesas: [],
  adicionarDespesa: () => {},
  atualizarDespesa: () => {},
});

export default function DespesasProvider({ children }) {
  const [despesas, setDespesas] = useState(DESPESAS);

  function adicionarDespesa(nova) {
    setDespesas((atual) => [nova, ...atual]);
  }

  function atualizarDespesa(id, dados) {
    setDespesas((atual) => atual.map((d) => (d.id === id ? { ...d, ...dados } : d)));
  }

  return (
    <DespesasContext.Provider value={{ despesas, adicionarDespesa, atualizarDespesa }}>
      {children}
    </DespesasContext.Provider>
  );
}
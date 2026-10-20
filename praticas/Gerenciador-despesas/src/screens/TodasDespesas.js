import { useContext, useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import DespesaSaida from '../components/despesa/DespesaSaida';
import { DespesasContext } from '../store/despesas-context';
import { CATEGORIAS } from '../utils/categorias';

export default function TodasDespesas() {
  const { despesas } = useContext(DespesasContext);
  const [filtro, setFiltro] = useState('Todas');

  function filtrarPorCategoria(lista, categoria) {
    if (categoria === 'Todas') return lista;
    return lista.filter((despesa) => despesa.categoria === categoria);
  }

  const despesasFiltradas = filtrarPorCategoria(despesas, filtro);

  return (
    <View style={styles.container}>
      <View style={styles.filtros}>
        {['Todas', ...CATEGORIAS].map((cat) => (
          <Pressable
            key={cat}
            style={[styles.chip, filtro === cat && styles.chipAtivo]}
            onPress={() => setFiltro(cat)}
          >
            <Text style={filtro === cat && styles.chipTextoAtivo}>{cat}</Text>
          </Pressable>
        ))}
      </View>
      <DespesaSaida despesas={despesasFiltradas} periodo={filtro === 'Todas' ? 'Total' : filtro} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },
  filtros: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 },
  chip: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 16, backgroundColor: '#eee' },
  chipAtivo: { backgroundColor: '#3b5bdb' },
  chipTextoAtivo: { color: '#fff' },
});
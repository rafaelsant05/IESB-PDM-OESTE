import { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import DespesaSaida from '../components/despesa/DespesaSaida';
import { DespesasContext } from '../store/despesas-context';
import { getDiasAtras } from '../utils/data';

export default function DespesasRecentes() {
  const { despesas } = useContext(DespesasContext);
  const limite = getDiasAtras(new Date(), 7);
  const recentes = despesas.filter((d) => d.data >= limite);

  return (
    <View style={styles.container}>
      <DespesaSaida despesas={recentes} periodo="Últimos 7 dias" />
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, padding: 12 } });
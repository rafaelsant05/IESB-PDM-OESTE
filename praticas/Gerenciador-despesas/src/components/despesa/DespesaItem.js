import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getDataFormatada } from '../../utils/data';

export default function DespesaItem({ id, descricao, valor, data, categoria }) {
  const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.navigate('GerenciarDespesa', { despesaId: id })}>
      <View style={styles.item}>
        <View style={styles.esquerda}>
          <Text style={styles.descricao}>{descricao}</Text>
          <Text style={styles.data}>{getDataFormatada(data)}</Text>
          <View style={styles.tag}>
            <Text style={styles.tagTexto}>{categoria}</Text>
          </View>
        </View>
        <Text style={styles.valor}>R$ {valor.toFixed(2)}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: 12, marginVertical: 6, borderRadius: 8, backgroundColor: '#fff', elevation: 2,
  },
  esquerda: { gap: 4 },
  descricao: { fontSize: 16, fontWeight: 'bold' },
  data: { color: '#666' },
  tag: {
    alignSelf: 'flex-start', backgroundColor: '#e0e0e0', borderRadius: 12,
    paddingHorizontal: 10, paddingVertical: 2,
  },
  tagTexto: { fontSize: 12, color: '#333' },
  valor: { fontSize: 16, fontWeight: 'bold' },
});
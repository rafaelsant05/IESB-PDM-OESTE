import { useContext, useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DespesasContext } from '../store/despesas-context';
import { CATEGORIAS } from '../utils/categorias';
import { getDataFormatada } from '../utils/data';

export default function GerenciarDespesa({ route, navigation }) {
  const { despesas, adicionarDespesa, atualizarDespesa } = useContext(DespesasContext);

  const despesaId = route.params?.despesaId;
  const existente = despesas.find((d) => d.id === despesaId);

  const [descricao, setDescricao] = useState(existente ? existente.descricao : '');
  const [valor, setValor] = useState(existente ? String(existente.valor) : '');
  const [data, setData] = useState(existente ? existente.data : new Date());
  const [categoria, setCategoria] = useState(existente ? existente.categoria : '');
  const [mostrarData, setMostrarData] = useState(false);
  const [erro, setErro] = useState('');

  function tratarValor(texto) {
    const t = texto.replace(',', '.');
    if (/^\d*\.?\d{0,2}$/.test(t)) setValor(t);
  }

  function aoMudarData(evento, dataEscolhida) {
    setMostrarData(false);
    if (dataEscolhida) setData(dataEscolhida);
  }

  function confirmar() {
    const valorNumero = parseFloat(valor);

    if (!descricao.trim() || !valorNumero || valorNumero <= 0 || !categoria) {
      setErro('Preencha descrição, valor e categoria.');
      return;
    }

    const dados = { descricao: descricao.trim(), valor: valorNumero, data, categoria };

    if (existente) {
      atualizarDespesa(despesaId, dados);
    } else {
      adicionarDespesa({ id: Date.now().toString(), ...dados });
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.rotulo}>Descrição</Text>
      <TextInput style={styles.input} placeholder="Ex: Almoço"
        value={descricao} onChangeText={setDescricao} />

      <Text style={styles.rotulo}>Valor</Text>
      <TextInput style={styles.input} placeholder="Ex: 25.90"
        keyboardType="decimal-pad" value={valor} onChangeText={tratarValor} />

      <Text style={styles.rotulo}>Data</Text>
      <Pressable style={styles.input} onPress={() => setMostrarData(true)}>
        <Text>{getDataFormatada(data)}</Text>
      </Pressable>
      {mostrarData && <DateTimePicker value={data} mode="date" onChange={aoMudarData} />}

      <Text style={styles.rotulo}>Categoria</Text>
      <View style={styles.categorias}>
        {CATEGORIAS.map((cat) => (
          <Pressable
            key={cat}
            style={[styles.chip, categoria === cat && styles.chipAtivo]}
            onPress={() => setCategoria(cat)}
          >
            <Text style={categoria === cat && styles.chipTextoAtivo}>{cat}</Text>
          </Pressable>
        ))}
      </View>

      {erro !== '' && <Text style={styles.erro}>{erro}</Text>}

      <Pressable style={styles.botao} onPress={confirmar}>
        <Text style={styles.botaoTexto}>{existente ? 'Atualizar' : 'Adicionar'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  rotulo: { fontWeight: 'bold', marginBottom: 6 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 14 },
  categorias: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  chip: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 20, backgroundColor: '#eee' },
  chipAtivo: { backgroundColor: '#3b5bdb' },
  chipTextoAtivo: { color: '#fff' },
  erro: { color: 'red', marginBottom: 12 },
  botao: { backgroundColor: '#3b5bdb', padding: 14, borderRadius: 8, alignItems: 'center' },
  botaoTexto: { color: '#fff', fontWeight: 'bold' },
});
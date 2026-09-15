// App.js
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CompromissoInput from './components/CompromissoInput';
import CompromissoList from './components/CompromissoList';
import * as labels from './labels';

const STORAGE_KEY = '@rotina_iesb_compromissos';

export default function App() {
  const [texto, setTexto] = useState('');
  const [compromissos, setCompromissos] = useState([]);
  const [carregado, setCarregado] = useState(false); // evita salvar antes de carregar

  // ---------- useEffect Nº 1: CARREGAR do AsyncStorage ao montar o app ----------
  useEffect(() => {
    async function carregarCompromissos() {
      try {
        const dadosSalvos = await AsyncStorage.getItem(STORAGE_KEY);
        if (dadosSalvos !== null) {
          setCompromissos(JSON.parse(dadosSalvos));
        }
      } catch (erro) {
        Alert.alert('Erro ao carregar', 'Não foi possível carregar seus compromissos salvos.');
      } finally {
        setCarregado(true);
      }
    }
    carregarCompromissos();
  }, []);

  // ---------- useEffect Nº 2: SALVAR no AsyncStorage sempre que a lista mudar ----------
  useEffect(() => {
    if (!carregado) return; // não sobrescreve o storage antes da carga inicial
    async function salvarCompromissos() {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(compromissos));
      } catch (erro) {
        Alert.alert('Erro ao salvar', 'Não foi possível salvar seus compromissos.');
      }
    }
    salvarCompromissos();
  }, [compromissos, carregado]);

  // ---------- Adicionar ----------
  const adicionarCompromisso = () => {
    if (texto.trim() === '') {
      Alert.alert(labels.alertTituloVazio, labels.alertMensagemVazio);
      return;
    }

    const novoCompromisso = {
      id: Date.now().toString(), // id único e estável
      texto: texto.trim(),
      criadoEm: new Date().toLocaleString('pt-BR'),
    };

    setCompromissos((listaAtual) => [...listaAtual, novoCompromisso]); // nunca mutar direto
    setTexto('');
  };

  // ---------- Remover ----------
  const removerCompromisso = (id) => {
    setCompromissos((listaAtual) => listaAtual.filter((item) => item.id !== id));
  };

  const pendentes = compromissos.length;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {/* Cabeçalho em row */}
        <View style={styles.header}>
          <Image source={require('./assets/logo.png')} style={styles.logo} />
          <View>
            <Text style={styles.tituloApp}>{labels.tituloApp}</Text>
            <Text style={styles.contador}>
              {pendentes} {labels.contadorPendentesPrefixo}
            </Text>
          </View>
        </View>

        {/* Formulário (componentizado) */}
        <CompromissoInput
          value={texto}
          onChangeText={setTexto}
          onAdd={adicionarCompromisso}
          labels={labels}
        />

        {/* Lista (componentizada, ocupa o resto da tela) */}
        <CompromissoList
          itens={compromissos}
          onDelete={removerCompromisso}
          tituloLista={labels.tituloLista}
          listaVazia={labels.listaVazia}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F3F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 8,
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginRight: 12,
  },
  tituloApp: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  contador: {
    fontSize: 13,
    color: '#495057',
  },
});
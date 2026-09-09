import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  StatusBar,
} from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import MetaInput from './Components/Metainputs';
import MetaList from './Components/MetaList';

const STORAGE_KEY = '@metas_semestre';

export default function App() {
  // ----- ESTADO -----
  const [texto, setTexto] = useState('');
  const [metas, setMetas] = useState([]);
  const [carregando, setCarregando] = useState(true);


  useEffect(() => {
    async function carregarMetas() {
      try {
        const dados = await AsyncStorage.getItem(STORAGE_KEY);
        if (dados !== null) {
          setMetas(JSON.parse(dados));
        }
      } catch (erro) {
        console.log('Erro ao carregar metas:', erro);
        Alert.alert(
          'Erro ao carregar',
          'Não foi possível carregar suas metas salvas.'
        );
      } finally {
        setCarregando(false);
      }
    }

    carregarMetas();
  }, []);

  useEffect(() => {
    if (carregando) return;

    async function salvarMetas() {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(metas));
      } catch (erro) {
        console.log('Erro ao salvar metas:', erro);
        Alert.alert(
          'Erro ao salvar',
          'Não foi possível salvar suas metas. Tente novamente.'
        );
      }
    }

    salvarMetas();
  }, [metas, carregando]);



  function handleAdicionar() {
    const textoLimpo = texto.trim();

    if (textoLimpo.length === 0) {
      Alert.alert('Campo vazio', 'Digite uma meta antes de adicionar.');
      return;
    }

    const novaMeta = {
      id: Date.now().toString(), // id único e estável
      texto: textoLimpo,
      criadaEm: new Date().toISOString(),
      concluida: false,
    };

    // Nunca mutar o array antigo: sempre criar um array novo
    setMetas((metasAtuais) => [...metasAtuais, novaMeta]);
    setTexto('');
  }

  function handleRemover(id) {
    setMetas((metasAtuais) => metasAtuais.filter((meta) => meta.id !== id));
  }

  function handleToggleConcluida(id) {
    setMetas((metasAtuais) =>
      metasAtuais.map((meta) =>
        meta.id === id ? { ...meta, concluida: !meta.concluida } : meta
      )
    );
  }

  // ----- CONTADORES (desafio opcional) -----
  const pendentes = metas.filter((m) => !m.concluida).length;
  const concluidas = metas.filter((m) => m.concluida).length;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" />

        <View style={styles.header}>
          <Image
            source={require('./assets/icon.png')}
            style={styles.logo}
          />
          <View>
            <Text style={styles.titulo}>Metas do Semestre</Text>
            <Text style={styles.contador}>
              {pendentes} pendentes / {concluidas} concluídas
            </Text>
          </View>
        </View>

        <MetaInput
          value={texto}
          onChangeText={setTexto}
          onAdd={handleAdicionar}
        />

        <MetaList
          metas={metas}
          onDelete={handleRemover}
          onToggle={handleToggleConcluida}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f2f2f7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#4f46e5',
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 16,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  contador: {
    fontSize: 13,
    color: '#e0e0ff',
    marginTop: 2,
  },
});
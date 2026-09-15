// components/CompromissoList.js
// Recebe a lista via props e renderiza com FlatList (Aula 05 e 06)

import React from 'react';
import { View, Text, FlatList, Pressable, StyleSheet, Platform } from 'react-native';

export default function CompromissoList({ itens, onDelete, tituloLista, listaVazia }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{tituloLista}</Text>

      <FlatList
        data={itens}
        keyExtractor={(item) => item.id} // id estável, nunca o index
        style={{ flex: 1 }}
        contentContainerStyle={itens.length === 0 && styles.centralizado}
        ListEmptyComponent={<Text style={styles.vazio}>{listaVazia}</Text>}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={styles.itemTexto}>
              <Text style={styles.itemTitulo}>{item.texto}</Text>
              <Text style={styles.itemData}>{item.criadoEm}</Text>
            </View>

            <Pressable
              style={({ pressed }) => [
                styles.botaoRemover,
                pressed && styles.botaoRemoverPressionado,
              ]}
              onPress={() => onDelete(item.id)}
              android_ripple={Platform.OS === 'android' ? { color: '#ffffff55' } : undefined}
            >
              <Text style={styles.botaoRemoverTexto}>Excluir</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  centralizado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vazio: {
    color: '#888',
    fontStyle: 'italic',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    elevation: 2,
  },
  itemTexto: {
    flex: 1,
    marginRight: 8,
  },
  itemTitulo: {
    fontSize: 15,
  },
  itemData: {
    fontSize: 11,
    color: '#888',
    marginTop: 2,
  },
  botaoRemover: {
    backgroundColor: '#E03131',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  botaoRemoverPressionado: {
    opacity: 0.7,
  },
  botaoRemoverTexto: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
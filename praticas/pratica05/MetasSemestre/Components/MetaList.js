import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import MetaItem from './MetaItem';

/**
 * MetaList
 * Recebe o array de metas e renderiza usando FlatList
 * (mais performático que ScrollView para listas que podem crescer).
 *
 * Props:
 * - metas: Array<{ id, texto, criadaEm, concluida }>
 * - onDelete: function(id)
 * - onToggle: function(id)
 */
export default function MetaList({ metas, onDelete, onToggle }) {
  if (metas.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          Nenhuma meta cadastrada ainda. Adicione a primeira acima! 🎯
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={metas}
      keyExtractor={(item) => item.id} // NUNCA usar index aqui
      renderItem={({ item }) => (
        <MetaItem meta={item} onDelete={onDelete} onToggle={onToggle} />
      )}
      contentContainerStyle={styles.listContent}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 24,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    fontSize: 15,
  },
});
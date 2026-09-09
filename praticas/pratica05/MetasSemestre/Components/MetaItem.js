import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

/**
 * MetaItem
 * Renderiza uma única meta dentro da FlatList.
 *
 * Props:
 * - meta: { id, texto, criadaEm, concluida }
 * - onDelete: function(id)   -> remove a meta
 * - onToggle: function(id)   -> marca/desmarca como concluída (desafio opcional)
 */
export default function MetaItem({ meta, onDelete, onToggle }) {
  const data = new Date(meta.criadaEm).toLocaleDateString('pt-BR');

  return (
    <View style={styles.card}>
      <Pressable style={styles.textArea} onPress={() => onToggle(meta.id)}>
        <Text
          style={[
            styles.texto,
            meta.concluida && styles.textoConcluido, // estilo riscado
          ]}
        >
          {meta.texto}
        </Text>
        <Text style={styles.data}>Criada em {data}</Text>
      </Pressable>

      <Pressable
        onPress={() => onDelete(meta.id)}
        android_ripple={{ color: '#00000022', borderless: true }}
        style={({ pressed }) => [
          styles.deleteButton,
          pressed && { opacity: 0.5 },
        ]}
      >
        <Text style={styles.deleteText}>🗑️</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    marginHorizontal: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
  },
  textArea: {
    flex: 1,
    paddingRight: 8,
  },
  texto: {
    fontSize: 16,
    color: '#222',
  },
  textoConcluido: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  data: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  deleteButton: {
    padding: 8,
  },
  deleteText: {
    fontSize: 18,
  },
});
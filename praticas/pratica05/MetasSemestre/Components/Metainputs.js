import React from 'react';
import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';

/**
 * MetaInput
 * Componente "burro" (apresentacional): não guarda estado próprio.
 * Recebe o valor atual e as funções de callback via props.
 *
 * Props:
 * - value: string          -> texto atual do input (controlado pelo pai)
 * - onChangeText: function -> chamado a cada tecla digitada
 * - onAdd: function        -> chamado ao tocar no botão "Adicionar"
 */
export default function MetaInput({ value, onChangeText, onAdd }) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Digite uma nova meta de estudo..."
        placeholderTextColor="#888"
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onAdd}
        returnKeyType="done"
      />

      <Pressable
        onPress={onAdd}
        android_ripple={{ color: '#ffffff55', borderless: false }}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed, // feedback visual no iOS
        ]}
      >
        <Text style={styles.buttonText}>Adicionar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
    gap: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#4f46e5',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
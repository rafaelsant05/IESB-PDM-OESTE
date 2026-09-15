// components/CompromissoInput.js
// Componente "burro": só recebe props e dispara eventos pro pai (App.js)

import React from 'react';
import { View, TextInput, Pressable, Text, StyleSheet, Platform } from 'react-native';

export default function CompromissoInput({ value, onChangeText, onAdd, labels }) {
  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder={labels.placeholderCompromisso}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onAdd}
        returnKeyType="done"
      />
      <Pressable
        style={({ pressed }) => [
          styles.botao,
          pressed && styles.botaoPressionado,
        ]}
        onPress={onAdd}
        android_ripple={Platform.OS === 'android' ? { color: '#ffffff55' } : undefined}
      >
        <Text style={styles.botaoTexto}>{labels.botaoAdicionar}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  input: {
    width: '68%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginRight: 8,
    backgroundColor: '#fff',
  },
  botao: {
    flex: 1,
    backgroundColor: '#3B5BDB',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoPressionado: {
    opacity: 0.7,
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
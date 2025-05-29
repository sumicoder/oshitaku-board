import { Stack } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

export default function Tab() {
  return (
    <View style={styles.container}>
        <Stack.Screen
        options={{
            headerTitle: 'Settingsです',
        }}
    />
      <Text>Tab [Settings]</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

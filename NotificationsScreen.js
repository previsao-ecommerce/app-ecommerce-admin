// NotificationsScreen.js
import React from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const NotificationsScreen = () => {

  const navigation = useNavigation(); // Inicializa o navigation

  // Dados de notificações com status e tempo
  const notifications = [
    { id: '1', title: 'Calendario', time: '10:30 AM', status: 'concluído' },
    { id: '2', title: 'Vendas', time: '11:00 AM', status: 'pedente' },
    { id: '3', title: 'Recommendações', time: '12:15 PM', status: 'concluído' },
    { id: '4', title: 'Usuarios', time: '1:30 PM', status: 'concluído' },
    { id: '5', title: 'Monitoramento', time: '2:45 PM', status: 'pedente' },
    { id: '6', title: 'Alertas', time: '3:00 PM', status: 'concluído' },
  ];

  return (
    <View style={styles.container}>

      <Button title="Voltar para Home" onPress={() => navigation.navigate('Home')} />

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.notificationItem}>
            <View style={[styles.statusIndicator, item.status === 'concluído' ? styles.completed : styles.pending]} />
            <View style={styles.textContainer}>
              <Text style={styles.notificationTitle}>{item.title}</Text>
              <Text style={styles.notificationTime}>Time: {item.time}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f9f9f9' },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 16 },
  notificationItem: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#fff', borderRadius: 8, marginBottom: 8, elevation: 2 },
  statusIndicator: { width: 12, height: 12, borderRadius: 6, marginRight: 10 },
  completed: { backgroundColor: 'green' },
  pending: { backgroundColor: 'red' },
  textContainer: { flex: 1 },
  notificationTitle: { fontSize: 16, fontWeight: 'bold' },
  notificationTime: { fontSize: 14, color: '#555' },
});

export default NotificationsScreen;

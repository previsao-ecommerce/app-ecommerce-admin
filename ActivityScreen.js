// ActivityScreen.js
import React from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ActivityScreen = () => {

  const navigation = useNavigation(); // Inicializa o navigation

  // Lista de atividades com status, data e valor
  const activities = [
    { id: '1', description: 'Pedido Processado', date: '2023-11-01', amount: '$120.00', status: 'aprovado' },
    { id: '2', description: 'Pagamento Recebido', date: '2023-11-02', amount: '$250.00', status: 'aprovado' },
    { id: '3', description: 'Solicitação de Reembolso', date: '2023-11-03', amount: '$45.00', status: 'pendente' },
    { id: '4', description: 'Reembolso Processado', date: '2023-11-04', amount: '$45.00', status: 'aprovado' },
    { id: '5', description: 'Cadastro de Cliente', date: '2023-11-05', amount: 'N/A', status: 'aprovado' },
    { id: '6', description: 'Pedido Cancelado', date: '2023-11-06', amount: '$0.00', status: 'rejeitado' },
    { id: '7', description: 'Falha no Pagamento', date: '2023-11-07', amount: '$0.00', status: 'rejeitado' },
    { id: '8', description: 'Pedido Enviado', date: '2023-11-08', amount: '$150.00', status: 'aprovado' },
  ];

  return (
    <View style={styles.container}>

      <Button title="Voltar para Home" onPress={() => navigation.navigate('Home')} />

      <FlatList
        data={activities}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.activityItem}>
            <View style={[styles.statusIndicator, item.status === 'aprovado' ? styles.approved : styles.rejected]} />
            <View style={styles.textContainer}>
              <Text style={styles.activityText}>{item.description}</Text>
              <Text style={styles.detailText}>Date: {item.date}</Text>
              <Text style={styles.detailText}>Amount: {item.amount}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f9f9f9' },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginVertical: 16 },
  activityItem: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#fff', borderRadius: 8, marginBottom: 8, elevation: 2 },
  statusIndicator: { width: 10, height: 10, borderRadius: 5, marginRight: 10 },
  approved: { backgroundColor: 'green' },
  rejected: { backgroundColor: 'red' },
  textContainer: { flex: 1 },
  activityText: { fontSize: 16, fontWeight: 'bold' },
  detailText: { fontSize: 14, color: '#555' },
});

export default ActivityScreen;


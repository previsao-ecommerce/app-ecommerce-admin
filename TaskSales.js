// TaskSales.js
import React from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const TaskSales = () => {

  const navigation = useNavigation(); // Inicializa o navigation

  // Lista de tarefas de vendas com data e status
  const salesTasks = [
    { id: '1', task: 'Acompanhar o cliente', date: '2023-11-01', status: 'concluído' },
    { id: '2', task: 'Preparar relatório de vendas', date: '2023-11-02', status: 'pendente' },
    { id: '3', task: 'Apresentação de demonstração do produto', date: '2023-11-03', status: 'concluído' },
    { id: '4', task: 'Revisão de feedback do cliente', date: '2023-11-04', status: 'pendente' },
    { id: '5', task: 'Atualizar registros de CRM', date: '2023-11-05', status: 'concluído' },
  ];

  return (
    <View style={styles.container}>

      <Button title="Voltar para Home" onPress={() => navigation.navigate('Home')} />

      <FlatList
        data={salesTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <View style={[styles.statusIndicator, item.status === 'concluído' ? styles.completed : styles.pending]} />
            <View style={styles.textContainer}>
              <Text style={styles.taskText}>{item.task}</Text>
              <Text style={styles.detailText}>Date: {item.date}</Text>
              <Text style={styles.detailText}>Status: {item.status === 'concluído' ? 'concluído' : 'pendente'}</Text>
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
  taskItem: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#fff', borderRadius: 8, marginBottom: 8, elevation: 2 },
  statusIndicator: { width: 12, height: 12, borderRadius: 6, marginRight: 10 },
  completed: { backgroundColor: 'green' },
  pending: { backgroundColor: 'red' },
  textContainer: { flex: 1 },
  taskText: { fontSize: 16, fontWeight: 'bold' },
  detailText: { fontSize: 14, color: '#555' },
});

export default TaskSales;


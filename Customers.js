// Customers.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Customers = () => {

  const navigation = useNavigation(); // Hook para navegação

  // Lista de clientes simulada
  const customerList = [
    { id: '1', name: 'John Doe', email: 'john.doe@example.com', accountCreated: '2022-08-15', totalSpend: '$1,250.00', totalOrders: '45', photoUrl: 'https://via.placeholder.com/100' },
    { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com', accountCreated: '2021-05-10', totalSpend: '$980.00', totalOrders: '30', photoUrl: 'https://via.placeholder.com/100' },
    { id: '3', name: 'Alice Brown', email: 'alice.brown@example.com', accountCreated: '2023-01-20', totalSpend: '$450.00', totalOrders: '15', photoUrl: 'https://via.placeholder.com/100' },
  ];

  // Estado para armazenar o cliente selecionado
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  return (
    <View style={styles.container}>

      <Button title="Voltar para Home" onPress={() => navigation.navigate('Home')} />


      {/* Lista de Clientes */}
      {selectedCustomer === null ? (
        <FlatList
          data={customerList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.customerItem} onPress={() => setSelectedCustomer(item)}>
              <Text style={styles.customerName}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        // Detalhes do Cliente Selecionado
        <View style={styles.detailsContainer}>
          <TouchableOpacity onPress={() => setSelectedCustomer(null)} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Voltar à Lista</Text>
          </TouchableOpacity>
          <Image source={{ uri: selectedCustomer.photoUrl }} style={styles.userPhoto} />
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>Nome: {selectedCustomer.name}</Text>
            <Text style={styles.infoText}>Email: {selectedCustomer.email}</Text>
            <Text style={styles.infoText}>Conta Criada: {selectedCustomer.accountCreated}</Text>
            <Text style={styles.infoText}>Gasto Total: {selectedCustomer.totalSpend}</Text>
            <Text style={styles.infoText}>Total de Pedidos: {selectedCustomer.totalOrders}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f9f9f9' },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginVertical: 16 },
  customerItem: { padding: 16, backgroundColor: '#e0e0e0', borderRadius: 8, marginBottom: 8 },
  customerName: { fontSize: 16, fontWeight: 'bold' },
  detailsContainer: { alignItems: 'center', marginTop: 16 },
  backButton: { marginBottom: 16 },
  backButtonText: { color: '#007BFF', fontSize: 16 },
  userPhoto: { width: 100, height: 100, borderRadius: 50, marginBottom: 16 },
  infoContainer: { alignItems: 'center' },
  infoText: { fontSize: 16, marginVertical: 4, color: '#333' },
});

export default Customers;


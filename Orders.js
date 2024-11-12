// Orders.js
import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Orders = () => {

  const navigation = useNavigation(); // Hook para navegação

  // Dados simulados de pedidos
  const orders = [
    {
      id: '1',
      productImage: 'https://via.placeholder.com/100', // URL de exemplo para a imagem do produto
      description: 'Produto A - Descrição detalhada do produto A.',
      amount: 'R$120.00',
      date: '2023-11-01',
    },
    {
      id: '2',
      productImage: 'https://via.placeholder.com/100',
      description: 'Produto B - Descrição detalhada do produto B.',
      amount: 'R$85.00',
      date: '2023-11-02',
    },
    {
      id: '3',
      productImage: 'https://via.placeholder.com/100',
      description: 'Produto C - Descrição detalhada do produto C.',
      amount: 'R$45.00',
      date: '2023-11-03',
    },
  ];

  return (
    <View style={styles.container}>

      <Button title="Voltar para Home" onPress={() => navigation.navigate('Home')} />

      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.orderItem}>
            <Image source={{ uri: item.productImage }} style={styles.productImage} />
            <View style={styles.textContainer}>
              <Text style={styles.descriptionText}>{item.description}</Text>
              <Text style={styles.detailText}>Valor: {item.amount}</Text>
              <Text style={styles.detailText}>Data: {item.date}</Text>
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
  orderItem: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#fff', borderRadius: 8, marginBottom: 8, elevation: 2 },
  productImage: { width: 60, height: 60, borderRadius: 8, marginRight: 10 },
  textContainer: { flex: 1 },
  descriptionText: { fontSize: 16, fontWeight: 'bold' },
  detailText: { fontSize: 14, color: '#555' },
});

export default Orders;

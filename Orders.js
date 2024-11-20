// Orders.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Button, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const PUBLIC_KEY = 'pk_test_51QH88qGo50WW5CWAncc5sz3B4TF5fh02kq8uB4glKbpjTqgxNyM4iHEFKPXHLITv1A2xycH5cilnRdwF2xyYdyUW00PTiWUl2F';

const Orders = () => {
  const navigation = useNavigation();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('https://api.stripe.com/v1/climate/orders', {
          headers: {
            Authorization: `Bearer ${PUBLIC_KEY}`,
          },
        });

        const data = response.data.data.map((order) => ({
          id: order.id,
          object: order.object,
          amountFees: `R$ ${(order.amount_fees / 100).toFixed(2)}`,
          amountSubtotal: `R$ ${(order.amount_subtotal / 100).toFixed(2)}`,
          amountTotal: `R$ ${(order.amount_total / 100).toFixed(2)}`,
          beneficiary: order.beneficiary?.public_name || 'Não especificado',
        }));

        setOrders(data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <View style={styles.container}>
      <Button title="Voltar para Home" onPress={() => navigation.navigate('Home')} />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.orderItem}>
              <View style={styles.textContainer}>
                <Text style={styles.descriptionText}>ID: {item.id}</Text>
                <Text style={styles.detailText}>Objeto: {item.object}</Text>
                <Text style={styles.detailText}>Taxas: {item.amountFees}</Text>
                <Text style={styles.detailText}>Subtotal: {item.amountSubtotal}</Text>
                <Text style={styles.detailText}>Total: {item.amountTotal}</Text>
                <Text style={styles.detailText}>Beneficiário: {item.beneficiary}</Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f9f9f9' },
  orderItem: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#fff', borderRadius: 8, marginBottom: 8, elevation: 2 },
  textContainer: { flex: 1 },
  descriptionText: { fontSize: 16, fontWeight: 'bold' },
  detailText: { fontSize: 14, color: '#555' },
});

export default Orders;


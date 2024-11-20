// TaskSales.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const PUBLIC_KEY = 'pk_test_51QH88qGo50WW5CWAncc5sz3B4TF5fh02kq8uB4glKbpjTqgxNyM4iHEFKPXHLITv1A2xycH5cilnRdwF2xyYdyUW00PTiWUl2F';

const TaskSales = () => {
  const navigation = useNavigation();
  const [paymentIntents, setPaymentIntents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaymentIntents = async () => {
      try {
        const response = await axios.get('https://api.stripe.com/v1/payment_intents', {
          headers: {
            Authorization: `Bearer ${PUBLIC_KEY}`,
          },
        });

        const data = response.data.data.map((intent) => ({
          id: intent.id,
          object: intent.object,
          amount: `R$ ${(intent.amount / 100).toFixed(2)}`,
          created: new Date(intent.created * 1000).toLocaleDateString(),
          currency: intent.currency.toUpperCase(),
          paymentMethodTypes: intent.payment_method_types.join(', '),
        }));

        setPaymentIntents(data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar Payment Intents:', error);
        setLoading(false);
      }
    };

    fetchPaymentIntents();
  }, []);

  return (
    <View style={styles.container}>
      <Button title="Voltar para Home" onPress={() => navigation.navigate('Home')} />

      <Text style={styles.header}>Payment Intents</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={paymentIntents}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.taskItem}>
              <View style={styles.textContainer}>
                <Text style={styles.taskText}>ID: {item.id}</Text>
                <Text style={styles.detailText}>Objeto: {item.object}</Text>
                <Text style={styles.detailText}>Valor: {item.amount}</Text>
                <Text style={styles.detailText}>Data: {item.created}</Text>
                <Text style={styles.detailText}>Moeda: {item.currency}</Text>
                <Text style={styles.detailText}>Métodos de Pagamento: {item.paymentMethodTypes}</Text>
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
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 16 },
  taskItem: { flexDirection: 'column', padding: 16, backgroundColor: '#fff', borderRadius: 8, marginBottom: 8, elevation: 2 },
  textContainer: { flex: 1 },
  taskText: { fontSize: 16, fontWeight: 'bold' },
  detailText: { fontSize: 14, color: '#555', marginTop: 4 },
});

export default TaskSales;

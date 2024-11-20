// Dashboard.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Button, ActivityIndicator } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const PUBLIC_KEY = 'pk_test_51QH88qGo50WW5CWAncc5sz3B4TF5fh02kq8uB4glKbpjTqgxNyM4iHEFKPXHLITv1A2xycH5cilnRdwF2xyYdyUW00PTiWUl2F';

const Dashboard = () => {
  const navigation = useNavigation();
  const [payouts, setPayouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayouts = async () => {
      try {
        const response = await axios.get('https://api.stripe.com/v1/payouts', {
          headers: {
            Authorization: `Bearer ${PUBLIC_KEY}`,
          },
        });

        const data = response.data.data.map((payout) => ({
          id: payout.id,
          amount: payout.amount / 100, // Convertendo para reais
          arrival_date: new Date(payout.arrival_date * 1000).toLocaleDateString(),
          created: new Date(payout.created * 1000).toLocaleDateString(),
        }));

        setPayouts(data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar dados da API Stripe:', error);
        setLoading(false);
      }
    };

    fetchPayouts();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Button title="Voltar para Home" onPress={() => navigation.navigate('Home')} />

      <Text style={styles.chartTitle}>Resumo de Payouts</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : payouts.length > 0 ? (
        <BarChart
          data={{
            labels: payouts.map((payout) => payout.arrival_date), // Datas de chegada
            datasets: [{ data: payouts.map((payout) => payout.amount) }],
          }}
          width={Dimensions.get('window').width - 16}
          height={220}
          yAxisLabel="R$"
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
          style={{ marginVertical: 8, borderRadius: 16 }}
        />
      ) : (
        <Text style={styles.errorText}>Nenhum dado de payout disponível.</Text>
      )}

      {/* Detalhes dos Payouts */}
      <View>
        {payouts.map((payout) => (
          <View key={payout.id} style={styles.card}>
            <Text style={styles.cardTitle}>ID: {payout.id}</Text>
            <Text style={styles.cardText}>Valor: R$ {payout.amount.toFixed(2)}</Text>
            <Text style={styles.cardText}>Data de Chegada: {payout.arrival_date}</Text>
            <Text style={styles.cardText}>Criado em: {payout.created}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f4f4f4' },
  chartTitle: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginVertical: 8 },
  card: { backgroundColor: '#fff', padding: 16, borderRadius: 8, marginBottom: 16, elevation: 3 },
  cardTitle: { fontSize: 18, fontWeight: 'bold' },
  cardText: { fontSize: 16, marginTop: 4, color: '#333' },
  errorText: { textAlign: 'center', color: 'red', fontSize: 16, marginVertical: 16 },
});

export default Dashboard;

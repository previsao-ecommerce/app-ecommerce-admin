// Dashboard.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Button } from 'react-native';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';


const Dashboard = () => {

  const navigation = useNavigation(); // Inicializa o navigation

  const [revenue, setRevenue] = useState(0);
  const [salesCount, setSalesCount] = useState(0);
  const [highestPrice, setHighestPrice] = useState(0);

  // Simulando uma chamada à API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.example.com/sales');
        const data = response.data;
        setRevenue(data.totalRevenue);
        setSalesCount(data.totalSales);
        setHighestPrice(data.highestPrice);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <ScrollView style={styles.container}>

      <Button title="Voltar para Home" onPress={() => navigation.navigate('Home')} />


      {/* Cartões de Resumo */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Faturamento</Text>
        <Text style={styles.cardValue}>R$ {revenue}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Quantidade de Vendas</Text>
        <Text style={styles.cardValue}>{salesCount}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Maior Preço</Text>
        <Text style={styles.cardValue}>R$ {highestPrice}</Text>
      </View>

      {/* Gráfico de Faturamento Mensal */}
      <Text style={styles.chartTitle}>Faturamento Mensal</Text>
      <BarChart
        data={{
          labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
          datasets: [{ data: [5000, 6000, 8000, 7000, 9000, 10000] }],
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

      {/* Gráfico de Orders */}
      <Text style={styles.chartTitle}>Pedidos Mensais</Text>
      <BarChart
        data={{
          labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
          datasets: [{ data: [300, 400, 500, 450, 700, 650] }],
        }}
        width={Dimensions.get('window').width - 16}
        height={220}
        yAxisLabel="Pedidos"
        chartConfig={{
          backgroundColor: '#022173',
          backgroundGradientFrom: '#1e3c72',
          backgroundGradientTo: '#2a5298',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        style={{ marginVertical: 8, borderRadius: 16 }}
      />

      {/* Gráfico de Produtos Mais Vendidos */}
      <Text style={styles.chartTitle}>Produtos Mais Vendidos</Text>
      <PieChart
        data={[
          { name: 'Produto A', sales: 600, color: '#3b5998', legendFontColor: '#7F7F7F', legendFontSize: 15 },
          { name: 'Produto B', sales: 400, color: '#ffa726', legendFontColor: '#7F7F7F', legendFontSize: 15 },
          { name: 'Produto C', sales: 300, color: '#66bb6a', legendFontColor: '#7F7F7F', legendFontSize: 15 },
          { name: 'Produto D', sales: 200, color: '#ef5350', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        ]}
        width={Dimensions.get('window').width - 16}
        height={220}
        chartConfig={{
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="sales"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
        style={{ marginVertical: 8, borderRadius: 16 }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f4f4f4' },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginVertical: 16 },
  card: { backgroundColor: '#fff', padding: 16, borderRadius: 8, marginBottom: 16, elevation: 3 },
  cardTitle: { fontSize: 18, fontWeight: '500' },
  cardValue: { fontSize: 24, fontWeight: 'bold', color: '#3b5998', marginTop: 4 },
  chartTitle: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginVertical: 8 },
});

export default Dashboard;

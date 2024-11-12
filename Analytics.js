// Analytics.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Button } from 'react-native';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import { useNavigation } from '@react-navigation/native';

const Analytics = () => {

  const navigation = useNavigation(); // Inicializa o navigation

  return (
    <ScrollView style={styles.container}>
       <Button title="Voltar para Home" onPress={() => navigation.navigate('Home')} />

      {/* Gráfico de Revenue */}
      <Text style={styles.chartTitle}>Receita</Text>
      <LineChart
        data={{
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [{ data: [5000, 7000, 8000, 6500, 7200, 8500] }],
        }}
        width={Dimensions.get('window').width - 32}
        height={220}
        yAxisLabel="R$"
        chartConfig={{
          backgroundColor: '#e0f2f1',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#f0f0f0',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        style={styles.chart}
      />

      {/* Gráfico de Costs */}
      <Text style={styles.chartTitle}>Custos</Text>
      <BarChart
        data={{
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [{ data: [3000, 3500, 3200, 4000, 4500, 4200] }],
        }}
        width={Dimensions.get('window').width - 32}
        height={220}
        yAxisLabel="R$"
        chartConfig={{
          backgroundColor: '#f0f0f0',
          backgroundGradientFrom: '#ff8a80',
          backgroundGradientTo: '#ff5252',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        style={styles.chart}
      />

      {/* Gráfico de Acquisition */}
      <Text style={styles.chartTitle}>Aquisição</Text>
      <PieChart
        data={[
          { name: 'Social Media', population: 35, color: '#3b5998', legendFontColor: '#7F7F7F', legendFontSize: 15 },
          { name: 'Email Marketing', population: 25, color: '#ffa726', legendFontColor: '#7F7F7F', legendFontSize: 15 },
          { name: 'Search Engine', population: 20, color: '#66bb6a', legendFontColor: '#7F7F7F', legendFontSize: 15 },
          { name: 'Referral', population: 20, color: '#ef5350', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        ]}
        width={Dimensions.get('window').width - 32}
        height={220}
        chartConfig={{
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
        style={styles.chart}
      />

      {/* Gráfico de Monthly Profit */}
      <Text style={styles.chartTitle}>Lucro Mensal</Text>
      <LineChart
        data={{
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [{ data: [2000, 3500, 4800, 2500, 2700, 4300] }],
        }}
        width={Dimensions.get('window').width - 32}
        height={220}
        yAxisLabel="R$"
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#e0f7fa',
          backgroundGradientTo: '#80deea',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        style={styles.chart}
      />

      {/* Gráfico de Quarterly Revenue by Country */}
      <Text style={styles.chartTitle}>Receita Trimestral por País</Text>
      <BarChart
        data={{
          labels: ['Q1', 'Q2', 'Q3', 'Q4'],
          datasets: [
            { data: [8000, 8500, 9000, 9500], label: 'USA' },
            { data: [6000, 6500, 7000, 7500], label: 'Brazil' },
            { data: [4000, 4500, 5000, 5500], label: 'Canada' },
          ],
        }}
        width={Dimensions.get('window').width - 32}
        height={220}
        yAxisLabel="R$"
        chartConfig={{
          backgroundColor: '#f5f5f5',
          backgroundGradientFrom: '#dcedc8',
          backgroundGradientTo: '#aed581',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        style={styles.chart}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f9f9f9' },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginVertical: 16 },
  chartTitle: { fontSize: 18, fontWeight: 'bold', marginVertical: 10, textAlign: 'center' },
  chart: { marginVertical: 8, borderRadius: 8 },
});

export default Analytics;

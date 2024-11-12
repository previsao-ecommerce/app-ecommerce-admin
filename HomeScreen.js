// HomeScreen.js
import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { LineChart } from 'react-native-chart-kit';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  const [dateRange, setDateRange] = useState('custom');
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  // Dados do gráfico (exemplo)
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [5000, 7000, 8000, 6500, 7200, 8500],
        strokeWidth: 2,
      },
    ],
  };

  const recentOrders = [
    { id: '1', title: 'Pedido #001 - R$120.00' },
    { id: '2', title: 'Pedido #002 - R$220.00' },
    { id: '3', title: 'Pedido #003 - R$310.00' },
    { id: '4', title: 'Pedido #004 - R$80.00' },
    { id: '5', title: 'Pedido #005 - R$150.00' },
  ];

  const onChangeStartDate = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowStartPicker(Platform.OS === 'ios'); // Fecha o picker após seleção
    setStartDate(currentDate);
  };

  const onChangeEndDate = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowEndPicker(Platform.OS === 'ios'); // Fecha o picker após seleção
    setEndDate(currentDate);
  };

  const QuickAccessButton = ({ title, iconName, onPress }) => (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Ionicons name={iconName} size={20} color="#fff" style={styles.icon} />
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      
      {/* Botões de Acesso Rápido */}
      <View style={styles.quickAccessContainer}>
        <QuickAccessButton title="Analytics" iconName="analytics" onPress={() => navigation.navigate('Analytics')} />
        <QuickAccessButton title="Customers" iconName="people" onPress={() => navigation.navigate('Customers')} />
        <QuickAccessButton title="Orders" iconName="cart" onPress={() => navigation.navigate('Orders')} />
        <QuickAccessButton title="Task Sales" iconName="checkbox" onPress={() => navigation.navigate('Task Sales')} />
      </View>

      {/* Filtro de Data com Ícones de Calendário */}
      <Text style={styles.sectionTitle}>Visão Geral</Text>
      <View style={styles.dateFilterContainer}>
        <TouchableOpacity onPress={() => setShowStartPicker(true)} style={styles.dateIconContainer}>
          <Ionicons name="calendar-outline" size={24} color="black" />
          <Text style={styles.dateText}>{startDate.toLocaleDateString()}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setShowEndPicker(true)} style={styles.dateIconContainer}>
          <Ionicons name="calendar-outline" size={24} color="black" />
          <Text style={styles.dateText}>{endDate.toLocaleDateString()}</Text>
        </TouchableOpacity>
      </View>

      {showStartPicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          onChange={onChangeStartDate}
        />
      )}
      {showEndPicker && (
        <DateTimePicker
          value={endDate}
          mode="date"
          display="default"
          onChange={onChangeEndDate}
        />
      )}

      {/* Gráfico de Overview */}
      <LineChart
        data={data}
        width={Dimensions.get('window').width - 32}
        height={220}
        yAxisLabel="R$"
        chartConfig={{
          backgroundColor: '#f0f0f0',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#f4f4f4',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        style={styles.chart}
      />

      {/* Lista de Pedidos Recentes */}
      <Text style={styles.sectionTitle}>Pedidos Recentes</Text>
      <FlatList
        data={recentOrders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.orderItem}>
            <Text style={styles.orderText}>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f9f9f9' },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginVertical: 16 },
  quickAccessContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', marginBottom: 16 },
  button: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#3b5998', padding: 10, borderRadius: 8, margin: 5 },
  buttonText: { color: '#fff', fontWeight: 'bold', marginLeft: 8 },
  icon: { marginRight: 5 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginVertical: 10 },
  dateFilterContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginVertical: 10 },
  dateIconContainer: { flexDirection: 'row', alignItems: 'center', padding: 8, backgroundColor: '#e0e0e0', borderRadius: 8 },
  dateText: { marginLeft: 8, fontSize: 16 },
  chart: { marginVertical: 8, borderRadius: 8 },
  orderItem: { padding: 16, backgroundColor: '#fff', borderRadius: 8, marginVertical: 4, elevation: 2 },
  orderText: { fontSize: 16 },
});

export default HomeScreen;

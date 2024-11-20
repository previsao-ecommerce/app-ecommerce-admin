// HomeScreen.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { LineChart } from 'react-native-chart-kit';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const PUBLIC_KEY = 'pk_test_51QH88qGo50WW5CWAncc5sz3B4TF5fh02kq8uB4glKbpjTqgxNyM4iHEFKPXHLITv1A2xycH5cilnRdwF2xyYdyUW00PTiWUl2F';

const HomeScreen = ({ navigation }) => {
  const [climateOrders, setClimateOrders] = useState([]);
  const [payoutData, setPayoutData] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [loadingPayouts, setLoadingPayouts] = useState(true);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    // Fetch Climate Orders
    const fetchClimateOrders = async () => {
      try {
        const response = await axios.get('https://api.stripe.com/v1/climate/orders', {
          headers: {
            Authorization: `Bearer ${PUBLIC_KEY}`,
          },
        });

        const orders = response.data.data.map((order) => ({
          id: order.id,
          object: order.object,
          amountTotal: `R$ ${(order.amount_total / 100).toFixed(2)}`,
        }));

        setClimateOrders(orders);
        setLoadingOrders(false);
      } catch (error) {
        console.error('Erro ao carregar Climate Orders:', error);
        setLoadingOrders(false);
      }
    };

    fetchClimateOrders();
  }, []);

  useEffect(() => {
    // Fetch Payouts
    const fetchPayouts = async () => {
      try {
        const response = await axios.get('https://api.stripe.com/v1/payouts', {
          headers: {
            Authorization: `Bearer ${PUBLIC_KEY}`,
          },
        });

        const filteredPayouts = response.data.data
          .filter(
            (payout) =>
              new Date(payout.arrival_date * 1000) >= startDate &&
              new Date(payout.arrival_date * 1000) <= endDate
          )
          .map((payout) => ({
            amount: payout.amount / 100,
            arrivalDate: new Date(payout.arrival_date * 1000).toLocaleDateString(),
          }));

        setPayoutData(filteredPayouts);
        setLoadingPayouts(false);
      } catch (error) {
        console.error('Erro ao carregar Payouts:', error);
        setLoadingPayouts(false);
      }
    };

    fetchPayouts();
  }, [startDate, endDate]);

  const onChangeStartDate = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowStartPicker(false);
    setStartDate(currentDate);
  };

  const onChangeEndDate = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowEndPicker(false);
    setEndDate(currentDate);
  };

  return (
    <View style={styles.container}>
      {/* Quick Access Buttons */}
      <View style={styles.quickAccessContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Analytics')}>
          <Ionicons name="analytics" size={20} color="#fff" style={styles.icon} />
          <Text style={styles.buttonText}>Analytics</Text>
        </TouchableOpacity>
      </View>

      {/* Climate Orders */}
      <Text style={styles.sectionTitle}>Pedidos Climáticos</Text>
      {loadingOrders ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={climateOrders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.orderItem}>
              <Text style={styles.orderText}>ID: {item.id}</Text>
              <Text style={styles.orderText}>Objeto: {item.object}</Text>
              <Text style={styles.orderText}>Total: {item.amountTotal}</Text>
            </View>
          )}
        />
      )}

      {/* Payouts with Date Filter */}
      <Text style={styles.sectionTitle}>Resumo de Payouts</Text>
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
        <DateTimePicker value={startDate} mode="date" display="default" onChange={onChangeStartDate} />
      )}
      {showEndPicker && (
        <DateTimePicker value={endDate} mode="date" display="default" onChange={onChangeEndDate} />
      )}

      {loadingPayouts ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <LineChart
          data={{
            labels: payoutData.map((payout) => payout.arrivalDate),
            datasets: [{ data: payoutData.map((payout) => payout.amount) }],
          }}
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
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f9f9f9' },
  quickAccessContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', marginBottom: 16 },
  button: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#3b5998', padding: 10, borderRadius: 8, margin: 5 },
  buttonText: { color: '#fff', fontWeight: 'bold', marginLeft: 8 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginVertical: 10 },
  dateFilterContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginVertical: 10 },
  dateIconContainer: { flexDirection: 'row', alignItems: 'center', padding: 8, backgroundColor: '#e0e0e0', borderRadius: 8 },
  dateText: { marginLeft: 8, fontSize: 16 },
  chart: { marginVertical: 8, borderRadius: 8 },
  orderItem: { padding: 16, backgroundColor: '#fff', borderRadius: 8, marginVertical: 4, elevation: 2 },
  orderText: { fontSize: 16 },
});

export default HomeScreen;


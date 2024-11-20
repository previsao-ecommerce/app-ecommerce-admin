// Analytics.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Button, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const PUBLIC_KEY = 'pk_test_51QH88qGo50WW5CWAncc5sz3B4TF5fh02kq8uB4glKbpjTqgxNyM4iHEFKPXHLITv1A2xycH5cilnRdwF2xyYdyUW00PTiWUl2F';

const Analytics = () => {
  const navigation = useNavigation();
  const [reportTypes, setReportTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReportTypes = async () => {
      try {
        const response = await axios.get('https://api.stripe.com/v1/reporting/report_types', {
          headers: {
            Authorization: `Bearer ${PUBLIC_KEY}`,
          },
        });

        const data = response.data.data.map((report) => ({
          id: report.id,
          object: report.object,
          dataAvailableEnd: new Date(report.data_available_end * 1000).toLocaleDateString(),
          dataAvailableStart: new Date(report.data_available_start * 1000).toLocaleDateString(),
          defaultColumns: report.default_columns.join(', '),
        }));

        setReportTypes(data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar tipos de relatórios:', error);
        setLoading(false);
      }
    };

    fetchReportTypes();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Button title="Voltar para Home" onPress={() => navigation.navigate('Home')} />

      <Text style={styles.header}>Relatórios Disponíveis</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
      ) : (
        reportTypes.map((report) => (
          <View key={report.id} style={styles.card}>
            <Text style={styles.cardTitle}>ID: {report.id}</Text>
            <Text style={styles.cardText}>Objeto: {report.object}</Text>
            <Text style={styles.cardText}>Dados Disponíveis de: {report.dataAvailableStart}</Text>
            <Text style={styles.cardText}>Dados Disponíveis até: {report.dataAvailableEnd}</Text>
            <Text style={styles.cardText}>Colunas Padrão: {report.defaultColumns}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f9f9f9' },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginVertical: 16 },
  card: { backgroundColor: '#fff', padding: 16, borderRadius: 8, marginBottom: 16, elevation: 3 },
  cardTitle: { fontSize: 18, fontWeight: 'bold' },
  cardText: { fontSize: 16, marginTop: 4, color: '#333' },
});

export default Analytics;

// ActivityScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const PUBLIC_KEY = 'pk_test_51QH88qGo50WW5CWAncc5sz3B4TF5fh02kq8uB4glKbpjTqgxNyM4iHEFKPXHLITv1A2xycH5cilnRdwF2xyYdyUW00PTiWUl2F';

const ActivityScreen = () => {
  const navigation = useNavigation();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get('https://api.stripe.com/v1/events', {
          headers: {
            Authorization: `Bearer ${PUBLIC_KEY}`,
          },
        });

        // Transformando os dados para o formato desejado
        const formattedData = response.data.data.map((event) => ({
          id: event.id,
          description: event.data.object.description || 'Sem descrição',
          amount: event.data.object.amount ? `R$ ${(event.data.object.amount / 100).toFixed(2)}` : 'R$ 0,00',
          status: event.data.object.status || 'Desconhecido',
          date: new Date(event.created * 1000).toLocaleDateString(),
        }));

        setActivities(formattedData);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar atividades:', error);
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  return (
    <View style={styles.container}>
      <Button title="Voltar para Home" onPress={() => navigation.navigate('Home')} />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={activities}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.activityItem}>
              <View
                style={[
                  styles.statusIndicator,
                  item.status === 'paid' ? styles.approved : styles.inTransit,
                ]}
              />
              <View style={styles.textContainer}>
                <Text style={styles.activityText}>{item.description}</Text>
                <Text style={styles.detailText}>Data: {item.date}</Text>
                <Text style={styles.detailText}>Valor: {item.amount}</Text>
                <Text style={styles.detailText}>Status: {item.status}</Text>
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
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 8,
    elevation: 2,
  },
  statusIndicator: { width: 10, height: 10, borderRadius: 5, marginRight: 10 },
  approved: { backgroundColor: 'green' },
  inTransit: { backgroundColor: 'orange' },
  textContainer: { flex: 1 },
  activityText: { fontSize: 16, fontWeight: 'bold' },
  detailText: { fontSize: 14, color: '#555' },
});

export default ActivityScreen;

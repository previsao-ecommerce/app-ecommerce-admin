// NotificationsScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const PUBLIC_KEY = 'pk_test_51QH88qGo50WW5CWAncc5sz3B4TF5fh02kq8uB4glKbpjTqgxNyM4iHEFKPXHLITv1A2xycH5cilnRdwF2xyYdyUW00PTiWUl2F';

const NotificationsScreen = () => {
  const navigation = useNavigation();
  const [webhookEndpoints, setWebhookEndpoints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWebhookEndpoints = async () => {
      try {
        const response = await axios.get('https://api.stripe.com/v1/webhook_endpoints', {
          headers: {
            Authorization: `Bearer ${PUBLIC_KEY}`,
          },
        });

        const data = response.data.data.map((endpoint) => ({
          id: endpoint.id,
          object: endpoint.object,
          created: new Date(endpoint.created * 1000).toLocaleDateString(),
          description: endpoint.description || 'Sem descrição',
          enabledEvents: endpoint.enabled_events.join(', '),
        }));

        setWebhookEndpoints(data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar endpoints do webhook:', error);
        setLoading(false);
      }
    };

    fetchWebhookEndpoints();
  }, []);

  return (
    <View style={styles.container}>
      <Button title="Voltar para Home" onPress={() => navigation.navigate('Home')} />

      <Text style={styles.header}>Endpoints de Webhook</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={webhookEndpoints}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.notificationItem}>
              <View style={styles.textContainer}>
                <Text style={styles.notificationTitle}>ID: {item.id}</Text>
                <Text style={styles.notificationText}>Objeto: {item.object}</Text>
                <Text style={styles.notificationText}>Criado em: {item.created}</Text>
                <Text style={styles.notificationText}>Descrição: {item.description}</Text>
                <Text style={styles.notificationText}>Eventos Ativados: {item.enabledEvents}</Text>
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
  notificationItem: { flexDirection: 'column', alignItems: 'flex-start', padding: 16, backgroundColor: '#fff', borderRadius: 8, marginBottom: 8, elevation: 2 },
  textContainer: { flex: 1 },
  notificationTitle: { fontSize: 16, fontWeight: 'bold' },
  notificationText: { fontSize: 14, color: '#555', marginTop: 4 },
});

export default NotificationsScreen;

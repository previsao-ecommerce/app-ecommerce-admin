// Customers.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Button,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const PUBLIC_KEY =
  "pk_test_51QH88qGo50WW5CWAncc5sz3B4TF5fh02kq8uB4glKbpjTqgxNyM4iHEFKPXHLITv1A2xycH5cilnRdwF2xyYdyUW00PTiWUl2F";

const Customers = () => {
  const navigation = useNavigation();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(
          "https://1f84-2804-1e68-800c-474a-c450-99a-142e-25f3.ngrok-free.app/user"
        );

        setCustomers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const [selectedCustomer, setSelectedCustomer] = useState(null);

  console.log("Customers", customers);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={{ marginTop: 20 }}
        />
      ) : selectedCustomer === null ? (
        <FlatList
          data={customers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.customerItem}
              onPress={() => setSelectedCustomer(item)}
            >
              <Text style={styles.customerName}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <View style={styles.detailsContainer}>
          <TouchableOpacity
            onPress={() => setSelectedCustomer(null)}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>← Voltar à Lista</Text>
          </TouchableOpacity>

          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>ID: {selectedCustomer.id}</Text>
            <Text style={styles.infoText}>Nome: {selectedCustomer.name}</Text>
            <Text style={styles.infoText}>Email: {selectedCustomer.email}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f9f9f9" },
  customerItem: {
    padding: 16,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    marginBottom: 8,
  },
  customerName: { fontSize: 16, fontWeight: "bold" },
  detailsContainer: { alignItems: "center", marginTop: 16 },
  backButton: { marginBottom: 16 },
  backButtonText: { color: "#007BFF", fontSize: 16 },
  userPhoto: { width: 100, height: 100, borderRadius: 50, marginBottom: 16 },
  infoContainer: { alignItems: "center" },
  infoText: { fontSize: 16, marginVertical: 4, color: "#333" },
});

export default Customers;

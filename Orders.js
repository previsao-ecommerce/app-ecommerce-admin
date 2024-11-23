// Orders.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Button,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const PUBLIC_KEY =
  "pk_test_51QH88qGo50WW5CWAncc5sz3B4TF5fh02kq8uB4glKbpjTqgxNyM4iHEFKPXHLITv1A2xycH5cilnRdwF2xyYdyUW00PTiWUl2F";

const Orders = () => {
  const navigation = useNavigation();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "https://7027-186-249-40-252.ngrok-free.app/order",
          {}
        );

        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar pedidos:", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  console.log("Orders");

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={{ marginTop: 20 }}
        />
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.orderItem}>
              <View style={styles.textContainer}>
                <Text style={styles.descriptionText}>ID: {item.id}</Text>
                <Text style={styles.detailText}>Status: {item.status}</Text>
                <Text style={styles.detailText}>
                  Observação: {item.observation}
                </Text>
                <Text style={styles.detailText}>Total: {item.total}</Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f9f9f9" },
  orderItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 8,
    elevation: 2,
  },
  textContainer: { flex: 1 },
  descriptionText: { fontSize: 16, fontWeight: "bold" },
  detailText: { fontSize: 14, color: "#555" },
});

export default Orders;

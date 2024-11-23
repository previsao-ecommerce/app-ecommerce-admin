import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const Dashboard = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  const getData = async () => {
    setLoading(true);
    await axios
      .get(`https://7027-186-249-40-252.ngrok-free.app/order/dashboard`)
      .then((res) => {
        console.log("Response", res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log("Error", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  console.log("Data", data);

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={styles.infoContainer}>
          <View style={styles.card}>
            <Text style={styles.title}>Faturamento</Text>
            <Text style={styles.value}>
              R${" "}
              {parseFloat(data?.totalValue).toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.title}>Vendas</Text>
            <Text style={styles.value}>{data?.totalOrders} Vendas</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.title}>Produtos Vendidos</Text>
            <Text style={styles.value}>0 Produtos</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f4f4f4",
    justifyContent: "center",
    alignItems: "center",
  },
  infoContainer: {
    width: "100%",
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4a4a4a",
  },
  value: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#6c5ce7",
    marginTop: 8,
  },
});

export default Dashboard;

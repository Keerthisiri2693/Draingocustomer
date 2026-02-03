import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function CustomDrawer(props: any) {
  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
          }}
          style={styles.avatar}
        />
        <Text style={styles.name}>Driver Name</Text>
        <Text style={styles.sub}>Welcome 👋</Text>
      </View>

      {/* Drawer Menu Items */}
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      {/* Logout Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.logoutRow}>
          <Icon name="logout" size={20} color="#e63946" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#1DBF73",
    paddingVertical: 30,
    paddingHorizontal: 16,
  },

  avatar: {
    width: 65,
    height: 65,
    borderRadius: 40,
    backgroundColor: "#fff",
  },

  name: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginTop: 10,
  },

  sub: {
    color: "#f0f0f0",
    fontSize: 13,
  },

  footer: {
    borderTopWidth: 1,
    borderColor: "#eee",
    padding: 16,
  },

  logoutRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  logoutText: {
    color: "#e63946",
    fontWeight: "700",
    fontSize: 15,
  },
});

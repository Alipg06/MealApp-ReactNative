import React from "react";
import { StyleSheet, Switch, Text, View } from "react-native";

const FiltersSwitch = ({ label, state, onchange }) => {
  return (
    <View style={styles.filterContainer}>
      <Text style={styles.filterText}>{label}</Text>
      <Switch
        trackColor={{ true: "#351401" }}
        thumbColor="#351401"
        value={state}
        onValueChange={onchange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  filterText: {
    fontSize: 20,
    fontWeight: "400",
  },
});

export default FiltersSwitch;

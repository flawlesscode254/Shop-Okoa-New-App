import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Category from "../components/Category";
import Shop from "../components/Shop";

import Categories from "../data/Categories";

const ShopsScreen = () => {
  const [search, setSearch] = useState("");
  const [terms, setTerms] = useState([]);
  const [canSearch, setCanSearch] = useState(false);
  const [activeTab, setActiveTab] = useState("Clothing");

  return (
    <View>
      <View style={styles.searchSection}>
        <Ionicons name="business" color="#38f78e" size={24} />
        <TextInput
          value={search}
          onChangeText={(text) => setSearch(text)}
          style={styles.searchInput}
          placeholderTextColor="#FFF"
          placeholder="Type to search..."
        />
        <View>
          {canSearch ? (
            <ActivityIndicator size={24} color="#F69237" />
          ) : (
            <View>
              {search && terms.length === 0 ? (
                <TouchableOpacity
                  onPress={() => {
                    //   queryData();
                  }}
                >
                  <Ionicons name="search" color="#F69237" size={24} />
                </TouchableOpacity>
              ) : terms.length > 0 ? (
                <TouchableOpacity
                  onPress={() => {
                    setSearch("");
                    setTerms([]);
                  }}
                >
                  <Ionicons name="close-circle" color="#F69237" size={24} />
                </TouchableOpacity>
              ) : null}
            </View>
          )}
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesSection}
      >
        {Categories.map((item) => {
          return (
            <Category
              key={item?.id}
              title={item?.title}
              image={item?.image}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          );
        })}
      </ScrollView>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.shopsSection}
      >
        <Shop />
        <Shop />
      </ScrollView>
    </View>
  );
};

export default ShopsScreen;

const styles = StyleSheet.create({
  searchSection: {
    backgroundColor: "#0E2A47",
    marginVertical: 20,
    paddingVertical: 5,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 45,
    flexDirection: "row",
    paddingHorizontal: 20,
    color: "white",
    marginLeft: 10,
    marginRight: 10,
  },
  searchInput: {
    height: 40,
    flex: 1,
    color: "gray",
    borderRadius: 30,
    paddingLeft: 10,
    color: "white",
  },
  categoriesSection: {
    flexGrow: 0,
  },
  shopsSection: {
    flexGrow: 0,
    marginTop: 10,
    padding: 20
  },
});

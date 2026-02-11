import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";

import i18n from "../../../i18n"; // ✅ REAL i18n instance
import { useTranslation } from "react-i18next";

/* ================= DATA ================= */

const LANGUAGES = [
  { id: "ta", label: "தமிழ்" },
  { id: "te", label: "తెలుగు" },
  { id: "ml", label: "മലയാളം" },
  { id: "en", label: "English" },
  { id: "kn", label: "ಕನ್ನಡ" },
  { id: "hi", label: "हिंदी" },
];

const colors = {
  primary: "#00e600",
  primaryDark: "#00b300",
  primarySoft: "#E9FFE9",
  white: "#FFFFFF",
  black: "#000000",
  gray: "#6E6B7B",
  lightGray: "#F2F2F2",
};

/* ================= SCREEN ================= */

export default function SelectLanguageScreen({ navigation }: any) {
  const { t } = useTranslation(); // ✅ ONLY t (do NOT destructure i18n)
  const [selected, setSelected] = useState<string | null>(null);

  /* ===== LOAD SAVED LANGUAGE ===== */
  useEffect(() => {
    const loadLang = async () => {
      try {
        const saved = await AsyncStorage.getItem("APP_LANG");
        const lang = saved || i18n.language || "en";

        setSelected(lang);
        await i18n.changeLanguage(lang); // ✅ safe
      } catch (e) {
        console.log("Load language error:", e);
      }
    };

    loadLang();
  }, []);

  /* ===== CONFIRM ===== */
  const onConfirm = async () => {
    if (!selected) return;

    try {
      await i18n.changeLanguage(selected);

      await AsyncStorage.multiSet([
        ["APP_LANG", selected],
        ["LANGUAGE_SELECTED", "true"],
      ]);

      navigation.replace("LoginScreen");
    } catch (e) {
      console.log("Language change error:", e);
    }
  };

  return (
    <SafeAreaView style={styles.root} edges={["bottom"]}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      {/* ===== HEADER ===== */}
      <LinearGradient
        colors={[colors.primaryDark, colors.primary]}
        style={styles.header}
      >
        <View style={styles.iconRow}>
          <View style={styles.bubble}>
            <Text style={styles.bubbleText}>ఆ</Text>
          </View>
          <View style={styles.bubble}>
            <Text style={styles.bubbleText}>A</Text>
          </View>
        </View>
      </LinearGradient>

      {/* ===== WHITE SHEET ===== */}
      <View style={styles.sheet}>
        <Text style={styles.title}>{t("selectLanguage")}</Text>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.grid}>
            {LANGUAGES.map((item) => {
              const active = selected === item.id;
              return (
                <TouchableOpacity
                  key={item.id}
                  style={[styles.card, active && styles.cardSelected]}
                  onPress={() => setSelected(item.id)}
                  activeOpacity={0.8}
                >
                  <View>
                    <Text style={styles.langText}>{item.label}</Text>
                    <Text style={styles.dots}>••••••••••••</Text>
                  </View>

                  <View
                    style={[styles.radio, active && styles.radioSelected]}
                  >
                    {active && <View style={styles.radioInner} />}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        <TouchableOpacity
          style={[
            styles.confirmBtn,
            !selected && styles.confirmBtnDisabled,
          ]}
          disabled={!selected}
          onPress={onConfirm}
        >
          <Text style={styles.confirmText}>{t("continue")}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomSpacer} />
    </SafeAreaView>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.white },

  header: {
    height: 260,
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  iconRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },

  bubble: {
    width: 70,
    height: 70,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },

  bubbleText: {
    fontSize: 32,
    color: colors.white,
    fontWeight: "600",
  },

  sheet: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    marginTop: -20,
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  card: {
    width: "48%",
    minHeight: 72,
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  cardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primarySoft,
  },

  langText: { fontSize: 16, fontWeight: "500" },
  dots: { color: colors.gray, marginTop: 4 },

  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.gray,
    alignItems: "center",
    justifyContent: "center",
  },

  radioSelected: { borderColor: colors.primary },

  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },

  confirmBtn: {
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },

  confirmBtnDisabled: { backgroundColor: colors.lightGray },

  confirmText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
  },

  bottomSpacer: { height: 24, backgroundColor: colors.white },
});

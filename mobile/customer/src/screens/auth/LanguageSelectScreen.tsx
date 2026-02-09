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
import { useTranslation } from "react-i18next";
import colors from "../../theme/colors";

const LANGUAGES = [
  { id: "ta", label: "தமிழ்" },
  { id: "te", label: "తెలుగు" },
  { id: "ml", label: "മലയാളം" },
  { id: "en", label: "English" },
  { id: "kn", label: "ಕನ್ನಡ" },
  { id: "hi", label: "हिंदी" },
];

export default function SelectLanguageScreen({ navigation }: any) {
  const { i18n, t } = useTranslation();
  const [selected, setSelected] = useState<string | null>(null);

  /* LOAD SAVED LANGUAGE */
  useEffect(() => {
    const loadLang = async () => {
      const savedLang =
        (await AsyncStorage.getItem("APP_LANG")) || i18n.language;
      setSelected(savedLang);
    };
    loadLang();
  }, []);

  const onConfirm = async () => {
    if (!selected) return;

    await AsyncStorage.setItem("APP_LANG", selected);
    await AsyncStorage.setItem("LANGUAGE_SELECTED", "true");
    await i18n.changeLanguage(selected);

    navigation.replace("Login");
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar barStyle="light-content" />

      {/* HEADER */}
      <LinearGradient
        colors={[colors.primaryDark, colors.primary]}
        style={styles.header}
      >
        <View style={styles.iconRow}>
          <View style={styles.bubble}>
            <Text style={styles.bubbleText}>ஆ</Text>
          </View>
          <View style={styles.bubble}>
            <Text style={styles.bubbleText}>A</Text>
          </View>
        </View>
      </LinearGradient>

      {/* WHITE SHEET */}
      <View style={styles.sheet}>
        <Text style={styles.title}>{t("selectLanguage")}</Text>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.grid}>
            {LANGUAGES.map((item) => {
              const isSelected = selected === item.id;

              return (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.card,
                    isSelected && styles.cardSelected,
                  ]}
                  activeOpacity={0.8}
                  onPress={() => setSelected(item.id)}
                >
                  <View>
                    <Text style={styles.langText}>{item.label}</Text>
                    <Text style={styles.dots}>••••••••••••</Text>
                  </View>

                  <View
                    style={[
                      styles.radio,
                      isSelected && styles.radioSelected,
                    ]}
                  >
                    {isSelected && <View style={styles.radioInner} />}
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
          activeOpacity={0.8}
        >
          <Text style={styles.confirmText}>{t("continue")}</Text>
        </TouchableOpacity>
      </View>

      {/* BOTTOM COLOR */}
      <View style={styles.bottomSpacer} />
    </SafeAreaView>
  );
}

/* ---------- STYLES ---------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryDark,
  },

  header: {
    height: "45%",
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  iconRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 100,
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
    color: colors.black,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  card: {
    width: "48%",              // ✅ 2-column grid FIX
    minHeight: 72,
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.white,
  },

  cardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primarySoft,
  },

  langText: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.black,
  },

  dots: {
    color: colors.gray,
    marginTop: 4,
  },

  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.gray,
    justifyContent: "center",
    alignItems: "center",
  },

  radioSelected: {
    borderColor: colors.primary,
  },

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
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  confirmBtnDisabled: {
    backgroundColor: colors.lightGray,
  },

  confirmText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
  },

  bottomSpacer: {
    height: 40,
    backgroundColor: colors.white,
  },
});

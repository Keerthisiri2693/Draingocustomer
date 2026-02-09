import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  FlatList,
  Platform,
  BackHandler,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../theme/colors";

/* ================= FAQ DATA ================= */
export const FAQ: Record<string, { q: string; a: string }[]> = {
  "Payment & Pricing": [
    {
      q: "Why am I paying directly to the driver?",
      a: "You are paying directly to the service professional to ensure faster service, transparent pricing, and immediate confirmation.",
    },
    {
      q: "How much does drainage cleaning cost?",
      a: "Pricing depends on the work needed. You’ll see an estimated price before booking.",
    },
    {
      q: "Can I get a price estimate before booking?",
      a: "Yes. The app provides an estimated cost based on your selected issue.",
    },
    {
      q: "Can I pay after the service is completed?",
      a: "Yes. You can pay after service completion through the app or cash if enabled.",
    },
    { q: "I have other questions", a: "__CONTACT_SUPPORT__" },
  ],

  "Drainage Cleaning Services": [
    {
      q: "What drainage cleaning services do you offer?",
      a: "We offer sewage cleaning, outdoor drain cleaning, blockage removal, and emergency drainage services.",
    },
    {
      q: "What types of blockages can you fix?",
      a: "We fix sewage blockages and major drainage issues.",
    },
    {
      q: "Do you offer regular maintenance services?",
      a: "Yes. You can book periodic drainage maintenance through the app.",
    },
    {
      q: "Do you provide services for apartments and offices?",
      a: "Yes. We service homes, apartments, offices, shops, and commercial buildings.",
    },
    { q: "I have other questions", a: "__CONTACT_SUPPORT__" },
  ],

  "Booking & Availability": [
    {
      q: "Is drainage cleaning available in my area?",
      a: "Yes. The app shows service availability based on your location automatically.",
    },
    {
      q: "Can I cancel or reschedule my booking?",
      a: "Yes. You can cancel or reschedule before the professional arrives.",
    },
    {
      q: "Can I track the service professional in the app?",
      a: "Yes. You can track the professional in real time after booking.",
    },
    { q: "I have other questions", a: "__CONTACT_SUPPORT__" },
  ],

  "Safety & Support": [
    {
      q: "Is customer support available 24/7?",
      a: "Yes. Customer support is available 24/7 through chat and call.",
    },
    {
      q: "Do you follow safety and hygiene protocols?",
      a: "Yes. All professionals follow safety, hygiene, and protective guidelines.",
    },
    {
      q: "What should I do if I’m not satisfied with the service?",
      a: "You can raise a complaint in the app. Our support team will assist you quickly.",
    },
    { q: "I have other questions", a: "__CONTACT_SUPPORT__" },
  ],
};

/* ================= TYPES ================= */
type Message = {
  from: "bot" | "user";
  text: string;
  options?: any[];
};

/* ================= SCREEN ================= */
export default function HelpSupportScreen({ navigation }: any) {
  const listRef = useRef<FlatList>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      from: "bot",
      text: "Hi 👋 How can I help you today?",
      options: Object.keys(FAQ), // 👈 categories appear here
    },
  ]);

  const [category, setCategory] = useState<string | null>(null);

  /* ===== ANDROID BACK ===== */
  useEffect(() => {
    const backAction = () => {
      if (category) {
        restartChat();
        return true;
      }
      navigation.goBack();
      return true;
    };

    const handler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => handler.remove();
  }, [category]);

  /* ===== HELPERS ===== */
  const addMessage = (msg: Message) =>
    setMessages((prev) => [...prev, msg]);

  const selectCategory = (cat: string) => {
    setCategory(cat);

    addMessage({ from: "user", text: cat });
    addMessage({
      from: "bot",
      text: "Choose a question 👇",
      options: FAQ[cat],
    });
  };

  const selectQuestion = (q: any) => {
    addMessage({ from: "user", text: q.q });

    if (q.a === "__CONTACT_SUPPORT__") {
      addMessage({
        from: "bot",
        text:
          "No problem 😊\n\n" +
          "📞 Customer Care: +91 98765 43210\n" +
          "📧 Email: support@draingo.com\n" +
          "🕒 Available 24/7",
      });
      return;
    }

    addMessage({ from: "bot", text: q.a });
  };

  const restartChat = () => {
    setCategory(null);
    setMessages([
      {
        from: "bot",
        text: "Hi 👋 How can I help you today?",
        options: Object.keys(FAQ),
      },
    ]);
  };

  const endChat = () => {
    addMessage({
      from: "bot",
      text: "Thanks for chatting with us 😊\nHave a great day!",
    });

    setTimeout(restartChat, 3000);
  };

  return (
    <SafeAreaView style={styles.safe} edges={["bottom"]}>
      <StatusBar barStyle="light-content" />

      {/* ===== HEADER ===== */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <View style={{ marginLeft: 10 }}>
          <Text style={styles.headerTitle}>ChatBot</Text>
          <Text style={styles.headerSub}>● Online now</Text>
        </View>
      </View>

      {/* ===== CHAT ===== */}
      <FlatList
        ref={listRef}
        style={{ flex: 1 }}
        contentContainerStyle={styles.chat}
        data={messages}
        keyExtractor={(_, i) => i.toString()}
        onContentSizeChange={() =>
          listRef.current?.scrollToEnd({ animated: true })
        }
        renderItem={({ item }) => (
          <View>
            {/* Bubble */}
            <View
              style={[
                styles.bubble,
                item.from === "user"
                  ? styles.userBubble
                  : styles.botBubble,
              ]}
            >
              <Text
                style={
                  item.from === "user"
                    ? styles.userText
                    : styles.botText
                }
              >
                {item.text}
              </Text>
            </View>

            {/* Chips */}
            {item.options && (
              <View style={styles.options}>
                {item.options.map((opt, i) => {
                  const label =
                    typeof opt === "string" ? opt : opt.q;

                  return (
                    <TouchableOpacity
                      key={i}
                      style={styles.chipFull}
                      onPress={() =>
                        typeof opt === "string"
                          ? selectCategory(opt)
                          : selectQuestion(opt)
                      }
                    >
                      <Text style={styles.chipText}>
                        {label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          </View>
        )}
      />

      {/* ===== FOOTER ===== */}
      <View style={styles.footerWrapper}>
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.restartBtn}
            onPress={restartChat}
          >
            <Text style={styles.footerText}>🔁 Restart</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.endBtn}
            onPress={endChat}
          >
            <Text
              style={[
                styles.footerText,
                { color: colors.white },
              ]}
            >
              End Chat
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.primarySoft,
  },

  header: {
    height:
      Platform.OS === "android"
        ? 56 + StatusBar.currentHeight!
        : 56,
    paddingTop:
      Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  headerTitle: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "700",
  },
  headerSub: {
    color: "#DFFFE0",
    fontSize: 12,
  },

  chat: {
    padding: 16,
  },

  bubble: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 16,
    marginBottom: 10,
  },
  botBubble: {
    backgroundColor: colors.white,
    alignSelf: "flex-start",
  },
  userBubble: {
    backgroundColor: colors.primary,
    alignSelf: "flex-end",
  },
  botText: {
    color: colors.black,
    fontSize: 14,
  },
  userText: {
    color: colors.white,
    fontSize: 14,
  },

  options: {
    marginBottom: 10,
  },
  chipFull: {
    backgroundColor: colors.white,
    borderRadius: 22,
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: colors.primary,
    marginBottom: 10,
  },
  chipText: {
    color: colors.primaryDark,
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },

  footerWrapper: {
    backgroundColor: colors.primarySoft,
    paddingBottom: Platform.OS === "android" ? 8 : 20,
  },
  footer: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 12,
    paddingTop: 8,
  },
  restartBtn: {
    flex: 1,
    backgroundColor: "#E6F9EB",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.primary,
  },
  endBtn: {
    flex: 1,
    backgroundColor: colors.danger,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  footerText: {
    fontWeight: "700",
    fontSize: 14,
    color: colors.black,
  },
});

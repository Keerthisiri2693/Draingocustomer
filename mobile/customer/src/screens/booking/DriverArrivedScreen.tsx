import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  StatusBar,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../theme/colors";
import AppIcon from "../../components/AppIcon";

/* ================= TYPES ================= */
type WorkStatus = "ARRIVED" | "IN_PROGRESS" | "COMPLETED";

/* ================= SCREEN ================= */
const DriverArrivedScreen = ({ navigation, route }: any) => {
  const { t } = useTranslation();

  const vehicle = route?.params?.vehicle ?? "-";
  const address = route?.params?.address ?? "-";
  const dateParam = route?.params?.date;

  const formattedDate =
    typeof dateParam === "string"
      ? new Date(dateParam).toDateString()
      : dateParam
      ? new Date(dateParam).toDateString()
      : t("notScheduled");

  /* ================= STATE ================= */
  const [status, setStatus] = useState<WorkStatus>("ARRIVED");
  const [loading, setLoading] = useState(false);
  const [startedAt, setStartedAt] = useState<Date | null>(null);
  const [finishedAt, setFinishedAt] = useState<Date | null>(null);
  const [liveDuration, setLiveDuration] = useState("0 min 0 sec");
  const [finalDuration, setFinalDuration] = useState("-");

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const jobIdRef = useRef(
    `JOB-${Date.now()}-${Math.floor(Math.random() * 1000)}`
  );
  const jobId = jobIdRef.current;

  /* ================= TIMER ================= */
  useEffect(() => {
    if (status !== "IN_PROGRESS" || !startedAt) return;

    timerRef.current = setInterval(() => {
      const diff = Date.now() - startedAt.getTime();
      const mins = Math.floor(diff / 60000);
      const secs = Math.floor((diff % 60000) / 1000);
      setLiveDuration(`${mins} min ${secs} sec`);
    }, 1000);

    return () => timerRef.current && clearInterval(timerRef.current);
  }, [status, startedAt]);

  /* ================= API SIM ================= */
  const sendStartToServer = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);

    setStartedAt(new Date());
    setLiveDuration("0 min 0 sec");
    setStatus("IN_PROGRESS");
  };

  const sendFinishToServer = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);

    const finish = new Date();
    if (timerRef.current) clearInterval(timerRef.current);

    if (startedAt) {
      const diff = finish.getTime() - startedAt.getTime();
      const mins = Math.floor(diff / 60000);
      const secs = Math.floor((diff % 60000) / 1000);
      setFinalDuration(`${mins} min ${secs} sec`);
    }

    setFinishedAt(finish);
    setStatus("COMPLETED");
  };

  /* ================= ACTIONS ================= */
  const handleStartWork = () =>
    Alert.alert(t("startWork"), t("confirmStartWork"), [
      { text: t("cancel"), style: "cancel" },
      { text: t("start"), onPress: sendStartToServer },
    ]);

  const handleFinishWork = () =>
    Alert.alert(t("finishWork"), t("confirmFinishWork"), [
      { text: t("cancel"), style: "cancel" },
      { text: t("finish"), onPress: sendFinishToServer },
    ]);

  const getToolbarTitle = () =>
    status === "ARRIVED"
      ? t("driverArrivedTitle")
      : status === "IN_PROGRESS"
      ? t("workInProgress")
      : t("workCompleted");

  const getStatusText = () =>
    status === "ARRIVED"
      ? t("arrived")
      : status === "IN_PROGRESS"
      ? t("inProgress")
      : t("completed");

  /* ================= UI ================= */
  return (
    <SafeAreaView style={styles.safe} edges={["bottom"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* TOOLBAR */}
      <View
        style={[
          styles.toolbar,
          {
            paddingTop:
              Platform.OS === "android"
                ? (StatusBar.currentHeight ?? 0) + 8
                : 8,
          },
        ]}
      >
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <AppIcon type="ion" name="chevron-back" size={22} color={colors.primary} />
        </TouchableOpacity>

        <View style={styles.toolbarTextWrap}>
          <Text style={styles.toolbarTitle}>{getToolbarTitle()}</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* JOB DETAILS */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>{t("jobDetails")}</Text>
          <Info label={t("jobId")} value={jobId} />
          <Info label={t("vehicle")} value={vehicle.toUpperCase()} />
          <Info label={t("location")} value={address} />
          <Info label={t("scheduled")} value={formattedDate} />
        </View>

        <View style={{ height: 8 }} />

        {/* TIME TRACKING */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>{t("timeTracking")}</Text>

          <TimeRow
            icon="play-circle"
            label={t("startedAt")}
            value={startedAt?.toLocaleTimeString() ?? "--"}
          />
          <TimeRow
            icon="stop-circle"
            label={t("finishedAt")}
            value={finishedAt?.toLocaleTimeString() ?? "--"}
          />

          <View style={styles.durationBox}>
            <Text style={styles.durationLabel}>{t("duration")}</Text>
            <Text style={styles.durationValue}>
              {status === "IN_PROGRESS" ? liveDuration : finalDuration}
            </Text>
          </View>
        </View>

      

        <View style={{ height: 140 }} />
      </ScrollView>

      {/* ACTION BAR */}
      <View style={styles.bottomBar}>
        {loading && <ActivityIndicator color={colors.primary} />}

        {!loading && status === "ARRIVED" && (
          <TouchableOpacity style={styles.primaryBtn} onPress={handleStartWork}>
            <Text style={styles.primaryText}>{t("startCleaning")} →</Text>
          </TouchableOpacity>
        )}

        {!loading && status === "IN_PROGRESS" && (
          <TouchableOpacity
            style={[styles.primaryBtn, styles.finishBtn]}
            onPress={handleFinishWork}
          >
            <Text style={styles.primaryText}>{t("finishCleaning")} →</Text>
          </TouchableOpacity>
        )}

        {!loading && status === "COMPLETED" && (
          <TouchableOpacity
            style={styles.secondaryBtn}
            onPress={() =>
              navigation.navigate("BillSummary", {
                jobId,
                vehicle,
                address,
                startedAt: startedAt?.toISOString(),
                finishedAt: finishedAt?.toISOString(),
              })
            }
          >
            <Text style={styles.secondaryText}>{t("Bill Summary")}</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default DriverArrivedScreen;

/* ================= SMALL COMPONENTS ================= */
const Info = ({ label, value }: any) => (
  <>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </>
);

const TimeRow = ({ icon, label, value }: any) => (
  <View style={styles.timeRow}>
    <Ionicons name={icon} size={18} color="#6B7280" />
    <Text style={styles.timeLabel}>{label}</Text>
    <Text style={styles.timeValue}>{value}</Text>
  </View>
);

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },

  toolbar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderColor: "#E5E7EB",
    backgroundColor: "#fff",
    elevation: 2,
  },

  toolbarTextWrap: { marginLeft: 12 },

  toolbarTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.primary,
  },

  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    color:colors.primary,
  },


  scroll: { paddingBottom: 24 },

  card: {
    marginHorizontal: 16,
    padding: 20,
    borderRadius: 18,
    backgroundColor: "#fff",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    marginTop:20,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: "900",
    marginBottom: 12,
    color: "#111827",
  },

  label: {
    fontSize: 12,
    fontWeight: "700",
    color: "#6B7280",
    marginTop: 10,
  },

  value: {
    fontSize: 14,
    fontWeight: "800",
    color: "#111827",
  },

  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderColor: "#E5E7EB",
  },

  timeLabel: { flex: 1, marginLeft: 8, fontWeight: "700" },
  timeValue: { fontWeight: "800" },

 durationBox: {
  marginTop: 16,
  paddingVertical: 14,
  paddingHorizontal: 16,
  borderRadius: 14,
  backgroundColor: "#F3F4F6",
  alignItems: "center",
  borderWidth: 1,
  borderColor: "#E5E7EB",
},

durationLabel: {
  color: "#6B7280",
  fontSize: 12,
  fontWeight: "700",
},

durationValue: {
  color: "#111827",
  fontSize: 20,
  fontWeight: "900",
  marginTop: 4,
},


  statusWrap: { alignItems: "center", marginVertical: 20 },
  statusChip: { paddingHorizontal: 22, paddingVertical: 8, borderRadius: 30 },
  arrivedChip: { backgroundColor: "#FEF3C7" },
  progressChip: { backgroundColor: "#DBEAFE" },
  completedChip: { backgroundColor: "#DCFCE7" },
  statusText: { fontWeight: "900", fontSize: 12 },

  bottomBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 50,
    padding: 16,
   
  
    
  },

  primaryBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
  },

  finishBtn: { backgroundColor: "#DC2626" },

  primaryText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "900",
  },

  secondaryBtn: {
    backgroundColor: "#00e600",
    paddingVertical: 16,
    borderRadius: 16,
  },

  secondaryText: {
    textAlign: "center",
    fontWeight: "900",
    color: "#FFF",
  },
});

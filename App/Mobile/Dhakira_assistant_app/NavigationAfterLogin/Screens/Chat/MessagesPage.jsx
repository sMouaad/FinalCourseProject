import React, { useEffect, useRef, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
} from "react-native";

import Group from "./Group";
import Assistants from "./Assistants";
import TabBar from "./TabBar";
import { RefreshControl } from "react-native";
import { SERVER_IP } from "@env";
import { getData } from "../../../localStorage";
import Axios from "axios";

let previousOffsetX = 0;

const Home = ({ navigation }) => {
  const scrollview = useRef();
  const [activeTab, setActiveTab] = useState("all");
  const [patients, setPatients] = useState([]);
  const [fetched, setFetsched] = useState(false);
  const [refreshing, setRefreshing] = useState(true);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      // console.log("mesage");
      const userData = await getData("cookie");
      Axios.post(`http://${SERVER_IP}:3000/auth/profiles`, {
        accessToken: userData,
      })
        .then((res) => {
          if (res.data.status) {
            const result = [
              ...res.data.patientsCreated,
              ...res.data.secondaryPatients,
            ];

            setPatients(
              result.map((patient) => {
                return {
                  id: patient._id,
                  name: patient.name,
                };
              })
            );
          }
          setFetsched(true);
        })
        .catch((err) => {
          console.log("ScrollingBarPatients message hi" + err.response);
          console.log("ScrollingBarPatients message " + err);
        });
    };

    if (refreshing) {
      console.log("refreshing");
      fetchData();
      setRefreshing(false);
    }
  }, [refreshing]);
  // removeData("cookie");

  const handleScroll = (event) => {
    const tabs = ["all", "group", "assistants"];
    const { contentOffset, layoutMeasurement } = event.nativeEvent;
    const offsetX = contentOffset.x;
    const screenWidth = layoutMeasurement.width;
    const activeTabIndex = Math.floor(offsetX / screenWidth);
    const scrollFraction = (offsetX % screenWidth) / screenWidth;

    let nextTabIndex = activeTabIndex + 1;
    if (nextTabIndex >= tabs.length) nextTabIndex = activeTabIndex;

    // Determine the direction of scrolling
    const direction = offsetX > previousOffsetX ? 1 : -1;
    const isScrollingRight = direction === 1;

    // Smoothly transition between tabs
    const interpolateTab = (currentIndex, nextIndex, fraction) => {
      const currentTab = currentIndex;
      const nextTab = nextIndex;
      const interpolatedTab = currentTab + (nextTab - currentTab) * fraction;
      return interpolatedTab;
    };

    const interpolatedTab = interpolateTab(
      activeTabIndex,
      nextTabIndex,
      scrollFraction
    );
    const newActiveTabIndex = isScrollingRight
      ? Math.ceil(interpolatedTab)
      : Math.floor(interpolatedTab);

    // Update active tab directly
    setActiveTab(tabs[newActiveTabIndex]);

    // Update previousOffsetX for the next scroll event
    previousOffsetX = offsetX;
  };
  if (!fetched) {
    return (
      <ScrollView
        contentContainerStyle={styles.scrollViewActivityIndicator}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className="flex-1 justify-center">
          <ActivityIndicator size={"large"} />
        </View>
      </ScrollView>
    );
  }
  return (
    <View style={styles.container}>
      <Text
        className=" text-2xl text-center mx-4 font-medium rounded-[20px] text-[#654ff3]  bg-[#f2f1ff] p-2 my-[17px] "
        style={{
          shadowColor: "#654ff3",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          elevation: 15,
        }}
      >
        Messages
      </Text>
      {/* <TabBar
        onPress1={() => {
          scrollview.current.scrollTo({ x: 0 });
        }}
        onPress2={() => {
          scrollview.current.scrollToEnd();
        }}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      /> */}

      <ScrollView
        className
        ref={scrollview}
        style={{ flex: 1 }}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        keyboardShouldPersistTaps="handled"
      >
        <Assistants
          onPress={(name, id) => {
            navigation.navigate("Group", { patientName: name, patientId: id });
          }}
          data={patients}
        />
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  scrollViewActivityIndicator: {
    display: "flex",
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
  },
  container: {
    padding: 5,
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#f2f1ff",
  },
});

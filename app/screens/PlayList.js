import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import color from "../misc/color";
import PlayListInputModal from "../components/PlayListInputModal";

const PlayList = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.playListBanner}>
        <Text>My Playlist</Text>
        <Text style={styles.audioCount}>0 Songs</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={{ marginTop: 15 }}
      >
        <Text style={styles.playListBtn}>+ Add New Playlist</Text>
      </TouchableOpacity>
      <PlayListInputModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        //onSubmit={}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  audioCount: {
    marginTop: 3,
    opacity: 0.5,
    fontSize: 14,
  },
  playListBanner: {
    padding: 5,
    backgroundColor: "#E6E6E3",
    borderRadius: 5,
  },
  playListBtn: {
    color: color.ACTIVE_BG,
    letterSpacing: 1,
    fontWeight: "bold",
    fontSize: 14,
    padding: 5,
  },
});

export default PlayList;

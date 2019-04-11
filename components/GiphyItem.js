import React from "react";
import { Image, TouchableOpacity, View, StyleSheet } from "react-native";

export default class GiphyItem extends React.Component {
  render() {
    const { gif, sendGif } = this.props;
    const { fixed_height_downsampled } = gif;

    const styles = StyleSheet.create({
      container: {
        margin: 1
      },
      image: {
        width: Number(fixed_height_downsampled.width),
        height: Number(fixed_height_downsampled.height)
      }
    });

    return (
      <TouchableOpacity style={styles.container} onPress={sendGif}>
        <Image
          source={{ uri: fixed_height_downsampled.url }}
          style={styles.image}
        />
      </TouchableOpacity>
    );
  }
}

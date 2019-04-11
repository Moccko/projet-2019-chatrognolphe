import React from "react";
import {
  FlatList,
  View,
  Image,
  Text,
  TextInput,
  Alert,
  StyleSheet
} from "react-native";
import Giphy from "../data/Giphy";
import GiphyItem from "./GiphyItem";
import { DB, Admin } from "../data/Database";
import { connect } from "react-redux";

class GiphyCarousel extends React.Component {
  componentDidMount() {
    this.loadGifs();
  }

  currentOffset = 0;

  state = {
    gifsList: [],
    search: ""
  };

  getGifs(type) {
    Giphy[type]("gifs", {
      limit: 10,
      offset: (this.currentOffset += 10)
    })
      .then(data => {
        this.setState({
          gifsList: [...this.state.gifsList, ...data.data.map(g => g.images)]
        });
      })
      .catch(e =>
        Alert.alert(
          "Erreur",
          `Impossible de charger les GIFs, mais qu'est-ce que tu as fait encore ? ${e.toString()}`
        )
      );
  }

  loadGifs = text => {
    this.currentOffset = 0;
    this.getGifs("trending");
  };

  loadMoreGifs = () => {
    this.getGifs("trending");
  };

  sendGif = gif => {
    const { channel, user } = this.props;
    DB.collection("messages")
      .add({
        gif: gif.url,
        width: Number(gif.width),
        height: Number(gif.height),
        channel,
        sender: user.ref,
        sent: Admin.Timestamp.now()
      })
      .then(() => {
        const { closeCarousel } = this.props;
        closeCarousel();
      })
      .catch(e =>
        Alert.alert(
          "Oups",
          `Impossible d'envoyer ce GIF. Code : ${e.toString()}`
        )
      );
  };

  render() {
    const { style } = this.props;
    return (
      <View style={[styles.gifContainer, style]}>
        <FlatList
          data={this.state.gifsList}
          horizontal
          renderItem={({ item }) => (
            <GiphyItem
              gif={item}
              sendGif={() => this.sendGif(item.fixed_height)}
            />
          )}
          onEndReachedThreshold={0.5}
          onEndReached={this.loadMoreGifs}
          style={styles.gifContainer}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(GiphyCarousel);

const styles = StyleSheet.create({
  container: {},
  gifContainer: { height: 202 }
});

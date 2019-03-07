import React from 'react';
import {StyleSheet, Text, View, SafeAreaView} from 'react-native';

import SignIn from './screens/SignIn';

export default class App extends React.Component {
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <SignIn/>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

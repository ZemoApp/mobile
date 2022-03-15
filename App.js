import React from 'react';
import { View } from 'react-native';
import AppContainer from './src/RootNavigator';

class App extends React.Component {
  state = {
    loading: true,
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <AppContainer />
      </View>
    );
  }

}

export default App;
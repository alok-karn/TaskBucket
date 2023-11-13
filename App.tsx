import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen'
import { Appearance, StatusBar, StyleSheet, Switch, View,Text } from 'react-native';

const Stack = createStackNavigator();

const LightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
    text: 'black',
  }
}

const DarkThemes = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: 'black',
    text: 'white'
  }

}

const App: React.FC = () => {
  const [theme, setTheme] = React.useState(Appearance.getColorScheme() || 'light');

  React.useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme);
    });

    return () => {
      subscription.remove();
    }
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  }
  
  const now = new Date();

  const options = {
    weekday: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }

  const date = new Intl.DateTimeFormat('en-US', options).format(now);

  return (
    <NavigationContainer theme={theme === 'dark' ? DarkThemes : LightTheme}>
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor = {theme === 'dark' ? 'black' : 'white'}
      />
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Task Bucket' }}
          
        />
        
      </Stack.Navigator>
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>{date}</Text>
        </View>
      <View style={styles.themeToggle}>
        <Switch value={theme === 'dark'} onValueChange={toggleTheme} />
      </View>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  themeToggle: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  dateContainer: {
    position: 'absolute',
    top: 35,
    left: 18,
    marginTop: 2,
  },
  dateText: {
    fontSize: 12,
    color: '#bbb',
  }
})

export default App;

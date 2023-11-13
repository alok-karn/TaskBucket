import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Button, FlatList,Text, Alert } from 'react-native';

import IconButton from '../components/IconButton';


interface TodoItem {
  id: string;
  title: string;
  timestamp: string;
  deadline: Date;
  completed: boolean; // property for completed status
}

const HomeScreen: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [text, setText] = useState<string>('');

  const addTodo = () => {
    if (text.length > 0) {
    
      const timestamp = new Date().toLocaleString(undefined, {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      });
      const deadline = new Date(); // set your deadline here
      deadline.setHours(deadline.getHours() + 24); // set deadline to 24 hrs from now
      setTodos((prevTodos) => [
        ...prevTodos,
        {
          id: Math.random().toString(),
          title: text,
          timestamp: timestamp,
          deadline: deadline,
          completed: false, // default not completed
        },
      ]);
      setText('');
    }
  };

  const toggleTodo = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.filter((todo) => todo.id !== id)
    );
  };

  
  // OLD RENDER TODO ITEM FUNCTION

  const renderTodoItem = ({ item }: { item: TodoItem }) => {
    
    const handleDelete = () => {
      Alert.alert(
        'Delete Task',
        `Are you sure you want to delete "${item.title}"`,
        [
          {
            text: 'Cancel',
            style: 'cancel',
          }, {
            text: 'Delete', 
            onPress: () => deleteTodo(item.id),
            style: 'destructive'
          }
        ], {cancelable: true}
      )
    }
    
    
    return (

    <View>
      <View style={styles.timestampContainer}>
      <Text style={styles.timestamp}>{ item.timestamp}</Text>

      </View>

    <View style={[styles.item, item.completed && styles.completedItem]}>


      
      <TextInput
        style={[styles.title, item.completed && styles.completedTitle]}
        value={item.title}
        editable={false}
        />
      <IconButton onPress={() => toggleTodo(item.id)} iconName={item.completed ? "check-circle" : "check-circle-outline"} color={item.completed ? "#32c032" : "#8784d8"} />
      <IconButton onPress={handleDelete} iconName="delete-outline" color="tomato"/>
    </View>
    </View>
  );}


  

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter a task"
          value={text}
          onChangeText={(value) => setText(value)}
        />
      
        <IconButton onPress={addTodo} iconName="add-circle-outline" color="#211bd1"/>
        
      </View>
      <FlatList
        data={todos}
        renderItem={renderTodoItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
        
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffcfc',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 16,
  },
  input: {
    flex: 1,
    marginRight: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderColor: '#bbb',
    borderWidth: 1,
    borderRadius: 10,
    shadowColor: '#bbb',
    shadowRadius: 10,

  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderColor: '#bbb',
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 4,
    marginHorizontal: 16,
  },
  completedItem: {
    opacity: 0.7,
  },
  title: {
    flex: 1,
    marginLeft: 8,
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: '#777'
  },
  timestampContainer: {
    width: 150,
    backgroundColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginLeft: 20,
    marginTop: 15,
    alignItems: 'center',
  },
  timestamp: {
    color: '#999',
    fontSize: 12,
    // marginRight: 8,

  },
  list: {
    flex: 1,
    marginVertical: 16,
  },
});

export default HomeScreen;

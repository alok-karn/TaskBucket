import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, FlatList } from 'react-native';

interface TodoItem {
  id: string;
  title: string;
}

const HomeScreen: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [text, setText] = useState<string>('');

  const addTodo = () => {
    if (text.length > 0) {
      setTodos((prevTodos) => [
        ...prevTodos,
        {
          id: Math.random().toString(),
          title: text,
        },
      ]);
      setText('');
    }
  };

  const deleteTodo = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.filter((todo) => todo.id !== id)
    );
  };

  const renderTodoItem = ({ item }: { item: TodoItem }) => (
    <View style={styles.item}>
      <Button
        title="Delete"
        onPress={() => deleteTodo(item.id)}
        color="red"
      />
      <TextInput
        style={styles.title}
        value={item.title}
        editable={false}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter a task"
          value={text}
          onChangeText={(value) => setText(value)}
        />
        <Button title="Add" onPress={addTodo} />
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
    backgroundColor: '#fff',
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
  title: {
    flex: 1,
    marginLeft: 8,
  },
  list: {
    flex: 1,
    marginVertical: 16,
  },
});

export default HomeScreen;

import React from "react";
import { StyleSheet, FlatList, View } from "react-native";
import TodoItem from "./TodoItem";

const TodoList = ({ todos, onPress }) => {
    return (
        <View style={styles.container}>
            <FlatList
                data={todos}
                renderItem={({ item }) => (
                    <TodoItem item={item} onPress={() => onPress(item.id)} />
                )}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 16,
        marginHorizontal: 16,
    },
});

export default TodoList;

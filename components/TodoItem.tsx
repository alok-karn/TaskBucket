import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";



const TodoItem = ({ item, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.item}>
            <Text style={styles.title}>{item.title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    item: {
        padding: 16,
        marginTop: 16,
        borderColor: "#bbb",
        borderWidth: 1,
        // borderStyle: "dashed",
        borderRadius: 10,
    },
    title: {
        fontSize: 16,
    },
});

export default TodoItem;

import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Alert} from 'react-native';

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const handleAddTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { id: Date.now(), title: task, completed: false }]);
      setTask('');
    }
  };

  const toggleTaskCompletion = id => {
    const newTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(newTasks);
  };

  const handleDeleteTask = id => {
    Alert.alert(
      'Confirmation',
      'Êtes-vous sûr de vouloir supprimer cette tâche ?',
      [
        {
          text: 'Annuler',
          onPress: () => console.log('Annulation de la suppression'),
          style: 'cancel'
        },
        {
          text: 'Supprimer',
          onPress: () => {
            const updatedTasks = tasks.filter(task => task.id !== id);
            setTasks(updatedTasks);
          }
        }
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskContainer}>
      <TouchableOpacity onPress={() => toggleTaskCompletion(item.id)}>
        <Text style={[styles.task, item.completed && styles.completed]}>
          {item.title}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
        <Text style={styles.deleteButton}>Supprimer</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ajouter une tâche"
          onChangeText={text => setTask(text)}
          value={task}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
          <Text style={styles.buttonText}>Ajouter</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.list}
        data={tasks}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    borderColor: '#5E60CE',
    borderRadius: 21,
    padding: 10,
    flex: 1,
    borderWidth:3,
    fontSize: 15,
  },
  addButton: {
    backgroundColor: '#5E60CE',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
    borderRadius: 20,
    borderWidth:3,
    borderColor:'black'
  },
  deleteButton: {
    color: 'red',
    marginLeft: 10,
    fontSize:15
    
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  list: {
    width: '100%',
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  task: {
    flex: 1,
    padding: 10,
    backgroundColor: '#CA0202',
    fontSize:15,
    borderRadius: 21,
    width:220,
    color:'white',
    borderWidth:3,
    borderColor:'#5E60CE'
  },
  completed: {
    textDecorationLine: 'line-through',
    color: 'white',
    backgroundColor: 'green'
  },
});
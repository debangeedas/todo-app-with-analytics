import React, { useState, useEffect, useCallback } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Checkbox,
  Box,
  Stack
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import mixpanel from './mixpanel';
import { useAuth } from './auth.jsx';
import posthog from './posthog';

const LOCAL_STORAGE_KEY = 'todos';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const { user } = useAuth();
  const [hasIdentified, setHasIdentified] = useState(false);

  // Identify/alias Mixpanel user
  useEffect(() => {
    const mpDistinctId = mixpanel.get_distinct_id();
    if (user && user.uid && !hasIdentified) {
      // Alias anonymous with authenticated user
      mixpanel.alias(user.uid);
      mixpanel.identify(user.uid);
      mixpanel.people.set({
        $name: user.displayName,
        $email: user.email,
      });
      setHasIdentified(true);
    } else if (!user) {
      // Identify as anonymous for new session
      mixpanel.identify(mpDistinctId);
      setHasIdentified(false);
    }
  }, [user, hasIdentified]);

  // Load todos from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) setTodos(JSON.parse(stored));
  }, []);

  // Save todos to localStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const handleAdd = useCallback(() => {
    if (input.trim()) {
      const newTodo = { id: Date.now(), text: input.trim(), completed: false };
      setTodos((prev) => [...prev, newTodo]);
      mixpanel.track('Add Todo', { text: input.trim() });
      posthog.capture('add_todo', { text: input.trim() });
      setInput('');
    }
  }, [input]);

  const handleDelete = useCallback((id) => {
    const todo = todos.find((t) => t.id === id);
    setTodos((prev) => prev.filter((t) => t.id !== id));
    mixpanel.track('Delete Todo', { text: todo?.text || '', id });
    posthog.capture('delete_todo', { text: todo?.text || '', id });
  }, [todos]);

  const handleToggle = useCallback((id) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
    const todo = todos.find((t) => t.id === id);
    mixpanel.track(todo?.completed ? 'Mark Todo Incomplete' : 'Mark Todo Complete', { text: todo?.text || '', id });
    posthog.capture(todo?.completed ? 'mark_todo_incomplete' : 'mark_todo_complete', { text: todo?.text || '', id });
  }, [todos]);

  const handleClear = useCallback(() => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setTodos([]);
    mixpanel.track('Clear Cache');
    posthog.capture('clear_cache');
  }, []);

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          To-Do List
        </Typography>
        <Stack direction="row" spacing={2}>
          <TextField
            label="Add a new to-do"
            variant="outlined"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            fullWidth
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          />
          <Button variant="contained" onClick={handleAdd} sx={{ minWidth: 100 }}>
            Add
          </Button>
        </Stack>
        <List sx={{ mt: 2 }}>
          {todos.length === 0 && (
            <Typography align="center" color="text.secondary">
              No to-dos yet.
            </Typography>
          )}
          {todos.map((todo) => (
            <ListItem
              key={todo.id}
              secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(todo.id)}>
                  <DeleteIcon />
                </IconButton>
              }
              disablePadding
            >
              <Checkbox
                checked={todo.completed}
                onChange={() => handleToggle(todo.id)}
              />
              <ListItemText
                primary={todo.text}
                sx={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
              />
            </ListItem>
          ))}
        </List>
        <Box textAlign="center" mt={2}>
          <Button variant="outlined" color="error" onClick={handleClear}>
            Clear cache
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default TodoApp;

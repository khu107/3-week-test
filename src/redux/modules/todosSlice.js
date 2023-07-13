import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

/**
 * 2초 지연을 시키는 함수입니다 (비동기 작업).
 */
import { waitTwoSeconds } from '../../utils';

export const __addToDo = createAsyncThunk(
  '__addToDo',
  async (payload, thunkAPI) => {
    await waitTwoSeconds();

    const newTodo = payload;

    return newTodo;
  }
);

export const __deleteTodo = createAsyncThunk(
  '__deleteToDo',
  async (id, thunkAPI) => {
    await waitTwoSeconds();

    const updatedList = thunkAPI
      .getState()
      .todos.list.filter((todo) => todo.id !== id);

    return updatedList;
  }
);

const initialState = {
  list: [],
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.list.push(action.payload);
    },
    deleteTodo: (state, action) => {
      state.list = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(__addToDo.fulfilled, (state, action) => {
      state.list.push(action.payload);
    });
    builder.addCase(__deleteTodo.fulfilled, (state, action) => {
      state.list = action.payload;
    });
  },
});

export const { addTodo, deleteTodo } = todosSlice.actions;
export default todosSlice.reducer;

import { configureStore } from '@reduxjs/toolkit';
import drawerReducer from '../features/drawer/drawerSlice'
import contentReducer from '../features/task/contentSlice'
import detailsReducer from '../features/details/detailsSlice'

export const store = configureStore({
  reducer: {
    isDrawerVisible:drawerReducer,
    content:contentReducer,
    details:detailsReducer,
  }
});

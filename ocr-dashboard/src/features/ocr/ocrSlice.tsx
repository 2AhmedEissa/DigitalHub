import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { type OCRRequest, MockData } from "../../api/mockData";
import { type RootState } from "../../app/store";

const ocrAdapter = createEntityAdapter<OCRRequest>({
  sortComparer: (a, b) => a.id.localeCompare(b.id),
});

const initialState = ocrAdapter.getInitialState();
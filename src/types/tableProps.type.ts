import { Dispatch, SetStateAction } from "react";
import { TableDataType } from "./tableData.type";

export interface TableProps {
  setDeleted: Dispatch<SetStateAction<boolean>>;
  setPrices: Dispatch<SetStateAction<{ minPrice: string; maxPrice: string }>>;
  setAddress: Dispatch<SetStateAction<string>>;
  setName: Dispatch<SetStateAction<string>>;
  loading: boolean;
  data: TableDataType | null;
  prices: { minPrice: string; maxPrice: string };
  deleted: boolean;
  setSortBy: Dispatch<SetStateAction<string>>;
  setSort: Dispatch<SetStateAction<string>>;
}

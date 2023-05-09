import { tableDataMetaType } from "./tableDataMeta.type";

export interface TableDataType {
  data: {
    id: number;
    name: string;
    address: string;
    price: number;
    createdAt: string;
    updatedAt: string;
  }[];
  meta: tableDataMetaType;
}

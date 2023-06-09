import { ChangeEvent, MouseEvent } from "react";
import "./Table.css";
import { getUrl } from "../../utils";
import { TableProps } from "../../types";
import { selectItemsOptions } from "../../constants";
// Dispatch<SetStateAction<boolean>>
export const Table = ({
  setDeleted,
  deleted,
  prices,
  setPrices,
  setName,
  setAddress,
  loading,
  data,
  setSortBy,
  setSort
}: TableProps) => {
  const handleDelete = async (id: number) => {
    const response = await fetch(`${getUrl()}/${id}`, {
      method: "DELETE"
    });
    const data = await response.json();
    if (data.success) {
      setDeleted(!deleted);
    }
  };

  const handlePricesFilter = (e: ChangeEvent<HTMLInputElement>) => {
    setPrices({ ...prices, [e.target.name]: e.target.value });
  };

  const handleSort = (e: MouseEvent<HTMLDivElement>, order: string) => {
    console.log((e.target as HTMLDivElement).id, order);
    if ((e.target as HTMLDivElement).id === "name") {
      setSortBy("name");
    } else {
      setSortBy("price");
    }
    setSort(order);
  };

  return loading ? (
    <div>...loading</div>
  ) : (
    <div>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>
                <div className="table-header__container">
                  Name
                  <div className="table-sort-arrow" id="name" onClick={(e) => handleSort(e, "ASC")}>
                    ↑
                  </div>
                  <div
                    className="table-sort-arrow"
                    id="name"
                    onClick={(e) => handleSort(e, "DESC")}
                  >
                    ↓
                  </div>
                </div>
                <input className="filter-input" onChange={(e) => setName(e.target.value)} />
              </th>
              <th>
                <div className="table-header__container">Address</div>
                <select className="filter-input" onChange={(e) => setAddress(e.target.value)}>
                  {selectItemsOptions.map((item) => (
                    <option key={item.id} value={item.text === "ყველა" ? "" : item.text}>
                      {item.text}
                    </option>
                  ))}
                </select>
              </th>
              <th>
                <div className="table-header__container">
                  Price
                  <div
                    className="table-sort-arrow"
                    id="price"
                    onClick={(e) => handleSort(e, "ASC")}
                  >
                    ↑
                  </div>
                  <div
                    className="table-sort-arrow"
                    id="price"
                    onClick={(e) => handleSort(e, "DESC")}
                  >
                    ↓
                  </div>
                </div>
                <div className="table-price-fitlers__container">
                  minPrice:
                  <input
                    value={prices.minPrice}
                    onChange={handlePricesFilter}
                    name="minPrice"
                    className="table-price-input"
                    type="number"
                  />
                  maxPrice:
                  <input
                    value={prices.maxPrice}
                    onChange={handlePricesFilter}
                    name="maxPrice"
                    className="table-price-input"
                    type="number"
                  />
                </div>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.data?.map(({ id, name, address, price }) => (
                <tr key={id}>
                  <td>
                    <div className="table-body-item__container">{name}</div>
                  </td>
                  <td>
                    <div className="table-body-item__container">{address}</div>
                  </td>
                  <td>
                    <div className="table-body-item__container">{price} ₾</div>
                  </td>
                  <td>
                    <div className="table-body-item__container">
                      <button style={{ backgroundColor: "red" }} onClick={() => handleDelete(id)}>
                        delete item
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

import { useState, useEffect, ChangeEvent, useContext } from "react";
import "./Table.css";
import { useFetch } from "../../utils";
import { TableDataType } from "../../types";
import { Link } from "react-router-dom";
import { apiUrl, selectItemsOptions } from "../../constants";
import { SearchParamsContext } from "../../context";
import Pagination from "../pagination/Pagination";

export const Table = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [deleted, setDeleted] = useState(true);
  const [prices, setPrices] = useState({
    minPrice: "",
    maxPrice: "",
  });
  const { searchParams, setSearchParams } = useContext(SearchParamsContext);

  const handleDelete = async (id: number) => {
    const response = await fetch(`${apiUrl}/inventory/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    if (data.deleted) {
      setDeleted(!deleted);
    }
  };

  const handlePricesFilter = (e: ChangeEvent<HTMLInputElement>) => {
    setPrices({ ...prices, [e.target.name]: e.target.value });
  };

  const { data, loading }: { data: TableDataType | null; loading: boolean } =
    useFetch(
      `${apiUrl}/inventory?offset=22&name=${name}&address=${address}&page=${searchParams.get(
        "page"
      )}&minPrice=${prices.minPrice}&maxPrice=${prices.maxPrice}`,
      deleted
    );

  useEffect(() => {
    const currentPage = searchParams.get("page");
    const totalPages = data?.meta?.totalPages;
    const currentPageInt = currentPage ? parseInt(currentPage) : 0;

    if (!currentPage || currentPageInt < 0 || (data && !totalPages)) {
      setSearchParams(new URLSearchParams({ page: "0" }));
    } else if (totalPages && currentPageInt > totalPages) {
      setSearchParams(new URLSearchParams({ page: "0" }));
    }
  }, [searchParams, setSearchParams, data]);

  return loading ? (
    <div>...loading</div>
  ) : (
    <div className="table__container">
      <button>
        <Link to="/add">Add Item</Link>
      </button>
      <table>
        <thead>
          <tr>
            <th>
              Name
              <input
                className="filter-input"
                onChange={(e) => setName(e.target.value)}
              />
            </th>
            <th>
              Address
              <select
                className="filter-input"
                onChange={(e) => setAddress(e.target.value)}
              >
                {selectItemsOptions.map((item) => (
                  <option key={item.id} value={item.text}>
                    {item.text}
                  </option>
                ))}
              </select>
            </th>
            <th>
              Price
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
        <tbody className="table-body__container">
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
                    <button onClick={() => handleDelete(id)}>
                      delete item
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Pagination {...data?.meta} />
    </div>
  );
};

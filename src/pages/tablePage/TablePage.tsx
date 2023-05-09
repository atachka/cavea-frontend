import { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Table } from "../../components";
import { Pagination } from "../../components";
import { SearchParamsContext } from "../../context";
import { getUrl, useFetch } from "../../utils";
import "./TablePage.css";
import { TableDataType } from "../../types";

export const TablePage = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [deleted, setDeleted] = useState(true);
  const [prices, setPrices] = useState({
    minPrice: "",
    maxPrice: ""
  });

  const { searchParams, setSearchParams } = useContext(SearchParamsContext);

  const { data, loading }: { data: TableDataType | null; loading: boolean } = useFetch(
    getUrl({ name, address, page: searchParams.get("page"), prices }),
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

  return (
    <div className="table-page__container">
      <button>
        <Link to="/add">Add Item</Link>
      </button>
      <Table
        setDeleted={setDeleted}
        deleted={deleted}
        setPrices={setPrices}
        prices={prices}
        data={data}
        loading={loading}
        setName={setName}
        setAddress={setAddress}
      />
      <Pagination {...data?.meta} />
    </div>
  );
};

import { useContext } from "react";
import { tableDataMetaType } from "../../types";
import "./Pagination.css";
import { SearchParamsContext } from "../../context";
const Pagination = ({
  currentPage,
  totalItems,
  totalPages,
}: tableDataMetaType) => {
  const { searchParams, setSearchParams } = useContext(SearchParamsContext);

  const handlePagination = (amount: number) => {
    if (amount === 0 || !totalPages) {
      setSearchParams(new URLSearchParams({ page: "0" }));
      return;
    }
    if (amount === Infinity) {
      setSearchParams(
        new URLSearchParams({ page: `${totalPages && totalPages - 1}` })
      );
      return;
    } else {
      const currentPage = searchParams.get("page");

      const page = currentPage ? parseInt(currentPage) + amount : 0;
      if (totalPages && page >= totalPages) {
        setSearchParams(new URLSearchParams({ page: `${totalPages - 1}` }));
      } else {
        setSearchParams(
          new URLSearchParams({ page: `${page < 0 ? "0" : page}` })
        );
      }
    }
  };
  return (
    <div className="pagination__container">
      <button
        onClick={() => handlePagination(0)}
        className="pagination-button__container"
      >
        {"<<"}
      </button>
      <button
        onClick={() => handlePagination(-1)}
        className="pagination-button__container"
      >
        {"<"}
      </button>
      <div className="current-page__container">
        current page: {currentPage && currentPage - 1}
      </div>
      <button
        onClick={() => handlePagination(+1)}
        className="pagination-button__container"
      >
        {">"}
      </button>
      <button
        onClick={() => handlePagination(Infinity)}
        className="pagination-button__container"
      >
        {">>"}
      </button>
      total Items:{totalItems}
    </div>
  );
};

export default Pagination;

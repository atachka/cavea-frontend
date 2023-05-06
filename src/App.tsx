import "./App.css";
import { Routes, Route, useSearchParams, useNavigate } from "react-router-dom";
import { Table } from "./components";
import { Redirect } from "./components";
import { NavigateContext, SearchParamsContext } from "./context";

export const App = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  return (
    <div className="app__container">
      <SearchParamsContext.Provider value={{ searchParams, setSearchParams }}>
        <NavigateContext.Provider value={{ navigate }}>
          <Routes>
            <Route path="/" element={<Redirect />} />
            <Route path={`/table/`} element={<Table />} />
          </Routes>
        </NavigateContext.Provider>
      </SearchParamsContext.Provider>
    </div>
  );
};

export default App;

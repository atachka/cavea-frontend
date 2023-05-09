import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import "./AddItem.css";
import { addSelectItemOptions } from "../../constants";
import { Item } from "../../types";
import { getUrl } from "../../utils";

export const AddItem = () => {
  const [item, setItem] = useState<Item>({
    name: "",
    address: "მთავარი ოფისი",
    price: ""
  });

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleItemProperties = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const validate = (item: Item) => {
    for (const key in item) {
      if (item[key].length === 0) {
        alert(`${key} must not be empty`);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate(item)) {
      return;
    }

    const response = await fetch(`${getUrl()}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ...item })
    });
    const data = await response.json();
    if (data.success) {
      navigate(-1);
    }
  };

  return (
    <div className="add__container">
      <form className="add-input__container" onSubmit={handleSubmit}>
        name:
        <input onChange={handleItemProperties} name="name" />
        address:
        <select onChange={handleItemProperties} name="address">
          {addSelectItemOptions.map((item) => (
            <option key={item.id} value={item.text}>
              {item.text}
            </option>
          ))}
        </select>
        price:
        <input onChange={handleItemProperties} name="price" type="number" />
        <button type="submit">add</button>
      </form>
      <button style={{ backgroundColor: "red" }} onClick={handleGoBack}>
        go back
      </button>
    </div>
  );
};

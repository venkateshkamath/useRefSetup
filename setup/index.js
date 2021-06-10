import React, { useState, useReducer } from "react";
import Modal from "./Modal";
import { data } from "../../../data"; // Named export
// reducer function
const reducer = (state, action) => {
  // DISPATCH HANDLER, always return state
  if (action.type === "ADD_ITEM") {
    const newPeople = [...state.people, action.payload];
    // Keep the initial set of People, add new set
    // return something
    return {
      // No new values, it is an object
      ...state, // earlier value
      poeple: newPeople,
      isModalOpen: true,
      modalContent: "Item Added",
    };
  }

  return state;
};
const defaultState = {
  // Initial
  people: [],
  isModalOpen: false,
  modalContent: "",
};
// we can directly pass it in reducer state
const Index = () => {
  const [name, setName] = useState("");
  const [state, dispatch] = useReducer(reducer, defaultState); // The reducer function
  const formHandler = (e) => {
    e.preventDefault();
    if (name) {
      const newItem = { id: new Date().getTime().toString(), name };
      dispatch({ type: "ADD_ITEM", payload: newItem }); // takes an object
    } else {
      dispatch({ type: "RANDOM" });
    }
  };
 
  return (
    <>
      {state.isModalOpen && <Modal modalContent={state.modalContent} />}
      <form onSubmit={formHandler} className="form">
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button type="submit">Add</button>
      </form>
      {state.people.map((person) => {
     
        return (
          <div key={person.id}>
            <h4>{person.name}</h4>
          </div>
        );
      })}
    </>
  );
};

export default Index;

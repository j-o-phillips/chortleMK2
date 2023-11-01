
"use client"
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import style from './page.module.css'
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";


function CreateChore() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    deadline: "",
    assignees: [],
  });


  const [householdMembers, setHouseholdMembers] = useState([]);

//Temporary
  const simulatedHouseholdMembers = [
    "Jake",
    "Rick",
    "Ivan",
  ];

  useEffect(() => {
    setHouseholdMembers(simulatedHouseholdMembers);
  }, []);

  // useEffect(() => {
  //   const fetchHouseholdMembers = async () => {
  //     try {
  //       const response = await fetch(`/api/household/${householdId}`);
  //       if (response.ok) {
  //         const data = await response.json();
  //         setHouseholdMembers(data.members);
  //       } else {
  //         console.error("Error fetching household members");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching household members", error);
  //     }
  //   };

  //   fetchHouseholdMembers();
  // }, [householdId]);


   //To be able to select more than 1 assignee
  const handleAssigneeChange = (e) => {
    setFormData({ ...formData, selectedAssignee: e.target.value });
  };

  const handleAddAssignee = () => {
    if (formData.selectedAssignee) {
      setFormData({
        ...formData,
        assignees: [...formData.assignees, formData.selectedAssignee],
        selectedAssignee: "",
      });
    }
  };

  const handleRemoveAssignee = (assignee) => {
    const updatedAssignees = formData.assignees.filter((a) => a !== assignee);
    setFormData({ ...formData, assignees: updatedAssignees });
  };

  const handleCreateChore = async (e) => {
    e.preventDefault();
    
    try {
      const data = { ...formData, assignees: formData.assignees }

      const res = await fetch(`http://localhost:3000/api/household/${householdId}/chores`, {

        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(data),
      });
      console.log(data);

      if (res.status === 200) {

        console.log("Chore created successfully");
      } else {
        console.error("Error creating chore");
      }
    } catch (error) {
      console.error("Error creating chore", error);
    }
  };

  return (

    <div className={style.page}>
      <h1 className={style.h1}>New Chore</h1>
      <div className={style.form}>
      <form onSubmit={handleCreateChore}>
        <input className={style.input}

          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}

        /> <br/>
        <textarea className={style.textarea}
          type="text"
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          rows={2}
        /> <br/>
        <DatePicker className={style.input}
          placeholderText="Due Date"
          selected={formData.deadline}
          onChange={(date) => setFormData({ ...formData, deadline: date })}
          dateFormat="dd-MM-yyyy"
        /> <br/>
        <select className={style.select}
          value={formData.selectedAssignee}
          onChange={handleAssigneeChange}
        >
          <option value="">Select Assignee</option>
          {householdMembers.map((member) => (
            <option key={member} value={member}>
              {member}
            </option>
          ))}
        </select>
        <div className={style.addbtn}>
        <button className={style.add} type="button" onClick={handleAddAssignee}>
          Add Assignee
        </button></div>
        <ul className={style.ul}>
          {formData.assignees.map((assignee, index) => (
            <li className={style.li} key={index}>
              {assignee}
              <button type="button" onClick={() => handleRemoveAssignee(assignee)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
        </form>
        </div>
        <button className={style.submit} type="submit">Create Chore</button>

    </div>
  );
}

export default CreateChore;

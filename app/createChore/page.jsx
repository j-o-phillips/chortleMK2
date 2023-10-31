
import { useState } from "react";

function CreateChore() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    deadline: "",
    assignees: [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/household/:householdId/chores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        console.log("Chore created successfully");
      } else {
        console.error("Error creating chore");
      }
    } catch (error) {
      console.error("Error creating chore", error);
    }
  };

  return (
    <div>
      <h1>Create Chore</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        
        <button type="submit">Create Chore</button>
      </form>
    </div>
  );
}

export default CreateChore;

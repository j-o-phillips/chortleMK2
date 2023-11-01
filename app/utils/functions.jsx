async function deleteChore(choreId) {
    try {
      const res = await fetch(`http://localhost:3000/api/household/${householdId}/chores/${choreId}`, {
        method: 'DELETE',
      });
  
      if (res.ok) {
      } else {
        const data = await res.json();
        console.error('Error deleting chore:', data.error);
      }
    } catch (error) {
      console.error('Error deleting chore:', error);
    }
  }


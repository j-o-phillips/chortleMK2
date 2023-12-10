async function deleteChore(choreId) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/household/${householdId}/chores/${choreId}`,
      {
        method: "DELETE",
      }
    );

    if (res.ok) {
    } else {
      const data = await res.json();
      console.error("Error deleting chore:", data.error);
    }
  } catch (error) {
    console.error("Error deleting chore:", error);
  }
}

export function formatDate(inputDate) {
  const date = new Date(inputDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return formattedDate;
}

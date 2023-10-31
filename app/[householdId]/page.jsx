"use client";

import { Button, Stack } from "react-bootstrap"
import Container from "react-bootstrap/Container"
import React from "react";
import ChoreCard from "@/components/ChoreCard/ChoreCard";

function Dashboard() {
  return (
    <>
    
    <Stack direction="horizontal" gap="2" className="mb-4 mt-4" >
      <h1 className="me-auto">Dashboard</h1>
      <Button variant="primary">Create Chore</Button>
      {/* <Button variant="outline-primary" onClick='check done'>Check done</Button> */}
    </Stack>
    <Container>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
        gap: "16px",
        alignItems: "flex-start"
      }}
    >
      {/* { chores.map( chore => { */}
        {/* // const amount = getBudgetExpenses(budget.id).reduce((total, expense) => total + expense.amount, 0)
        return ( */}
          <ChoreCard
            // key={ budget.id }
            // name={ budget.name }
            // amount={ amount }
            // max={ budget.max }
            // onAddExpenseClick={() => openAddExpenseModal(budget.id)}
            // onViewExpenseClick={() => setViewExpenseModalBudgetId(budget.id)}
          />
          < ChoreCard />
      {/* ) */}
      {/* } ) } */}
    </div>
  </Container>
  </>
  );
}

export default Dashboard;

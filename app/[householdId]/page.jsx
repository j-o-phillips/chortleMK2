"use client";

import { Button, Stack } from "react-bootstrap"
import Container from "react-bootstrap/Container"
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
          < ChoreCard />
  </Container>
  </>
  );
}

export default Dashboard;

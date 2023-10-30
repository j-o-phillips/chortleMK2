import { Card, Button } from "react-bootstrap";

function ChoreCard({ chore }) {
  //add modal with specific chore details to each chore card
  function progressBarVariant(deadline) {
    const today = new Date();
    const timeToDeadline = new Date(deadline) - today;
    const daysToDeadline = timeToDeadline / (1000 * 60 * 60 * 24);

    if (daysToDeadline <= 0) {
      return 'danger';
    } else if (daysToDeadline <= 3) {
      return 'warning';
    }
    return 'primary';
  }

  return (
    <Card className="card">
      {/* <div><h3>{chore.title}</h3></div> */}
      <div><h3>Title</h3></div>
      <div>
        <h5>Description:</h5>
        {/* <p>{chore.description}</p> */}
        <p>Chore Description</p>
      </div>
      <div>
        {/* <h5>Due date: {chore.deadline}</h5> */}
        <h5>Due date:  DD-MM-YYYY</h5>
      </div>
      <div>
        {/* <h5>Assign to: {chore.assignees.imgURL}</h5> */}
        <h5>Assign to: users pictures</h5>
      </div>
      <div><Button className="d-button">See details</Button>
      <Button className="c-button">Check as done</Button></div>
    </Card>
  )
}
export default ChoreCard;

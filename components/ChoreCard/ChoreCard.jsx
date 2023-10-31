"use client"
import {useState} from 'react'
import style from './ChoreCard.module.css'

function ChoreCard({ chore }) {
  const [isCompleted, setIsCompleted] = useState(false);

  const handleMarkAsDone = () => {
    setIsCompleted(!isCompleted);
  };
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
    <div className={style.card}>
        <h3 className={style.h3}>Title</h3>
        <div className={style.chore}>
          <h5 className={style.h5}>Description:</h5>
          <p>Chore Description</p>
        </div>
        <div className={style.date}>
          <h5 className={style.h5}>Due date:</h5>
          <p className={style.due}>DD-MM-YYYY</p>
        </div>
        <div className={style.users}>
          <h5 className={style.h5}>Assign to:</h5>
          <p className={style.pictures}> users pictures</p>
        </div>
        <div className={style.isdone}>
        <button
      className={isCompleted ? style.completed : style.markDone}
      onClick={handleMarkAsDone}
    >
      {isCompleted ? 'Completed' : 'Set Chore as Completed'}
    </button></div>
    </div>
  )
}
export default ChoreCard;

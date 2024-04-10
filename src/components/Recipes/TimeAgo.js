import { useEffect, useState } from "react";

const TimeAgo = (props) => {
  const [date, setDate] = useState(new Date(props.date));
  const [now, setNow] = useState(new Date());
  // setDate(date.getHours()+2);
  const [time, setTime] = useState(0);
  useEffect(() => {
    setNow(new Date());
    // console.log(date);
    setTime(calcTime());
    // console.log("now", now);
    // console.log("date", date);
  }, [date, now.getMinutes()]);

  const calcTime = () => {
    // Convert dates to UTC
    let utcUploadTime = Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds()
    );
    let utcNowTime = Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      now.getUTCHours(),
      now.getUTCMinutes(),
      now.getUTCSeconds()
    );


    
    if(!date.toString().includes("+02:00"))
    utcUploadTime = utcUploadTime + 7200000;
    const diffMs = utcNowTime - utcUploadTime; // Difference in milliseconds
    const diffSeconds = Math.floor(diffMs / 1000); // Convert to seconds
    const diffMinutes = Math.floor(diffSeconds / 60); // Convert to minutes
    const diffHours = Math.floor(diffMinutes / 60); // Convert to hours
    const diffDays = Math.floor(diffHours / 24); // Convert to days

    if (diffDays > 0) {
      return diffDays + " ימים";
    } else {
      if (diffHours > 0) {
        return diffHours + " שעות";
      } else {
        if (diffMinutes > 0) {
          return diffMinutes + " דקות";
        } else {
          return diffSeconds + " שניות";
        }
      }
    }
  };
  return <p>{time}</p>;
};

export default TimeAgo;

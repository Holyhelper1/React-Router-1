import { useEffect, useState } from "react";
import styles from "./components.module.css";

export const CurrentTime = () => {
  const [timeNow, setTimeNow] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setTimeNow(new Date().toLocaleTimeString());
    }, 1000);
  }, [timeNow]);

  return (
    <div>
      <span className={styles.abcText}>{timeNow} ⌚</span>
    </div>
  );
};
import React, { useState } from "react";
import styles from "./DynamicSliders.module.css";

interface SliderProps {
  id: string; // מזהה ייחודי לכל Slider
  label: string; // תווית עבור Slider
  initialWeight: number; // ערך התחלתי של המשקל
}

interface Props {
  sliders: SliderProps[]; // רשימת כל ה-Sliders
  totalWeight: number; // המשקל הכולל הראשוני
}

export default function DynamicSliders({ sliders, totalWeight }: Props) {
  const [weights, setWeights] = useState<Record<string, number>>(
    sliders.reduce((acc, slider) => {
      acc[slider.id] = slider.initialWeight;
      return acc;
    }, {} as Record<string, number>)
  );

  const updateWeight = (id: string, newWeight: number) => {
    const currentTotal = Object.values(weights).reduce((sum, weight) => sum + weight, 0);

    // בדיקה אם הערך החדש יגרום לחריגה מהמקסימום
    if (currentTotal - weights[id] + newWeight > totalWeight) {
      return; // אם כן, לא נעדכן את הערך
    }

    // עדכון הערך רק אם אין חריגה
    setWeights((prevWeights) => ({
      ...prevWeights,
      [id]: newWeight,
    }));
  };

  return (
    <div className={styles.slidersContainer}>
      {sliders.map((slider) => (
        <div key={slider.id} className={styles.sliderRow}>
          <label className={styles.sliderLabel}>{slider.label}</label>
          <input
            type="range"
            min="0"
            max={totalWeight}
            value={weights[slider.id]}
            onChange={(e) => updateWeight(slider.id, Number(e.target.value))}
            className={styles.slider}
          />
          <span className={styles.sliderValue}>{weights[slider.id]}</span>
        </div>
      ))}
      <div className={styles.totalDisplay}>
        Total Weight: {Object.values(weights).reduce((sum, weight) => sum + weight, 0)} / {totalWeight}
      </div>
    </div>
  );
}

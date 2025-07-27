import React, { useState } from "react";
import { TextField, MenuItem } from "@mui/material";
import styles from "./ConditionSelector.module.css";

interface Condition {
    type: string;
    operator?: string;
    value?: string | number;
}

interface Props {
    label: string;
    placeholder?: string;
    conditions: string[];
    operators: { [key: string]: string[] };
    values: { [key: string]: string[] | null | "text" };
    onChange: (conditions: Condition[]) => void;
}

export default function ConditionSelector({
    label,
    placeholder,
    conditions,
    operators,
    values,
    onChange,
}: Props) {
    const [selectedConditions, setSelectedConditions] = useState<Condition[]>([]);
    const [currentCondition, setCurrentCondition] = useState<string | null>(null);

    const addCondition = (type: string) => {
        const newCondition: Condition = { type };
        setSelectedConditions((prev) => [...prev, newCondition]);
        onChange([...selectedConditions, newCondition]);
        setCurrentCondition(null);
    };

    const updateCondition = (index: number, updatedCondition: Condition) => {
        const updatedConditions = [...selectedConditions];
        updatedConditions[index] = updatedCondition;
        setSelectedConditions(updatedConditions);
        onChange(updatedConditions);
    };

    const removeCondition = (index: number) => {
        const updatedConditions = selectedConditions.filter((_, i) => i !== index);
        setSelectedConditions(updatedConditions);
        onChange(updatedConditions);
    };

    return (
        <div className={styles.conditionSelectorContainer}>
        <TextField
          select
          label={label}
          placeholder={placeholder}
          value={currentCondition || ""}
          onChange={(e) => {
            const value = e.target.value;
            setCurrentCondition(value);
            addCondition(value);
          }}
          fullWidth
          className={styles.conditionDropdown}
        >
          {conditions.map((condition) => (
            <MenuItem key={condition} value={condition}>
              {condition}
            </MenuItem>
          ))}
        </TextField>
      
        <div className={styles.indentedGroup}>
          {selectedConditions.map((condition, index) => (
            <div key={index} className={styles.conditionRow}>
              <span className={styles.conditionLabel}>{condition.type}:</span>
      
              {operators[condition.type] && (
                <TextField
                  select
                  value={condition.operator || ""}
                  onChange={(e) =>
                    updateCondition(index, { ...condition, operator: e.target.value })
                  }
                  className={styles.operatorDropdown}
                >
                  {operators[condition.type].map((op) => (
                    <MenuItem key={op} value={op}>
                      {op}
                    </MenuItem>
                  ))}
                </TextField>
              )}
      
              {values[condition.type] === "text" ? (
                <TextField
                  type="text"
                  value={condition.value || ""}
                  onChange={(e) =>
                    updateCondition(index, { ...condition, value: e.target.value })
                  }
                  placeholder="Enter text"
                  className={styles.textInput}
                />
              ) : Array.isArray(values[condition.type]) ? (
                <TextField
                  select
                  value={condition.value || ""}
                  onChange={(e) =>
                    updateCondition(index, { ...condition, value: e.target.value })
                  }
                  className={styles.valueDropdown}
                >
                  {(values[condition.type] as string[]).map((val: string) => (
                    <MenuItem key={val} value={val}>
                      {val}
                    </MenuItem>
                  ))}
                </TextField>
              ) : (
                <TextField
                  type="number"
                  value={condition.value || ""}
                  onChange={(e) =>
                    updateCondition(index, { ...condition, value: Number(e.target.value) })
                  }
                  placeholder="Enter number"
                  className={styles.numberInput}
                />
              )}
      
              <button
                onClick={() => removeCondition(index)}
                className={styles.removeButton}
              >
                x
              </button>
            </div>
          ))}
        </div>
      </div>
      
    );
}

import React, { useState } from "react";
import styles from "./Policies.module.css";
import MultiSelect from "components/form/MultiSelect";
import ConditionSelector from "components/form/ConditionSelector";


export const Policies = () => {
  const [policyName, setPolicyName] = useState("");
  const [givenConditions, setGivenConditions] = useState<string[]>([]);
  const [doActions, setDoActions] = useState<string[]>([]);
  const [appliesToOptions, setAppliesToOptions] = useState<string[]>([]);
  const [reoccurrenceNumber, setReoccurrenceNumber] = useState<number>(1);
  const [reoccurrenceUnit, setReoccurrenceUnit] = useState("Days");


   const [whenConditions, setWhenConditions] = useState([]);

  const conditionOptions = ["Risk Score", "Confidence Score", "EPSS"];
  
  const operatorOptions: Record<string, string[]> = {
    "Risk Score": ["is"],
    "Confidence Score": ["Greater than", "Lower than"],
    EPSS: ["Greater than", "Lower than"],
  };
  
  const valueOptions: Record<string, string[] | null> = {
    "Risk Score": ["Low", "Mid", "High", "Critical"],
    "Confidence Score": null, // Free text field
    EPSS: null, // Free text field
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Create a New Policy</h1>

      {/* Policy Name */}
      <div className={styles.section}>
        <label className={styles.label}>Policy Name</label>
        <input
          type="text"
          className={styles.input}
          value={policyName}
          onChange={(e) => setPolicyName(e.target.value)}
          placeholder="Enter policy name"
        />
      </div>

      {/* Given Section */}
      <div className={styles.section}>
        <h2 className={styles.subheader}>Given</h2>
        <MultiSelect
          label="Category"
          placeholder="Add conditions"
          options={["CVE found", "New Reachability found", "New patch available"]}
        />
      </div>

    
      {/* When Section */}
      <div className={styles.section}>
        <h2 className={styles.subheader}>When</h2>
        <ConditionSelector
          label="Add Condition"
          placeholder="Select a condition"
          conditions={conditionOptions}
          operators={operatorOptions}
          values={valueOptions}
          onChange={(conditions) => setWhenConditions(conditions)}
        />
    </div>

      {/* Do Section */}
      <div className={styles.section}>
        <h2 className={styles.subheader}>Do</h2>
        <MultiSelect
          label="Actions"
          placeholder="Add actions"
          options={[
            "Create a PR",
            "Run Confidence Tests",
            "Open Ticket",
            "Send to Slack Channel",
          ]}
        />
      </div>

      {/* Applies To Section */}
      <div className={styles.section}>
        <h2 className={styles.subheader}>Applies To</h2>
        <MultiSelect
          label="Applies To"
          placeholder="Select repositories or groups"
          options={["Repo name", "All repos", "Repo Group", "Workload"]}
        />
      </div>

      {/* Reoccurrence Section */}
      <div className={styles.section}>
        <h2 className={styles.subheader}>Reoccurrence</h2>
        <div className={styles.reoccurrence}>
          <input
            type="number"
            className={styles.input}
            value={reoccurrenceNumber}
            onChange={(e) => setReoccurrenceNumber(Number(e.target.value))}
          />
          <select
            value={reoccurrenceUnit}
            onChange={(e) => setReoccurrenceUnit(e.target.value)}
            className={styles.dropdown}
          >
            {["Days", "Hours", "Minutes"].map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};


export default Policies
export type Policy = {
  id: string;
  name: string;
  trigger: string; //Need to revisit this one
  time: string; //Best time generated
  recurrence: string; //should be time
  appliesTo: string;
  rules: PolicyRule[];
};

export type PolicyKey = keyof Policy;

export type PolicyRule = {
  id: string;
  name: string;
  rule: string; //need to revisit this one
  //action: Action;
};

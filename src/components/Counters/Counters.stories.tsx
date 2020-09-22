import React from "react";
import { Counter, Counters } from "./Counters";

export default { title: "components/Counters", component: Counters };

export const fromClauseMainFirstOne = (): React.ReactNode => (
  <Counters>
    <Counter
      counter={36}
      label="количество человек, чьи дела прошли через суд"
    />
    <Counter counter={19} label="человек Осуждены по основному составу" />
    <Counter counter={17} label="человек Осуждены по дополнительному составу" />
    <Counter counter={9} label="человек оправданы по основному составу" />
    <Counter
      counter={142}
      label="человека, в отношении которых дело было прекращено по основному составу"
    />
  </Counters>
);

export const fromClauseMainSecondOne = (): React.ReactNode => (
  <Counters>
    <Counter
      counter={220}
      label="общее количество случаев использования этой статьи "
    />
  </Counters>
);

export const fromClauseMainFocus = (): React.ReactNode => (
  <Counters>
    <Counter counter={19} label="человек осуждены за год" />

    <Counter counter={9} label="человек оправданы" />

    <Counter
      counter={141}
      label="человек, в отношении которых дело было прекращено"
    />

    <Counter
      counter={0}
      label="преступлений признано неоконченными"
      helpText="Это может означать как то, что все были оконченными, так и то, что сам состав является формальным и не имеет стадий совершения правонарушения (например, можно готовить покушение убийство, но нельзя готовить покушение на неоднократное участие в несогласованных акциях)."
    />
  </Counters>
);

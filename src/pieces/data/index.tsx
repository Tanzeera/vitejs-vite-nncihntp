export type Person = {
    userId: string;
    name: string;
    role: string;
    avatarUrl: string;
  };
  
  const names: string[] = [
    "Tanzeera",
    "Fathima",
    "Alvin",
    "Angie",
    "Arjun",
  ];
  
  const roles: string[] = [
    "Unemployed",
    "Unemployed ",
    "Unemployed ",
    "Unemployed ",
    "Unemployed",
    "Senior Designer",
    "Lead Designer",
    "Design Manager",
    "Content Designer",
    "Product Manager",
  ];
  
  const sortedNames = [...names].sort();
  
  const sortedRoles = sortedNames.map((name) => roles[names.indexOf(name)]);
  let sharedLookupIndex: number = 0;
  
  /**
   * Note: this does not use randomness so that it is stable for VR tests
   */
  export function getPerson(): Person {
    sharedLookupIndex++;
    return getPersonFromPosition({ position: sharedLookupIndex });
  }
  
  export function getPersonFromPosition({
    position,
  }: {
    position: number;
  }): Person {
    // use the next name
    const name = names[position % names.length];
    // use the next role
    const role = roles[position % roles.length];
    
    // Generate avatar URL using the name (e.g., using Gravatar or any other URL service)
    const avatarUrl = `https://www.avatarapi.com/${encodeURIComponent(name)}.png`;  // Example avatar URL format
    
    return {
      userId: `id:${position}`,
      name,
      role,
      avatarUrl,
    };
  }
  
  export function getPeopleFromPosition({
    amount,
    startIndex,
  }: {
    amount: number;
    startIndex: number;
  }): Person[] {
    return Array.from({ length: amount }, () =>
      getPersonFromPosition({ position: startIndex++ })
    );
  }
  
  export function getPeople({ amount }: { amount: number }): Person[] {
    return Array.from({ length: amount }, () => getPerson());
  }
  
  export type ColumnType = {
    title: string;
    columnId: string;
    items: Person[];
  };
  export type ColumnMap = { [columnId: string]: ColumnType };
  
  export function getData({
    columnCount,
    itemsPerColumn,
  }: {
    columnCount: number;
    itemsPerColumn: number;
  }) {
    const columnMap: ColumnMap = {};
  
    for (let i = 0; i < columnCount; i++) {
      const column: ColumnType = {
        title: `Column ${i}`,
        columnId: `column-${i}`,
        items: getPeople({ amount: itemsPerColumn }),
      };
      columnMap[column.columnId] = column;
    }
    const orderedColumnIds = Object.keys(columnMap);
  
    return {
      columnMap,
      orderedColumnIds,
      lastOperation: null,
    };
  }
  
  export function getBasicData() {
    const columnMap: ColumnMap = {
      confluence: {
        title: "abc",
        columnId: "confluence",
        items: getPeople({ amount: 10 }),
      },
      jira: {
        title: "....",
        columnId: "jira",
        items: getPeople({ amount: 10 }),
      },
      trello: {
        title: "Strive labs",
        columnId: "trello",
        items: getPeople({ amount: 10 }),
      },
    };
  
    const orderedColumnIds = ["confluence", "jira", "trello"];
  
    return {
      columnMap,
      orderedColumnIds,
    };
  }
  
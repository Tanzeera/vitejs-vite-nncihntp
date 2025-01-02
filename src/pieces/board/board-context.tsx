import React, { createContext, useContext, useState } from 'react';
import invariant from 'tiny-invariant';
import type { CleanupFn } from '@atlaskit/pragmatic-drag-and-drop/types';

export type ColumnType = {
  columnId: string;
  title: string;
  items: any[]; // Adjust this type as needed
};

export type BoardContextValue = {
  reorderColumn: (args: { startIndex: number; finishIndex: number }) => void;
  reorderCard: (args: { columnId: string; startIndex: number; finishIndex: number }) => void;
  moveCard: (args: {
    startColumnId: string;
    finishColumnId: string;
    itemIndexInStartColumn: number;
    itemIndexInFinishColumn?: number;
  }) => void;
  registerCard: (args: {
    cardId: string;
    entry: {
      element: HTMLElement;
      actionMenuTrigger: HTMLElement;
    };
  }) => CleanupFn;
  registerColumn: (args: {
    columnId: string;
    entry: {
      element: HTMLElement;
    };
  }) => CleanupFn;
  instanceId: symbol;
  getColumns: () => ColumnType[]; // Add the getColumns method
};

export const BoardContext = createContext<BoardContextValue | null>(null);

export function useBoardContext(): BoardContextValue {
  const value = useContext(BoardContext);
  invariant(value, 'cannot find BoardContext provider');
  return value;
}

export const BoardProvider = ({ children }: { children: React.ReactNode }) => {
  const [columns, setColumns] = useState<ColumnType[]>([
    { columnId: '1', title: 'Column 1', items: [] },
    { columnId: '2', title: 'Column 2', items: [] },
  ]);

  const getColumns = () => columns;

  const reorderColumn = ({ startIndex, finishIndex }: { startIndex: number; finishIndex: number }) => {
    const newColumns = [...columns];
    const [movedColumn] = newColumns.splice(startIndex, 1);
    newColumns.splice(finishIndex, 0, movedColumn);
    setColumns(newColumns);
  };

  const reorderCard = ({ columnId, startIndex, finishIndex }: { columnId: string; startIndex: number; finishIndex: number }) => {
    // Implement logic for reordering cards within columns
  };

  const moveCard = ({
    startColumnId,
    finishColumnId,
    itemIndexInStartColumn,
    itemIndexInFinishColumn,
  }: {
    startColumnId: string;
    finishColumnId: string;
    itemIndexInStartColumn: number;
    itemIndexInFinishColumn?: number;
  }) => {
    // Implement logic for moving cards between columns
  };

  const registerCard = ({
    cardId,
    entry,
  }: {
    cardId: string;
    entry: {
      element: HTMLElement;
      actionMenuTrigger: HTMLElement;
    };
  }): CleanupFn => {
    // Implement logic for registering a card
    return () => {};
  };

  const registerColumn = ({
    columnId,
    entry,
  }: {
    columnId: string;
    entry: {
      element: HTMLElement;
    };
  }): CleanupFn => {
    // Implement logic for registering a column
    return () => {};
  };

  const instanceId = Symbol('instanceId');

  return (
    <BoardContext.Provider value={{ reorderColumn, reorderCard, moveCard, registerCard, registerColumn, getColumns, instanceId }}>
      {children}
    </BoardContext.Provider>
  );
};

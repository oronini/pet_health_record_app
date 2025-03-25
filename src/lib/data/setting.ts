export const settingsData = [
  {
    actions: [
      { actionId: 1, actionName: '行動テキスト1' },
      { actionId: 2, actionName: '行動テキスト2' },
      { actionId: 3, actionName: '行動テキスト3' },
    ],
    statuses: [
      { statusId: 1, statusName: '状態テキスト1', relatedActionsId: [1, 2] },
      { statusId: 2, statusName: '状態テキスト2', relatedActionsId: [3] },
      { statusId: 3, statusName: '状態テキスト3', relatedActionsId: [1, 2, 3] },
    ],
    amounts: [
      { amountId: 1, amountName: '量テキスト1' },
      { amountId: 2, amountName: '量テキスト2' },
      { amountId: 3, amountName: '量テキスト3' },
    ],
  },
];

import { toCapitalCase } from "./utils"

const insertChoice = ({ choices, value, display_name, action, category }) => {
  const hasInjected = choices.some(
    choice => choice.display_name === display_name
  )

  if (!hasInjected) {
    choices.unshift({
      value,
      display_name,
      action,
      category,
    })
  }

  return choices
}

export const withRedirectChoices = ({
  choices: initalChoices = [],
  category,
  redirectPaths: { onDelete, onAdd, onEdit, onAll },
}) => {
  const choices = [...initalChoices]
  const hasChoices = !!choices.filter(
    choice => !(choice.value === "DisplayOnly")
  ).length

  if (hasChoices) {
    insertChoice({
      choices,
      value: "DisplayOnly",
      display_name: `${toCapitalCase(category)} Store`,
    })

    if (onDelete || onAll) {
      insertChoice({
        choices,
        value: `Delete ${category}`,
        display_name: `Delete ${toCapitalCase(category)}`,
        action: onDelete || onAll,
        category,
      })
    }

    if (onEdit || onAll) {
      insertChoice({
        choices,
        value: `Edit ${category}`,
        display_name: `Edit ${toCapitalCase(category)}`,
        action: onEdit || onAll,
        category,
      })
    }
  }

  if (onAdd || onAll) {
    insertChoice({
      choices,
      value: `Add ${category}`,
      display_name: `Add ${toCapitalCase(category)}`,
      action: onAdd || onAll,
      category,
    })
  }

  insertChoice({
    choices,
    value: "DisplayOnly",
    display_name: `${toCapitalCase(category)} Actions`,
  })

  return choices
}

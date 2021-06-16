import { useActiveFormCategory } from "../reducers/forms/hooks"

export const useSubmit = ({ isSubmittedProp = false }) => {
  const { isSubmitted } = useActiveFormCategory()
  return { isSubmitted: isSubmitted || isSubmittedProp }
}

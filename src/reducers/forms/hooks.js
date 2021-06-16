import { useSelector } from "react-redux"

export const useActiveFormCategory = () => {
  return (
    useSelector(state => state.forms.data[state.forms.data.length - 1]) || {}
  )
}

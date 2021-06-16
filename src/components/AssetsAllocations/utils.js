import { t } from "@lingui/macro"

export const getAllocation = allocation => {
  const {
    allocation_amount,
    allocation_percentage,
    effective_allocation_amount,
    effective_allocation_percentage,
  } = allocation

  const label =
    effective_allocation_percentage || effective_allocation_amount
      ? t`Effective Allocation`
      : t`Allocation`

  const number =
    effective_allocation_amount || allocation_amount
      ? `$${effective_allocation_amount || allocation_amount}`
      : `${effective_allocation_percentage || allocation_percentage}%`

  return { label, number }
}

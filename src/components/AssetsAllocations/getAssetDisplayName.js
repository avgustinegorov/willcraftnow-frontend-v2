import { t } from "@lingui/macro"

export const getAssetDisplayName = assetKey => {
  const label_map = {
    RealEstate: t`Real Estate`,
    BankAccount: t`Bank Account`,
    Insurance: t`Insurance Policy`,
    Investment: t`Investment Account`,
    Company: t`Company Ordinary Shares`,
    Residual: t`Residual Asset`,
  }
  return label_map[assetKey]
}

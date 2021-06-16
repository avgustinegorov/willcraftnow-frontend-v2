import { t } from "@lingui/macro"

const productOverviewList = [
  {
    key: "WILL",
    productPrice: "49",
    productTitle: t`Last Will & Testament`,
    comingSoon: false,
    productPath: `/online_wills`,
    buttonImg: `wills_icon`,
    productDescription: t`Control who gets your assets when you pass away or, appoint a testamentary guardian if you have young children. You can also decide on your funeral arrangements and last rites.`,
    productCaption: t`A lawyer is not necessary, but you may choose from the panel of our legal service providers if you need one.`,
    disabled: false,
  },
  {
    key: "LPA",
    productPrice: "39",
    productTitle: t`Lasting Power of Attorney`,
    comingSoon: false,
    productPath: `/online_lpas`,
    buttonImg: `lasting_power_icon`,
    productDescription: t`This document governs your affairs in the event you lose mental capacity (e.g. in case of dementia, or if you fall into a coma.) Decide on who decides on your medical treatments, and who handles your finances.`,
    productCaption: t`This document requires a cerificate provider, choose one from our panel of legal service providers.`,
    disabled: false,
  },
  {
    key: "DEED_POLL",
    productPrice: "---",
    productTitle: t`Deed Poll`,
    comingSoon: true,
    productPath: "",
    buttonImg: `deed_poll_icon`,
    productDescription: t`This document changes your official name. Use this to update your name after marriage, or if you need to change your name for religious reasons.`,
    productCaption: t`This document requires a lawyer and is signed by deed, choose one from our panel of legal service providers.`,
    disabled: true,
  },
]
export default productOverviewList

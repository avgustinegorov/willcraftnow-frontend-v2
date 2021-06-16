import {
  Home,
  Currency,
  AidOption,
  BarChart,
  BusinessService,
} from "grommet-icons"

import { t } from "@lingui/macro"

const assetList = [
  {
    id: "1",
    asset_type: "RealEstate",
    name: t`Real Estate`,
    icon: Home,
    content: [
      {
        id: "1",
        includes: true,
        content: t`Jointly Held Property.`,
      },
      {
        id: "2",
        includes: null,
        content: t`
          * Please note that jointly held property will only be distributed under your Will if the other joint owner(s) all pass away before you.`,
      },
    ],
  },
  {
    id: "2",
    asset_type: "BankAccount",
    name: t`Bank Account`,
    icon: Currency,
    content: [
      {
        id: "1",
        includes: true,
        content: t`
          Savings Accounts and Safe Deposit Boxes identifiable by a Bank Account Number.`,
      },
    ],
  },
  {
    id: "3",
    asset_type: "Insurance",
    name: t`Insurance`,
    icon: AidOption,
    content: [
      {
        id: "1",
        includes: false,
        content: t`
          Policies that already have nominations, or policies that are irrevocable trusts.`,
      },
      {
        id: "2",
        includes: null,
        content: t`
          * Please check with your Insurance Agent that all nominations for the policy that you wish to include in your Will have been removed.`,
      },
    ],
  },
  {
    id: "4",
    asset_type: "Investment",
    name: t`Investment Account`,
    icon: BarChart,
    content: [
      {
        id: "1",
        includes: true,
        content: t`
          Custodian Accounts, Fixed Deposit Accounts, and Accounts holding bankable instruments such as shares or bonds.`,
      },
      {
        id: "2",
        includes: true,
        content: t`
          CPD accounts, SRS Investment Accounts, CPF Investment Accounts and Investment Accounts generally held with Banks or Financial Service Providers.`,
      },
    ],
  },
  {
    id: "5",
    asset_type: "Company",
    name: t`Company`,
    icon: BusinessService,
    content: [
      {
        id: "1",
        includes: true,
        content: t`
          Ordinary Shares in Singapore Incorporated Companies.`,
      },
      {
        id: "2",
        includes: false,
        content: t`
          Preference Shares and shares held in Investment Accounts.`,
      },
    ],
  },
]

export default assetList

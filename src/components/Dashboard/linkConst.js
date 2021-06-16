import { t } from "@lingui/macro"

import LawyersInterface from "./LawyersInterface"
import OrderList from "./OrderList"
import PartnersInterface from "./PartnersInterface"
import UserDetails from "./UserDetails"

import { UserManager, Group, UserNew, DocumentUser } from "grommet-icons"

const linkConst = userDetails => [
  {
    key: "DETAILS",
    heading: t`Your Details`,
    secondaryHeading: "",
    labelIcon: UserManager,
    color: null,
    bgColor: null,
    disabled: false,
    panel: UserDetails,
    props: { userDetails },
    children: "",
  },
  {
    key: "PARTNER",
    heading: t`Partner`,
    secondaryHeading: "",
    labelIcon: Group,
    color: null,
    bgColor: null,
    disabled: !["ADMIN", "LAWYER", "PARTNER"].includes(
      userDetails.user_type ? userDetails.user_type.toUpperCase() : ""
    ),
    panel: PartnersInterface,
    props: "",
    children: "",
  },
  {
    key: "LAWYER",
    heading: t`Lawyers Interface`,
    secondaryHeading: "",
    labelIcon: UserNew,
    color: null,
    bgColor: null,
    disabled: !["ADMIN", "LAWYER"].includes(
      userDetails.user_type ? userDetails.user_type.toUpperCase() : ""
    ),
    panel: LawyersInterface,
    props: "",
    children: "",
  },
  {
    key: "ORDER",
    heading: t`Orders`,
    secondaryHeading: "",
    labelIcon: DocumentUser,
    color: null,
    bgColor: null,
    disabled: userDetails ? false : true,
    panel: "",
    props: "",
    children: [
      {
        key: "WILL",
        heading: t`Wills`,
        secondaryHeading: "",
        color: "#1a73e8",
        bgColor: "#e8f0fe",
        disabled: userDetails ? false : true,
        panel: OrderList,
        props: {
          orderType: "WILL",
          panelHeader: t`Your Wills`,
          nextUrl: ({ orderId }) => `/${orderId}/panel/residual_assets/`,
        },
        children: "",
      },
      {
        key: "LPA",
        heading: t`LPAs`,
        secondaryHeading: "",
        color: "#e3742f",
        bgColor: "#fcefe3",
        disabled: userDetails ? false : true,
        panel: OrderList,
        props: {
          orderType: "LPA",
          panelHeader: t`Your LPAs`,
          nextUrl: ({ orderId }) => `/${orderId}/panel/appointments/`,
        },
        children: "",
      },
      {
        key: "SCHEDULE_OF_ASSETS",
        heading: t`Schedule of Assets`,
        secondaryHeading: "",
        color: "#e3742f",
        bgColor: "#fcefe3",
        disabled: userDetails ? false : true,
        panel: OrderList,
        props: {
          orderType: "SCHEDULE_OF_ASSETS",
          panelHeader: t`Schedule of Assets`,
          nextUrl: ({ orderId }) => `/${orderId}/panel/assets/`,
        },
        children: "",
      },
    ],
  },
]

export default linkConst

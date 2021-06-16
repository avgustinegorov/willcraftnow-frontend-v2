import { t } from "@lingui/macro"

const mainLinks = [
  {
    link: [
      {
        link: `/how_it_works`,
        title: t`How It Works`,
      },
      {
        link: `/customization_engine`,
        title: t`Customization Engine`,
      },
      {
        link: `/legal_service_providers`,
        title: t`Legal Service Providers`,
      },
      {
        link: `/data_security`,
        title: t`Data Security`,
      },
    ],
    title: t`Platform`,
  },
  {
    link: [
      {
        link: `/all_products`,
        title: t`All Products`,
      },
      {
        link: `/online_wills`,
        title: t`Will Packages & Pricing`,
      },
      {
        link: `/online_lpas`,
        title: t`LPA Packages & Pricing`,
      },
    ],
    title: t`Products`,
  },
  {
    link: [
      {
        link: `/posts`,
        title: t`Blog & Articles`,
      },
      {
        link: `/legal_basics`,
        title: t`Legal Basics`,
      },
      {
        link: `/faqs`,
        title: t`FAQs`,
      },
    ],
    title: t`Resources`,
  },
]

export default mainLinks

const preBuildFetch = [
  { url: "/adminconfig/", key: "siteAdminConfig" },
  {
    url: "/partners/",
    key: "sitePartner",
    nestedFieldKey: "application_stores",
  },
]

module.exports = {
  preBuildFetch,
}

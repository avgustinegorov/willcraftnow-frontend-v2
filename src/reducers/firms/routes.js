import { generateFullPath, generatePath } from "../utils"

export const fetchFirmsRoute = {
  route: null,
  serverRoute: `/legal_service/allFirms/`,
  reverse() {
    return generatePath(this.route)
  },
  serverReverse() {
    return generateFullPath(this.serverRoute)
  },
}

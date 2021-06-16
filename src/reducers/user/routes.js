import { generateFullPath, generatePath } from "../utils"

export const editUserRoute = {
  route: null,
  serverRoute: `/auth/user/`,
  reverse() {
    return generatePath(this.route)
  },
  serverReverse() {
    return generateFullPath(this.serverRoute)
  },
}

export const resetPasswordRoute = {
  route: null,
  serverRoute: `/auth/reset_password/`,
  reverse() {
    return generatePath(this.route)
  },
  serverReverse() {
    return generateFullPath(this.serverRoute)
  },
}

export const getUserRoute = {
  route: null,
  serverRoute: `/auth/user/`,
  reverse() {
    return generatePath(this.route)
  },
  serverReverse() {
    return generateFullPath(this.serverRoute)
  },
}

export const tokenRegisterUserRoute = {
  route: null,
  serverRoute: `/auth/token_register/`,
  reverse() {
    return generatePath(this.route)
  },
  serverReverse() {
    return generateFullPath(this.serverRoute)
  },
}

export const registerUserRoute = {
  route: null,
  serverRoute: `/auth/register/`,
  reverse() {
    return generatePath(this.route)
  },
  serverReverse() {
    return generateFullPath(this.serverRoute)
  },
}

export const loginUserRoute = {
  route: null,
  serverRoute: `/auth/login/`,
  reverse() {
    return generatePath(this.route)
  },
  serverReverse() {
    return generateFullPath(this.serverRoute)
  },
}

export const isUserRoute = {
  route: null,
  serverRoute: `/auth/is_user/`,
  reverse() {
    return generatePath(this.route)
  },
  serverReverse() {
    return generateFullPath(this.serverRoute)
  },
}

export const confirmPasswordRoute = {
  route: null,
  serverRoute: `/auth/reset_password_confirm/`,
  reverse() {
    return generatePath(this.route)
  },
  serverReverse() {
    return generateFullPath(this.serverRoute)
  },
}

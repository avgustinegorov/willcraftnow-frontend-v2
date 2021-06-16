const { request } = require("./src/utils/request")

const isHomePage = path => path === `/`
const removeTrailingSlash = path =>
  isHomePage ? path : path.replace(/\/$/, ``)

const createNodeFromData = ({ nestedFieldKey, datas, key, createFns }) => {
  const { createNodeId, createContentDigest, createNode } = createFns

  datas.forEach(data => {
    if (nestedFieldKey && nestedFieldKey in data) {
      const dataCopy = { ...data }

      delete dataCopy[nestedFieldKey]

      createNodeFromData({
        nestedFieldKey,
        datas: data[nestedFieldKey].map((fieldData, i) => ({
          ...fieldData,
          ...dataCopy,
          id: `${dataCopy.id || key}_${i}`,
        })),
        key: key,
        createFns,
      })
    } else {
      const nodeContent = JSON.stringify(data)

      const nodeMeta = {
        id: createNodeId(data.id || key),
        parent: null,
        children: [],
        internal: {
          type: key,
          mediaType: `text/html`,
          content: nodeContent,
          contentDigest: createContentDigest(data),
        },
      }

      const node = Object.assign({}, data, nodeMeta)
      createNode(node)
    }
  })
}

const createNodeFromRequest = async ({
  createNodeId,
  createContentDigest,
  createNode,
  url,
  key,
  nestedFieldKey,
}) => {
  const result = await request({ url: url })

  if (result.status !== 200) {
    console.error(`[PreFlight] Getting ${key} Failed.`)
    console.log(result)
  }

  let datas = result.data

  if (!Array.isArray(result.data)) {
    datas = [result.data]
  }

  createNodeFromData({
    datas,
    key,
    nestedFieldKey,
    createFns: {
      createNodeId,
      createContentDigest,
      createNode,
    },
  })
}

module.exports = {
  isHomePage,
  removeTrailingSlash,
  createNodeFromRequest,
}

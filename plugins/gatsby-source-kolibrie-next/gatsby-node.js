const fetch = require("node-fetch")
const normalize = require('./normalize');

exports.sourceNodes = async ({ actions, store, createNodeId, createContentDigest, cache }, configOptions) => {
  const { createNode, touchNode } = actions

  const processJob = job => {
    const nodeId = createNodeId(`kolibrie-next-${job.id}`)
    const nodeContent = JSON.stringify(job)
    const nodeData = Object.assign({}, job, {
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        type: `KolibrieNextJob`,
        content: nodeContent,
        contentDigest: createContentDigest(job),
      },
    })

    return nodeData
  }

  let data = await fetch('https://admin-integration.kolibrie-next.nl/feeds/api/v1/jobs', {
    headers: {
      "X-API-KEY": configOptions.accessToken,
    },
  })

  let { jobs } = await data.json();

  jobs = await normalize.downloadMediaFiles({
    entities: jobs,
    store,
    cache,
    createNode,
    createNodeId,
    touchNode,
    createContentDigest,
  })

  // Process jobs into nodes.
  jobs.forEach(job => createNode(processJob(job)));

  // We're done, return.
  return
}
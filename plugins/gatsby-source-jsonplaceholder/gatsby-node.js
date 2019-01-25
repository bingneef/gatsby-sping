const fetch = require("node-fetch")

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }, configOptions) => {
  const { createNode } = actions

  // Gatsby adds a configOption that's not needed for this plugin, delete it
  delete configOptions.plugins

  const processItem = item => {
    const nodeId = createNodeId(`sping-todo-${item.id}`)
    const nodeContent = JSON.stringify(item)
    const nodeData = Object.assign({}, item, {
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        type: `SpingTodo`,
        content: nodeContent,
        contentDigest: createContentDigest(item),
      },
    })

    return nodeData
  }

  let items = await fetch('https://jsonplaceholder.typicode.com/todos')
  items = await items.json();
  
  // Process items into nodes.
  items.forEach(item => createNode(processItem(item)));

  // We're done, return.
  return
}
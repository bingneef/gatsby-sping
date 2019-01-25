const { createRemoteFileNode } = require('gatsby-source-filesystem')

// Downloads media from image type fields
exports.downloadMediaFiles = async ({
  entities,
  store,
  cache,
  createNode,
  createNodeId,
  createContentDigest,
  touchNode,
}) => {
  return Promise.all(
    entities.map(async item => {
      // loop item over fields
      for (const key of Object.keys(item)) {
        const field = item[key]
        if (key == 'image') {
          let fileNodeID
          // using field on the cache key for multiple image field
          const mediaDataCacheKey = `source-kolibrie-next-media-${item.id}-${createContentDigest(field)}`
          const cacheMediaData = await cache.get(mediaDataCacheKey)

          // If we have cached media data and it wasn't modified, reuse
          // previously created file node to not try to redownload
          if (
            cacheMediaData &&
            field.updatedAt === cacheMediaData.updatedAt
          ) {
            fileNodeID = cacheMediaData.fileNodeID
            touchNode({nodeId: cacheMediaData.fileNodeID})
          }

          // If we don't have cached data, download the file
          if (!fileNodeID) {
            try {
              const fileNode = await createRemoteFileNode({
                url: field,
                store,
                cache,
                createNode,
                createNodeId,
              })

              if (fileNode) {
                fileNodeID = fileNode.id

                await cache.set(mediaDataCacheKey, {
                  fileNodeID,
                  modified: field.updatedAt,
                })
              }
            } catch (e) {
              console.log(e);
            }
          }

          if (fileNodeID) {
            item[`${key}___NODE`] = fileNodeID
          }
        }
      }
      return item
    })
  )
}
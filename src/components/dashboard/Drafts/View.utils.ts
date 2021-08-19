export type TOrder = { key: string; order: 'ASC' | 'DESC' }

export const orderPublications = (chosenOrder: TOrder, publications: any[]): any[] => {
  switch (chosenOrder.key) {
    case 'fileName':
      return publications.sort((a, b) => {
        if (chosenOrder.order === 'ASC') {
          return a.fileName - b.fileName ? -1 : 1
        }

        return a.fileName - b.fileName ? 1 : -1
      })
    case 'lastModified':
      return publications.sort((a, b) => {
        if (chosenOrder.order === 'ASC') {
          return a.lastModified - b.lastModified ? -1 : 1
        }

        return a.lastModified - b.lastModified ? 1 : -1
      })
    case 'publishedAt':
      console.log('publications', publications)
      return publications.sort((a, b) => {
        if (chosenOrder.order === 'ASC') {
          return a.publishedAt - b.publishedAt ? -1 : 1
        }

        return a.publishedAt - b.publishedAt ? 1 : -1
      })
    case 'created':
      return publications.sort((a, b) => {
        if (chosenOrder.order === 'ASC') {
          return a.created - b.created ? -1 : 1
        }

        return a.created - b.created ? 1 : -1
      })
    default:
      return publications
  }
}

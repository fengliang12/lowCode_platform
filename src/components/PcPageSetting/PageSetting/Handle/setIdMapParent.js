export const setIdMapParent = (list, parentIndex = 0, parent) => {
  list.id = parentIndex
  list.forEach((elem, index) => {
    const id = parentIndex + (index + 1)
    elem.id = id
    idMapParent[id] = parent
    if (elem.child) {
      parentIndex = id * 100
      setIdMapParent(elem.child, parentIndex, elem)
    }
  })
}

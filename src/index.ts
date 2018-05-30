import createDragProvider from './drag-provider'
import createDragTarget from './drag-target'
import createDraggable from './draggable'
import createContext from './context'

//@ts-ignore
const draggula = (): any => {
  const { Provider, Consumer } = createContext()
  const DragProvider = createDragProvider(Provider)
  const Draggable = createDraggable(Consumer)
  const DragTarget = createDragTarget(Consumer)
  return { DragProvider, Draggable, DragTarget }
}
export default draggula

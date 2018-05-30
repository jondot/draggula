# Draggula

Draggula is a Drag and Drop solution for React Native with draggables, targets and snapping.

Originally created for games and visualizations, but can be used for other purposes as well.

## Quick Start

Install:

```
$ yarn add draggula
```

Here's an example using draggula. This example implements a puzzle with its set of parts:

```javascript
import draggula from 'draggula'
const { DragProvider, Draggable, DragTarget } = draggula()

const Puzzle = ({ onHits }) => (
  <DragProvider onUpdateHits={onHits}>
    {parts.map(part => (
      <DragTarget key={`target-${part.key}`} accept={part.key}>
        <View
          style={{
            position: 'absolute',
            ...part.layout
          }}
        />
      </DragTarget>
    ))}
    {parts.map(part => (
      <Draggable key={`draggable-${part.key}`} provide={part.key}>
        <Image source={part.image} style={part.layout} />
      </Draggable>
    ))}
  </DragProvider>
)
```

The API revolves around three simple rules:

1.  Everything happens within the context of a `DragProvider` (You can use as many as you like).
2.  Each `Draggable` has a `DragTarget` and both agree if `Draggable#provide === DragTarget.accept`.
3.  The contents of a `Draggable`/`DragTarget` are the first child - so what ever you decide to be creative with; views, images, animation, anything goes.

For a deeper dive (and for a lack of proper docs at this stage), check out the [types](src/types.ts).

A trade-off that was made in favor of performance and simplicity was absolute positioning. Since this library expects absolute positioning (it will not measure/redraw/relayout automatically), expect to handle it yourself if you ever need to.

# Contributing

Fork, implement, add tests, pull request, get my everlasting thanks and a respectable place here :).

### Thanks:

To all [Contributors](https://github.com/jondot/draggula/graphs/contributors) - you make this happen, thanks!

# Copyright

Copyright (c) 2018 [Dotan Nahum](http://gplus.to/dotan) [@jondot](http://twitter.com/jondot). See [LICENSE](LICENSE.txt) for further details.

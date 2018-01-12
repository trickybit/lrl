# LESS reference library
Keep your CSS library healthy.

## Problem
Perfectly realized naming systems become contradictory and bloated quickly. Confused collaborators, decide they can do it better/newer with their own perfectly realized system. A year later, repeat the same. How about let's define the underlaying patterns we use again and again and not export them to a naming system. Now we can decide to implement these patterns with a 100% semantic system or a super-detailed BEM system. Consistency is maintained under-the-hood and out of the weather. And next year, when we decide to change everything on the outside, the engine is still there, tuned up and ready to go.

## Usage

In
```
@import (reference) "layer";

details.overlay:extend(.layer) {
  background-color: silver;
}

dialog:extend(.layer) {
  background-color: black;
}
```
Out
```
details.overlay,
dialog {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

details.overlay {
  background-color: silver;
}

dialog {
  background-color: black;
}
```

## flex
- flex
  - align
    - baseline
    - center
    - end
    - start
    - content
      - start
      - end
      - center
      - between
      - around
    - self
      - start
      - end
      - center
      - baseline
      - stretch
  - justify
    - center
    - start
    - end
    - between
    - around
  - wrap
    - reverse
    - no
  - direction
    - column
      - reverse
    - row
      - reverse
  - grow
    - no
  - shrink
    - no
  - order
    - start
    - end

## grid
- grid
  - count-16
    - span-{1...16} (width)
      - width
      - basis
      - margin (left,right)
        - left
        - right

## layer
- layer (fix, align)
  - fix 
  - abs
  - align (stretch)
    - top
    - left
    - bottom
    - right
    - center (x, y)
      - x
      - y
    - stretch (x,y)
      - x
      - y

## page
  - gutter (margin)
    - top (margin)
      - margin
        - negate
      - padding
    - right (margin)
      - margin
        - negate
      - padding
    - bottom (margin)
      - margin
        - negate
      - padding
    - left (margin)
      - margin
        - negate
      - padding
    - x (margin)
      - margin
        - negate
      - padding
    - y (margin)
      - margin
        - negate
      - padding
  - a{0...6} (width, height)
    - width
      - basis
    - height
      - basis

import React from 'react'

import { GalleryGrid } from '../../src/lib/components/gallery-grid/gallery-grid'

const items = [
  { title: 'new' },
  { title: 'favorite' },
  { title: 'dry' },
  { title: 'wet' },
  { title: 'summer' },
  { title: 'longer title' },
  { title: 'winter' },
  { title: 'another long' },
]

export default {
  title: 'Component/Grid',
  component: GalleryGrid,
  argTypes: {
    classList: 'test-class',
  },
}

const Template = (args) => <GalleryGrid {...args} />

export const Primary = Template.bind({})
Primary.args = {
  columns: 3,
  items: items,
}

import React from 'react'

import { GalleryGrid } from '../../src/lib/components/gallery-grid/gallery-grid'
import { items } from '../lib/components/gallery-grid/stub'

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

import React from 'react'

import { GalleryGrid } from '../components/gallery-grid/gallery-grid'

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
}

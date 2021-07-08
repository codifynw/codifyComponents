import React from 'react'

import { ProductViewer } from '../../lib/components/product-viewer/product-viewer'
import { portraitProduct, currentProduct, rooms } from '../../lib/components/product-viewer/stub'

export default {
  title: 'Component/ProductViewer',
  component: ProductViewer,
}

const Template = (args) => <ProductViewer {...args} />

export const Landscape = Template.bind({})
Landscape.args = {
  product: currentProduct,
  rooms: rooms,
}

export const Portrait = Template.bind({})
Portrait.args = {
  product: portraitProduct,
  rooms: rooms,
}

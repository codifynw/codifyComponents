import React from 'react'

import { ProductViewer } from '../../lib/components/product-viewer/product-viewer'
import { currentProduct, rooms } from '../../lib/components/product-viewer/stub'

export default {
  title: 'Component/ProductViewer',
  component: ProductViewer,
}

const Template = (args) => <ProductViewer {...args} />

export const Primary = Template.bind({})
Primary.args = {
  product: currentProduct,
  rooms: rooms,
}

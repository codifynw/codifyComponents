import React from 'react';
import { ProductViewer } from '../components/product-viewer/product-viewer';
import { portraitProduct, currentProduct, rooms } from '../components/product-viewer/stub'

export default {
  title: 'Codify/ProductViewer',
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

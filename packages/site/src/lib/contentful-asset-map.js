import { getAllAssets } from './contentful-api';

const assetMap = {
  preview: null,
  map: null,
};

function createMap(assets) {
  const map = new Map();
  for (let asset of assets) {
    map.set(asset.title, asset);
  }
  return map;
}

export async function getMap(preview) {
  if (preview === assetMap.preview && assetMap.map) {
    return assetMap.map;
  }
  const assets = await getAllAssets(preview);
  const map = createMap(assets);
  assetMap.preview = preview;
  assetMap.map = map;
  return map;
}

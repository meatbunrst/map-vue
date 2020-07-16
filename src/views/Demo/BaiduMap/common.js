/**
 * 初始化地图
 */

/* global BMapGL */
export const initMap = function(options) {
  options = Object.assign({
    tilt: 60,
    heading: 0
  }, options)
  var map = new BMapGL.Map('map_container', {
    restrictCenter: false,
    style: { styleJson: options.style || darkStyle }
  })
  map.enableKeyboard()
  map.enableScrollWheelZoom()
  map.enableInertialDragging()
  map.enableContinuousZoom()

  map.setDisplayOptions(options.displayOptions || {
    indoor: false,
    poi: false,
    skyColors: options.skyColors || [
      'rgba(5, 5, 30, 0.01)',
      'rgba(5, 5, 30, 1.0)'
    ]
  })
  if (options.center && options.zoom) {
    map.centerAndZoom(new BMapGL.Point(options.center[0], options.center[1]), options.zoom)
  }

  map.setTilt(options.tilt)
  map.setHeading(options.heading)
  return map
}

const darkStyle = [{
  featureType: 'background',
  elementType: 'geometry',
  stylers: {
    color: '#070c17ff'
  }
}, {
  featureType: 'poilabel',
  elementType: 'labels.icon',
  stylers: {
    visibility: 'off'
  }
}, {
  featureType: 'road',
  elementType: 'labels',
  stylers: {
    visibility: 'off'
  }
}, {
  featureType: 'road',
  elementType: 'geometry.fill',
  stylers: {
    color: '#151e25ff'
  }
}, {
  featureType: 'road',
  elementType: 'geometry.stroke',
  stylers: {
    color: '#ffffff0'
  }
}, {
  featureType: 'highway',
  elementType: 'geometry.fill',
  stylers: {
    color: '#27303bff'
  }
}, {
  featureType: 'highway',
  elementType: 'geometry.stroke',
  stylers: {
    color: '#ffffff0'
  }
}, {
  featureType: 'nationalway',
  elementType: 'geometry.fill',
  stylers: {
    color: '#27303bff'
  }
}, {
  featureType: 'nationalway',
  elementType: 'geometry.stroke',
  stylers: {
    color: '#ffffff0'
  }
}, {
  featureType: 'provincialway',
  elementType: 'geometry.fill',
  stylers: {
    color: '#27303bff'
  }
}, {
  featureType: 'provincialway',
  elementType: 'geometry.stroke',
  stylers: {
    color: '#ffffff0'
  }
}, {
  featureType: 'railway',
  elementType: 'geometry',
  stylers: {
    visibility: 'off'
  }
}, {
  featureType: 'highwaysign',
  elementType: 'labels',
  stylers: {
    visibility: 'off'
  }
}, {
  featureType: 'highwaysign',
  elementType: 'labels.icon',
  stylers: {
    visibility: 'off'
  }
}, {
  featureType: 'nationalwaysign',
  elementType: 'labels.icon',
  stylers: {
    visibility: 'off'
  }
}, {
  featureType: 'nationalwaysign',
  elementType: 'labels',
  stylers: {
    visibility: 'off'
  }
}, {
  featureType: 'provincialwaysign',
  elementType: 'labels',
  stylers: {
    visibility: 'off'
  }
}, {
  featureType: 'provincialwaysign',
  elementType: 'labels.icon',
  stylers: {
    visibility: 'off'
  }
}, {
  featureType: 'tertiarywaysign',
  elementType: 'labels',
  stylers: {
    visibility: 'off'
  }
}, {
  featureType: 'tertiarywaysign',
  elementType: 'labels.icon',
  stylers: {
    visibility: 'off'
  }
}, {
  featureType: 'subwaylabel',
  elementType: 'labels',
  stylers: {
    visibility: 'off'
  }
}, {
  featureType: 'subwaylabel',
  elementType: 'labels.icon',
  stylers: {
    visibility: 'off'
  }
}, {
  featureType: 'poilabel',
  elementType: 'labels.text.fill',
  stylers: {
    color: '#80868dff'
  }
}, {
  featureType: 'poilabel',
  elementType: 'labels.text.stroke',
  stylers: {
    color: '#ffffff0'
  }
}, {
  featureType: 'districtlabel',
  elementType: 'labels.text.fill',
  stylers: {
    color: '#71767aff'
  }
}, {
  featureType: 'districtlabel',
  elementType: 'labels.text.stroke',
  stylers: {
    color: '#ffffff0'
  }
}, {
  featureType: 'poilabel',
  elementType: 'labels',
  stylers: {
    visibility: 'off'
  }
}, {
  featureType: 'airportlabel',
  elementType: 'labels',
  stylers: {
    visibility: 'on'
  }
}, {
  featureType: 'airportlabel',
  elementType: 'labels.icon',
  stylers: {
    visibility: 'off'
  }
}, {
  featureType: 'airportlabel',
  elementType: 'labels.text.fill',
  stylers: {
    color: '#80868dff'
  }
}, {
  featureType: 'airportlabel',
  elementType: 'labels.text.stroke',
  stylers: {
    color: '#ffffff0'
  }
}, {
  featureType: 'manmade',
  elementType: 'labels',
  stylers: {
    visibility: 'off'
  }
}, {
  featureType: 'manmade',
  elementType: 'geometry',
  stylers: {
    color: '#070c17ff'
  }
}, {
  featureType: 'water',
  elementType: 'labels',
  stylers: {
    visibility: 'off'
  }
}, {
  featureType: 'water',
  elementType: 'geometry',
  stylers: {
    color: '#141d27ff'
  }
}, {
  featureType: 'green',
  elementType: 'geometry',
  stylers: {
    color: '#122228ff',
    visibility: 'off'
  }
}, {
  featureType: 'subway',
  elementType: 'geometry',
  stylers: {
    visibility: 'off'
  }
}, {
  featureType: 'highway',
  elementType: 'labels',
  stylers: {
    visibility: 'on'
  }
}, {
  featureType: 'highway',
  elementType: 'labels.text.stroke',
  stylers: {
    color: '#ffffff0'
  }
}, {
  featureType: 'highway',
  elementType: 'labels.text.fill',
  stylers: {
    color: '#5f6468ff'
  }
}, {
  featureType: 'town',
  elementType: 'labels',
  stylers: {
    visibility: 'off'
  }
}, {
  featureType: 'village',
  elementType: 'labels',
  stylers: {
    visibility: 'off'
  }
}, {
  featureType: 'highway',
  elementType: 'geometry',
  stylers: {
    weight: 3
  }
}, {
  featureType: 'cityhighway',
  elementType: 'geometry.fill',
  stylers: {
    color: '#27303bff'
  }
}, {
  featureType: 'arterial',
  elementType: 'geometry.fill',
  stylers: {
    color: '#27303bff'
  }
}, {
  featureType: 'arterial',
  elementType: 'geometry.stroke',
  stylers: {
    color: '#ffffff0'
  }
}, {
  featureType: 'cityhighway',
  elementType: 'geometry.stroke',
  stylers: {
    color: '#ffffff0'
  }
}]

export const purpleStyle = [{
  featureType: 'water',
  elementType: 'all',
  stylers: {
    color: '#021019ff'
  }
}, {
  featureType: 'highway',
  elementType: 'geometry.fill',
  stylers: {
    color: '#000000ff'
  }
}, {
  featureType: 'highway',
  elementType: 'geometry.stroke',
  stylers: {
    color: '#147a92ff'
  }
}, {
  featureType: 'arterial',
  elementType: 'geometry.fill',
  stylers: {
    color: '#000000ff'
  }
}, {
  featureType: 'arterial',
  elementType: 'geometry.stroke',
  stylers: {
    color: '#0b3d51ff'
  }
}, {
  featureType: 'local',
  elementType: 'geometry',
  stylers: {
    color: '#000000ff'
  }
}, {
  featureType: 'land',
  elementType: 'all',
  stylers: {
    color: '#08304bff'
  }
}, {
  featureType: 'railway',
  elementType: 'geometry.fill',
  stylers: {
    color: '#000000ff'
  }
}, {
  featureType: 'railway',
  elementType: 'geometry.stroke',
  stylers: {
    color: '#08304bff'
  }
}, {
  featureType: 'subway',
  elementType: 'geometry',
  stylers: {
    visibility: 'off'
  }
}, {
  featureType: 'building',
  elementType: 'geometry.fill',
  stylers: {
    color: '#000000ff'
  }
}, {
  featureType: 'all',
  elementType: 'labels.text.fill',
  stylers: {
    color: '#857f7fff'
  }
}, {
  featureType: 'all',
  elementType: 'labels.text.stroke',
  stylers: {
    color: '#000000ff'
  }
}, {
  featureType: 'building',
  elementType: 'geometry',
  stylers: {
    color: '#022338ff'
  }
}, {
  featureType: 'green',
  elementType: 'geometry',
  stylers: {
    color: '#062032ff'
  }
}, {
  featureType: 'manmade',
  elementType: 'geometry',
  stylers: {
    color: '#022338ff'
  }
}, {
  featureType: 'poi',
  elementType: 'all',
  stylers: {
    visibility: 'off'
  }
}, {
  featureType: 'all',
  elementType: 'labels.icon',
  stylers: {
    visibility: 'off'
  }
}, {
  featureType: 'land',
  elementType: 'all',
  stylers: {
    color: '#40495aff',
    visibility: 'on'
  }
}, {
  featureType: 'water',
  elementType: 'all',
  stylers: {
    color: '#505565ff',
    visibility: 'on'
  }
}, {
  featureType: 'green',
  elementType: 'all',
  stylers: {
    color: '#353b4dff'
  }
}, {
  featureType: 'road',
  elementType: 'geometry.fill',
  stylers: {
    color: '#2a2e3bff',
    visibility: 'on'
  }
}, {
  featureType: 'road',
  elementType: 'geometry.stroke',
  stylers: {
    color: '#4b5163ff'
  }
}, {
  featureType: 'administrative',
  elementType: 'labels.text.fill',
  stylers: {
    color: '#8e99bdff'
  }
}, {
  featureType: 'administrative',
  elementType: 'labels.text.stroke',
  stylers: {
    color: '#2f3547ff'
  }
}, {
  featureType: 'poilabel',
  elementType: 'labels.text.fill',
  stylers: {
    color: '#727c9aff'
  }
}, {
  featureType: 'road',
  elementType: 'labels.text.stroke',
  stylers: {
    color: '#293045ff'
  }
}, {
  featureType: 'road',
  elementType: 'labels.text.fill',
  stylers: {
    color: '#777e93ff'
  }
}, {
  featureType: 'town',
  elementType: 'all',
  stylers: {
    visibility: 'on'
  }
}, {
  featureType: 'subway',
  elementType: 'labels.text.fill',
  stylers: {
    color: '#787f95ff',
    visibility: 'off'
  }
}, {
  featureType: 'subway',
  elementType: 'labels.text.stroke',
  stylers: {
    color: '#40475eff'
  }
}, {
  featureType: 'building',
  elementType: 'geometry.fill',
  stylers: {
    color: '#485161ff'
  }
}, {
  featureType: 'manmade',
  elementType: 'geometry.fill',
  stylers: {
    color: '#374053ff'
  }
}, {
  featureType: 'manmade',
  elementType: 'labels.text.fill',
  stylers: {
    color: '#8792adff'
  }
}, {
  featureType: 'manmade',
  elementType: 'labels.text.stroke',
  stylers: {
    color: '#292f48ff'
  }
}, {
  featureType: 'districtlabel',
  elementType: 'all',
  stylers: {}
}, {
  featureType: 'scenicspotslabel',
  elementType: 'labels',
  stylers: {
    visibility: 'off'
  }
}, {
  featureType: 'railway',
  elementType: 'geometry',
  stylers: {
    visibility: 'off'
  }
}, {
  featureType: 'scenicspotslabel',
  elementType: 'labels.icon',
  stylers: {
    visibility: 'off'
  }
}, {
  featureType: 'highwaysign',
  elementType: 'labels',
  stylers: {
    visibility: 'off'
  }
}, {
  featureType: 'highwaysign',
  elementType: 'labels.icon',
  stylers: {
    visibility: 'off'
  }
}, {
  featureType: 'nationalwaysign',
  elementType: 'labels.icon',
  stylers: {
    visibility: 'off'
  }
}, {
  featureType: 'nationalwaysign',
  elementType: 'labels',
  stylers: {
    visibility: 'off'
  }
}, {
  featureType: 'provincialwaysign',
  elementType: 'labels.icon',
  stylers: {
    visibility: 'off'
  }
}, {
  featureType: 'provincialwaysign',
  elementType: 'labels',
  stylers: {
    visibility: 'off'
  }
}, {
  featureType: 'tertiarywaysign',
  elementType: 'labels.icon',
  stylers: {
    visibility: 'off'
  }
}, {
  featureType: 'tertiarywaysign',
  elementType: 'labels',
  stylers: {
    visibility: 'off'
  }
}, {
  featureType: 'subwaylabel',
  elementType: 'labels.icon',
  stylers: {
    visibility: 'off'
  }
}, {
  featureType: 'subwaylabel',
  elementType: 'labels',
  stylers: {
    visibility: 'off'
  }
}, {
  featureType: 'roadarrow',
  elementType: 'labels.icon',
  stylers: {
    visibility: 'off'
  }
}, {
  featureType: 'village',
  elementType: 'labels',
  stylers: {
    visibility: 'off'
  }
}, {
  featureType: 'town',
  elementType: 'labels',
  stylers: {
    visibility: 'off'
  }
}]

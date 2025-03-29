import { Component } from '@angular/core'
import { BreadcrumbComponent } from '../../../components/breadcrumb/breadcrumb.component'
import 'jsvectormap'
import 'jsvectormap/dist/maps/world'
import 'jsvectormap/dist/maps/world-merc'
import 'jsvectormap/dist/maps/us-merc-en'
import 'jsvectormap/dist/maps/russia'
import 'jsvectormap/dist/maps/italy'
import 'jsvectormap/dist/maps/canada'
import 'jsvectormap/dist/maps/iraq'
import 'jsvectormap/dist/maps/spain'
import 'jsvectormap/dist/maps/us-lcc-en'
import 'jsvectormap/dist/maps/us-mill-en'
import { WorldVectorMapComponent } from '@components/vector-maps/world-vector-map.component'

@Component({
    selector: 'app-vector',
    imports: [BreadcrumbComponent, WorldVectorMapComponent],
    templateUrl: './vector.component.html',
    styles: ``
})
export class VectorComponent {
  worldLineMapConfig = {
    map: 'world_merc',
    selector: '#world-mapline-markers',
    zoomOnScroll: false,
    zoomButtons: false,
    markersSelectable: true,
    showTooltip: false,
    markers: [
      { name: 'Greenland', coords: [72, -42] },
      { name: 'Canada', coords: [56.1304, -106.3468] },
      { name: 'Germany', coords: [51.1657, 10.4515] },
      { name: 'Japan', coords: [36.2048, 138.2529] },
      { name: 'United States', coords: [37.0902, -95.7129] },
      { name: 'Egypt', coords: [26.8206, 30.8025] },
      { name: 'Brazil', coords: [-14.235, -51.9253] },
      { name: 'Australia', coords: [-25.2744, 133.7751] },
      { name: 'Malaysia', coords: [4.2105, 101.9758] },
      { name: 'China', coords: [35.8617, 104.1954] },
      { name: 'Norway', coords: [60.472024, 8.468946] },
      { name: 'Ukraine', coords: [48.379433, 31.16558] },
    ],
    lines: [
      { from: 'Greenland', to: 'Egypt' },
      { from: 'Canada', to: 'Egypt' },
      { from: 'Germany', to: 'Egypt' },
      { from: 'Japan', to: 'Egypt' },
      { from: 'United States', to: 'Egypt' },
      { from: 'Brazil', to: 'Egypt' },
      { from: 'Australia', to: 'Egypt' },
      { from: 'Malaysia', to: 'Egypt' },
      { from: 'China', to: 'Egypt' },
      { from: 'Norway', to: 'Egypt' },
      { from: 'Ukraine', to: 'Egypt' },
    ],
    regionStyle: {
      initial: {
        stroke: '#4a5a6b',
        fill: '#ced4da',
        strokeWidth: 0.25,
        fillOpacity: 1,
      },
    },
    markerStyle: {
      initial: {
        fill: '#343a40',
      },
    },
    labels: {
      markers: {
        render: (marker: any) => marker.name,
      },
    },
    lineStyle: {
      animation: true,
      strokeDasharray: '6 3 6',
    },
  }

  worldMapMarker = {
    map: 'world_merc',
    selector: '#world-map-markers',
    zoomOnScroll: false,
    zoomButtons: false,
    selectedMarkers: [0, 2],
    showTooltip: false,
    markersSelectable: true,
    markers: [
      { name: 'Palestine', coords: [31.9474, 35.2272] },
      { name: 'Russia', coords: [61.524, 105.3188] },
      { name: 'Canada', coords: [56.1304, -106.3468] },
      { name: 'Greenland', coords: [71.7069, -42.6043] },
    ],
    regionStyle: {
      initial: {
        stroke: '#4a5a6b',
        fill: '#ced4da',
        strokeWidth: 0.25,
        fillOpacity: 1,
      },
    },
    markerStyle: {
      initial: { fill: '#343a40' },
      selected: { fill: 'red' },
    },
    labels: {
      markers: {
        render: (marker: any) => marker.name,
      },
    },
  }

  worldMapImage = {
    map: 'world_merc',
    selector: '#world-map-markers-image',
    zoomOnScroll: false,
    zoomButtons: false,
    showTooltip: false,
    regionStyle: {
      initial: {
        stroke: '#4a5a6b',
        fill: '#ced4da',
        strokeWidth: 0.25,
        fillOpacity: 1,
      },
    },
    selectedMarkers: [0, 2],
    markersSelectable: true,
    markers: [
      { name: 'Palestine', coords: [31.9474, 35.2272] },
      { name: 'Russia', coords: [61.524, 105.3188] },
      { name: 'Canada', coords: [56.1304, -106.3468] },
      { name: 'Greenland', coords: [71.7069, -42.6043] },
    ],
    markerStyle: {
      initial: {
        image: 'assets/images/logo-sm.png',
      },
    },
    labels: {
      markers: {
        render: (marker: any) => marker.name,
      },
    },
  }

  canadaMap = {
    map: 'canada',
    zoomOnScroll: false,
    showTooltip: false,
    zoomButtons: false,
    selector: '#canada-vectormap',
    regionStyle: {
      initial: {
        stroke: '#4a5a6b',
        fill: '#ced4da',
        strokeWidth: 0.25,
        fillOpacity: 1,
      },
    },
  }

  usaMap = {
    selector: '#usa-vectormap',
    map: 'us_merc_en',
    showTooltip: false,
    zoomOnScroll: false,
    zoomButtons: false,
    regionStyle: {
      initial: {
        stroke: '#4a5a6b',
        fill: '#ced4da',
        strokeWidth: 0.25,
        fillOpacity: 1,
      },
    },
  }

  russiaMApConfig = {
    map: 'russia',
    selector: '#russia-vectormap',
    showTooltip: false,
    zoomOnScroll: false,
    zoomButtons: false,
    regionStyle: {
      initial: {
        stroke: '#4a5a6b',
        fill: '#ced4da',
        strokeWidth: 0.25,
        fillOpacity: 1,
      },
    },
  }

  spainMapConfig = {
    map: 'spain',
    showTooltip: false,
    zoomOnScroll: false,
    zoomButtons: false,
    selector: '#spain-vectormap',
    regionStyle: {
      initial: {
        stroke: '#4a5a6b',
        fill: '#ced4da',
        strokeWidth: 0.25,
        fillOpacity: 1,
      },
    },
  }

  iraqMapConfig = {
    map: 'iraq',
    zoomOnScroll: false,
    showTooltip: false,
    zoomButtons: false,
    selector: '#iraq-vectormap',
    regionStyle: {
      initial: {
        stroke: '#4a5a6b',
        fill: '#ced4da',
        strokeWidth: 0.25,
        fillOpacity: 1,
      },
    },
  }

  uslccmap = {
    map: 'us_lcc_en',
    zoomOnScroll: false,
    zoomButtons: false,
    showTooltip: false,
    selector: '#us-lcc-vectormap',
    regionStyle: {
      initial: {
        stroke: '#4a5a6b',
        fill: '#ced4da',
        strokeWidth: 0.25,
        fillOpacity: 1,
      },
    },
  }

  usmillmap = {
    map: 'us_mill_en',
    zoomOnScroll: false,
    zoomButtons: false,
    showTooltip: false,
    selector: '#us-mill-vectormap',
    regionStyle: {
      initial: {
        stroke: '#4a5a6b',
        fill: '#ced4da',
        strokeWidth: 0.25,
        fillOpacity: 1,
      },
    },
  }
}

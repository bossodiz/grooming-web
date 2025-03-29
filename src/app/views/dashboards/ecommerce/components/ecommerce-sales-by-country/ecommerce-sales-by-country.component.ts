import { Component } from '@angular/core'
import { WorldVectorMapComponent } from '@components/vector-maps/world-vector-map.component'
import 'jsvectormap'
import 'jsvectormap/dist/maps/world-merc'

@Component({
    selector: 'app-ecommerce-sales-by-country',
    imports: [WorldVectorMapComponent],
    templateUrl: './ecommerce-sales-by-country.component.html',
    styles: ``
})
export class EcommerceSalesByCountryComponent {
  
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
      selected: { fill: '#343a40' },
    },
    labels: {
      markers: {
        render: (marker: any) => marker.name,
      },
    },
  }
}
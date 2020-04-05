export class KSMarkerModel{
  lat: number;
  lng: number;
  label?: string;
  draggable?: boolean
    constructor(data) {
        this.lat = data.lat;
        this.lng = data.lng;
        this.label = data.label || '';
        this.draggable = data.draggable || true;
    }
}

export class KSLocationModel {
  lat: number;
  lng: number;
  viewport?: any;
  zoom?: number;
  marker?: KSMarkerModel
    constructor(data) {
        this.lat = data.lat;
        this.lng = data.lng;
        this.viewport = data.label || null;
        this.marker = data.marker;
    }

}

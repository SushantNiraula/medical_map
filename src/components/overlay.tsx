import { createOverlayProps, Pane } from "@/utils/types";

// return lat, lng from LatLngLiteral
const getLatLng = (LatLng: google.maps.LatLng | null) => {
  try {
    const latLng = {
      lat: LatLng?.lat(),
      lng: LatLng?.lng(),
    } as google.maps.LatLngLiteral;
    return latLng;
  } catch (e) {
    console.log("Error in getLatLng", e);
    return LatLng;
  }
};

const createOverlay = ({
  container,
  pane,
  position,
  maps,
  drag,
}: createOverlayProps) => {
  class Overlay extends google.maps.OverlayView {
    /**
     * onAdd is called when the map's panes are ready and the overlay has been
     * added to the map.
     */
    onAdd = () => {
      // manage draggable
      if (drag?.draggable) {
        this.get("map")
          .getDiv()
          .addEventListener("mouseleave", () => {
            google.maps.event.trigger(this.container, "mouseup");
          });

        this.container.addEventListener("mousedown", (e: MouseEvent) => {
          this.container.style.cursor = "grabbing";
          this.map?.set("draggable", false);
          this.set("origin", e);

          drag.onDragStart(e, { latLng: getLatLng(this.position) });

          this.moveHandler = this.get("map")
            ?.getDiv()
            .addEventListener("mousemove", (evt: MouseEvent) => {
              const origin = this.get("origin") as MouseEvent;
              if (!origin) return;
              const left = origin.clientX - evt.clientX;
              const top = origin.clientY - evt.clientY;
              const pos = this.getProjection()?.fromLatLngToDivPixel(
                this.position
              );
              if (!pos) return;
              const latLng = this.getProjection()?.fromDivPixelToLatLng(
                new maps.Point(pos.x - left, pos.y - top)
              );
              this.set("position", latLng);
              this.set("origin", evt);
              this.draw();
              drag.onDrag(evt, { latLng: getLatLng(latLng) });
            });
        });

        this.container.addEventListener("mouseup", (e) => {
          this.map?.set("draggable", true);
          this.container.style.cursor = "default";
          if (this.moveHandler) {
            google.maps.event.removeListener(this.moveHandler);
            this.moveHandler = null;
          }
          this.set("position", this.position); // set position to last valid position
          this.set("origin", undefined); // unset origin so that the next mousedown starts fresh
          this.draw();
          drag.onDragEnd(e, { latLng: getLatLng(this.position) });
        });
      }
      // Add the element to the pane.
      const currentPane = this.getPanes()?.[this.pane] as HTMLElement;
      currentPane?.classList.add("google-map-markers-overlay");
      currentPane?.appendChild(this.container);
    };

    draw = () => {
      const projection =
        this.getProjection() as google.maps.MapCanvasProjection;
      // Computes the pixel coordinates of the given geographical location in the DOM element that holds the draggable map.
      const point = projection?.fromLatLngToDivPixel(
        this.position
      ) as google.maps.Point;

      // Manage offset for the overlay, since the overlay is centered on the point
      // we need to offset the overlay by half of its width and height
      // to make the overlay appear where the point is
      const offset = {
        x: this.container.offsetWidth / 2,
        y: this.container.offsetHeight / 2,
      };

      if (!point) return;

      // Set the overlay's position
      this.container.style.left = `${point.x - offset.x}px`;
      this.container.style.top = `${point.y - offset.y}px`;
    };

    /**
     * The onRemove() method will be called automatically from the API if
     * we ever set the overlay's map property to 'null'.
     */
    onRemove = () => {
      if (this.container.parentNode !== null) {
        // remove DOM listeners
        google.maps.event.clearInstanceListeners(this.container);
        this.container.parentNode.removeChild(this.container);
      }
    };

    public container: HTMLDivElement;

    public pane: Pane;

    public position: google.maps.LatLng;

    public map = this.getMap();

    public moveHandler: null;

    // eslint-disable-next-line no-shadow
    constructor(
      container: HTMLDivElement,
      pane: Pane,
      position: google.maps.LatLng
    ) {
      super();

      // Initialize all properties.
      this.container = container;
      this.pane = pane;
      this.position = position;

      this.moveHandler = null;
    }
  }

  return new Overlay(container, pane, position);
};

export default createOverlay;

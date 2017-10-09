import {ConstantService} from "./constant.service";
export class StoryConstantService{
  public static STORIES = [
    {
      text: "Part1",
      startMarker: {lat: 48.395315, lng: 9.990424},
      endMarker: {lat: 47.782232, lng: 9.613402},
      steps: [
        {
          action: ConstantService.MAP_ACTIONS.FOCUS_LAT_LNG,
          text: "On an immemorable June day for most, I was born here",
          delay: 250,
          latLng: {
            lat: 48.395315,
            lng: 9.990424
          },
          zoom: 13
        }, {
          action: ConstantService.MAP_ACTIONS.ADD_START_MARKER,
          text: "On an immemorable June day for most, I was born here",
          delay: 2500,
          latLng: {
            lat: 48.395315,
            lng: 9.990424
          },
          zoom: 13
        }, {
          action: ConstantService.MAP_ACTIONS.CHANGE_ZOOM,
          text: "But I wouldn't stay in Ulm too long",
          delay: 900,
          latLng: {
            lat: 48.395315,
            lng: 9.990424
          },
          zoom: 9
        }, {
          action: ConstantService.MAP_ACTIONS.ADD_PATH,
          text: "When I was still fairly little I moved here",
          delay: 2500,
          latLng: null,
          zoom: 9
        }, {
          action: ConstantService.MAP_ACTIONS.ADD_END_MARKER,
          text: "Where I would stay for awhile",
          delay: 3050,
          latLng: {
            lat: 47.782232,
            lng: 9.613402
          },
          zoom: 9
        }, {
          action: ConstantService.MAP_ACTIONS.CHANGE_ZOOM,
          text: "Where I would stay for awhile",
          delay: 900,
          latLng: {
            lat: 48.395315,
            lng: 9.990424
          },
          zoom: 11
        }
      ]
    }, {
      text: "Part2",
      startMarker: {lat: 47.782232, lng: 9.613402},
      endMarker: {lat: 47.691274, lng: 9.818637},
      steps: [
        {
          action: ConstantService.MAP_ACTIONS.ADD_PATH,
          text: "I did bounce around the area somewhat though",
          delay: 2500,
          latLng: null,
          zoom: 11
        }, {
          action: ConstantService.MAP_ACTIONS.ADD_END_MARKER,
          text: "Was here very briefly",
          delay: 3050,
          latLng: {lat: 47.691274, lng: 9.818637},
          zoom: 11
        }
      ]
    }, {
      text: "Part3",
      startMarker: {lat: 47.691274, lng: 9.818637},
      endMarker: {lat: 47.782232, lng: 9.613402},
      steps: [
        {
          action: ConstantService.MAP_ACTIONS.ADD_PATH,
          text: "But went back before too long",
          delay: 1250,
          latLng: null,
          zoom: 11
        }, {
          action: ConstantService.MAP_ACTIONS.ADD_END_MARKER,
          text: "Back in Ravensburg, but a big change was coming",
          delay: 3050,
          latLng: {lat: 47.782232, lng: 9.613402},
          zoom: 11
        }
      ]
    }, {
      text: "Part4",
      startMarker: {lat: 47.782232, lng: 9.613402},
      endMarker: {lat: 38.624519, lng: -90.185043},
      steps: [
        {
          action: ConstantService.MAP_ACTIONS.CHANGE_ZOOM,
          text: "Back in Ravensburg, but a big change was coming",
          delay: 2000,
          latLng: {lat: 47.782232, lng: 9.613402},
          zoom: 5
        }, {
          action: ConstantService.MAP_ACTIONS.ADD_PATH,
          text: "Moved somewhere very different",
          delay: 2500,
          latLng: null,
          zoom: 5
        }, {
          action: ConstantService.MAP_ACTIONS.ADD_END_MARKER,
          text: "A bit of a culture shock, but I adapted",
          delay: 3050,
          latLng: {
            lat: 38.624519,
            lng: -90.185043
          },
          zoom: 5
        }, {
          action: ConstantService.MAP_ACTIONS.CHANGE_ZOOM,
          text: "This was home from grade school through high school",
          delay: 2500,
          latLng: {lat: 47.782232, lng: 9.613402},
          zoom: 9
        },
      ]
    }, {
      text: "Part5",
      startMarker: {lat: 38.624519, lng: -90.185043},
      endMarker: {lat: 38.947736, lng: -92.322986},
      steps: [
        {
          action: ConstantService.MAP_ACTIONS.ADD_PATH,
          text: "College would take me someplace nearby",
          delay: 2000,
          latLng: null,
          zoom: 9
        }, {
          action: ConstantService.MAP_ACTIONS.ADD_END_MARKER,
          text: "Learned and discovered a lot in Columbia",
          delay: 3050,
          latLng: {
            lat: 38.947736,
            lng: -92.322986
          },
          zoom: 9
        }, {
          action: ConstantService.MAP_ACTIONS.CHANGE_ZOOM,
          text: "I would finish school back in St. Louis though",
          delay: 1500,
          latLng: {
            lat: 38.947736,
            lng: -92.322986
          },
          zoom: 8
        }
      ]
    }, {
      text: "Part6",
      startMarker: {lat: 38.947736, lng: -92.322986},
      endMarker: {lat: 38.624519, lng: -90.185043},
      steps: [
        {
          action: ConstantService.MAP_ACTIONS.ADD_PATH,
          text: "I would finish school back in St. Louis though",
          delay: 2000,
          latLng: null,
          zoom: 8
        }, {
          action: ConstantService.MAP_ACTIONS.ADD_END_MARKER,
          text: "After working in the St. Louis area for a few years",
          delay: 3050,
          latLng: {
            lat: 38.624519,
            lng: -90.185043
          },
          zoom: 8
        }
      ]
    }, {
      text: "Part7",
      startMarker: {lat: 38.624519, lng: -90.185043},
      endMarker: {lat: 37.625891, lng: -122.243500},
      steps: [
        {
          action: ConstantService.MAP_ACTIONS.CHANGE_ZOOM,
          text: "I am currently planning on making another big change",
          delay: 2000,
          latLng: {
            lat: 38.947736,
            lng: -92.322986
          },
          zoom: 6
        }, {
          action: ConstantService.MAP_ACTIONS.ADD_PATH,
          text: "So, as I continue my journey west",
          delay: 3050,
          latLng: null,
          zoom: 6
        }, {
          action: ConstantService.MAP_ACTIONS.ADD_END_MARKER,
          text: "I hope to continue my growth and development, somewhere around the bay area",
          delay: 3000,
          latLng: {
            lat: 37.625891,
            lng: -122.243500
          },
          zoom: 6
        }, {
          action: ConstantService.MAP_ACTIONS.CHANGE_ZOOM,
          text: "I am currently looking for someone that needs help in this area",
          delay: 3000,
          latLng: {
            lat: 37.625891,
            lng: -122.243500
          },
          zoom: 6
        }
      ]
    }, {
      text: "Part8",
      startMarker: {lat: 37.625891, lng: -122.243500},
      endMarker: {lat: 37.625891, lng: -122.243500},
      steps: [
        {
          action: ConstantService.MAP_ACTIONS.CHANGE_ZOOM,
          text: "Thanks for watching",
          delay: 3000,
          latLng: {
            lat: 37.625891,
            lng: -122.243500
          },
          zoom: 4
        }
      ]
    }
  ];
}

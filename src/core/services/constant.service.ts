export class ConstantService {
  public static FLEX_LAYOUT = {
    NO_GROW: '0 1 auto'
  };

  public static MAP_ACTIONS = {
    ADD_START_MARKER: "add_start_marker",
    ADD_END_MARKER: "add_end_marker",
    ADD_PATH: "add_path",
    FOCUS_ADD_PATH: "focus_add_path",
    FOCUS_BOUNDS: "focus_bounds",
    FOCUS_PATH: "focus_path",
    FOCUS_LAT_LNG: "focus_lat_lng",
  };

  /*These used to be Google's enums but issues with async loading on the script*/
  public static ICON_SHAPES = {
    ACTIVE_CIRCLE: {
      path: 0,//Kinda hacky, SymbolPath.CIRCLE = 0
      scale: 16,
      strokeColor: '#4C9CB7',
      strokeWeight: 4,
      fillColor: '#FFB700',
      fillOpacity: .75
    },
    INACTIVE_CIRCLE: {
      path: 0,//Kinda hacky, SymbolPath.CIRCLE = 0
      scale: 4,
      strokeColor: '#4C9CB7',
      strokeWeight: 4
    },
    ANIMATED_ARROW: {
      path: 4,//Kinda hacky, SymbolPath.FORWARD_OPEN_ARROW = 4
      scale: 7,
      strokeColor: '#FFB700',
      strokeWeight: 4,
      strokeOpacity: 1,
    }
  };

  public static PICTURE_URLS = [
    'https://images.unsplash.com/photo-1428094479093-8973a318bd76?dpr=1&auto=compress,format&fm=jpg',
    'https://images.unsplash.com/photo-1435783099294-283725c37230?dpr=1&auto=compress,format&fm=jpg',
    'https://images.unsplash.com/photo-1429794890858-d3016a2bb73c?dpr=1&auto=compress,format&fm=jpg',
    'https://images.unsplash.com/photo-1490598000245-075175152d25?dpr=1&auto=compress,format&fm=jpg'
  ];

  public static TECH_IMAGE_LINKS = [
    {
      name: 'Angular',
      imgSrc: 'assets/Angular_logo.svg',
      information: [
        'So good',
        'Building data driven interfaces',
        '1.x or 2+ whatever, it don\'t matter'
      ]
    }, {
      name: 'Node.js',
      imgSrc: 'assets/Node.js_logo.svg',
      information: [
        'Setting data services to drive user interfaces',
        'Of course Express too',
        'Basically MEAN stack, if MYSQL were \'M\''
      ]
    }, {
      name: 'TypeScript',
      imgSrc: 'assets/TypeScript_logo.svg',
      information: [
        'Microsoft has been up to some good stuff lately',
        'I love this so far',
      ]
    }, {
      name: 'Android',
      imgSrc: 'assets/Android_logo.svg',
      information: [
        'Wouldn\'t mind doing more of this',
        'My first mobile interest'
      ]
    }, {
      name: 'Ionic',
      imgSrc: 'assets/Ionic_logo.svg',
      information: [
        'Have actual project/work experience here',
        'An interesting cross section between Angular and native mobile development'
      ]
    }, {
      name: 'Java',
      imgSrc: 'assets/Java_logo.svg',
      information: [
        'Where I started',
        'Though most of the Java I deal with now is Android'
      ]
    }, {
      name: 'PHP',
      imgSrc: 'assets/PHP_logo.svg',
      information: [
        'Symfony is pretty tolerable for a PHP framework',
        'Then you just use Symfony as an API to serve your Angular front-end',
        'Basically I can, but I\'d rather not'
      ]
    }
  ];

  public static ANIMATION_VIEW_STATES = {
    IN_VIEW: 'isInView',
    NOT_IN_VIEW: 'isNotInView',
    TRANSITION_INTO_VIEW: 'isNotInView => isInView',
    TRANSITION_OUT_OF_VIEW: 'isInView => isNotInView',
  };

  public static STORIES = [
    {
      text: "Part1",
      startMarker: {lat: 48.395315, lng: 9.990424},
      endMarker: {lat: 47.782232, lng: 9.613402},
      steps: [
        {
          action: ConstantService.MAP_ACTIONS.FOCUS_LAT_LNG,
          text: "One fateful June day, things started for me here",
          delay: 250,
          latLng: {
            lat: 48.395315,
            lng: 9.990424
          },
          bounds: null,
          zoom: 13
        }, {
          action: ConstantService.MAP_ACTIONS.ADD_START_MARKER,
          text: "One fateful June day, things started for me here",
          delay: 1500,
          latLng: {
            lat: 48.395315,
            lng: 9.990424
          },
          bounds: null,
          zoom: 13
        }, {
          action: ConstantService.MAP_ACTIONS.FOCUS_ADD_PATH,
          text: "Moved here while I was still pretty little",
          delay: 2500,
          latLng: null,
          bounds: null,
          zoom: 9
        }, {
          action: ConstantService.MAP_ACTIONS.ADD_END_MARKER,
          text: "Stayed here for awhile",
          delay: 3000,
          latLng: {
            lat: 47.782232,
            lng: 9.613402
          },
          bounds: null,
          zoom: 9
        }
      ]
    }, {
      text: "Part2",
      startMarker: {lat: 47.782232, lng: 9.613402},
      endMarker: {lat: 47.691274, lng: 9.818637},
      steps: [
        {
          action: ConstantService.MAP_ACTIONS.FOCUS_PATH,
          text: "Spent a lot of time here",
          delay: 3000,
          latLng: null,
          bounds: null,
          zoom: 11
        }, {
          action: ConstantService.MAP_ACTIONS.FOCUS_ADD_PATH,
          text: "Bounced around some more",
          delay: 2500,
          latLng: null,
          bounds: null,
          zoom: 11
        }, {
          action: ConstantService.MAP_ACTIONS.ADD_END_MARKER,
          text: "Was here very briefly",
          delay: 3000,
          latLng: {lat: 47.691274, lng: 9.818637},
          bounds: null,
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
          text: "Moved back before too long",
          delay: 2500,
          latLng: null,
          bounds: null,
          zoom: 11
        }, {
          action: ConstantService.MAP_ACTIONS.ADD_END_MARKER,
          text: "Back here for a time",
          delay: 3000,
          latLng: {lat: 47.782232, lng: 9.613402},
          bounds: null,
          zoom: 11
        }
      ]
    }, {
      text: "Part4",
      startMarker: {lat: 47.782232, lng: 9.613402},
      endMarker: {lat: 38.624519, lng: -90.185043},
      steps: [
        {
          action: ConstantService.MAP_ACTIONS.FOCUS_BOUNDS,
          text: "But then a big change.",
          delay: 3000,
          latLng: null,
          bounds: {
            sw: {lat: 9.474254308035103, lng: -138.76959851589015},
            ne: {lat: 69.30921854701235, lng: 60.4289101249999}
          },
          zoom: 3
        }, {
          action: ConstantService.MAP_ACTIONS.ADD_PATH,
          text: "Moved somewhere very different",
          delay: 2500,
          latLng: null,
          bounds: null,
          zoom: 3
        }, {
          action: ConstantService.MAP_ACTIONS.ADD_END_MARKER,
          text: "Ended up going through most of school here",
          delay: 3000,
          latLng: {
            lat: 38.624519,
            lng: -90.185043
          },
          bounds: null,
          zoom: 3
        }
      ]
    }
  ];

  public static COORDINATES = {
    ULM: {
      LAT: 48.395315,
      LNG: 9.990424
    },
    RAVENSBURG: {
      LAT: 47.782232,
      LNG: 9.613402
    },
    WANGEN: {
      LAT: 47.691274,
      LNG: 9.818637
    },
    ST_LOUIS: {
      LAT: 38.624519,
      LNG: -90.185043
    },
    COLUMBIA: {
      LAT: 38.947736,
      LNG: -92.322986
    },
    SF_BAY: {
      LAT: 37.625891,
      LNG: -122.243500
    },
  };
}

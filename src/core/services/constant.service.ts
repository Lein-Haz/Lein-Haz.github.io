export class ConstantService {
  public static FLEX_LAYOUT = {
    NO_GROW: '0 1 auto'
  };

  public static MAP_ACTIONS = {
    ADD_START_MARKER: "add_start_marker",
    ADD_END_MARKER: "add_end_marker",
    ADD_PATH: "add_path",
    FOCUS_LAT_LNG: "focus_lat_lng",
    CHANGE_ZOOM: "change_zoom"
  };

  public static CONVERSION_CONSTANTS = {
    KM_TO_MILE_MULTIPLIER: 0.621371,
    MILE_TO_KM_MULTIPLIER: 1.609344,
    M_TO_KM_MULTIPLIER: 0.001,
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
    'https://images.unsplash.com/photo-1428094479093-8973a318bd76?dpr=1&auto=compress,format&fm=jpg',//Aurora
    'https://images.unsplash.com/photo-1435783099294-283725c37230?dpr=1&auto=compress,format&fm=jpg',//Hana, Maui
    'https://images.unsplash.com/photo-1490598000245-075175152d25?dpr=1&auto=compress,format&fm=jpg',//golden gate
    'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?dpr=1&auto=compress,format&fm=jpg',//nasa space shot
    'https://images.unsplash.com/photo-1459664018906-085c36f472af?dpr=1&auto=compress,format&fm=jpg',//fractal flower
    'https://images.unsplash.com/photo-1444882158336-bcfbd9298309?dpr=1&auto=compress,format&fm=jpg'//Singapore

  ];

  public static MORE_PICTURES_THAT_IM_NOT_USING_RN = [
    'https://images.unsplash.com/photo-1417577097439-425fb7dec05e?dpr=1&auto=compress,format&fm=jpg',//nebula & earth
    'https://images.unsplash.com/photo-1429794890858-d3016a2bb73c?dpr=1&auto=compress,format&fm=jpg',//UAE city, AB or Dubai
  ];

  public static TECH_INFO_ARRAY = [
    {
      name: 'Angular',
      imgSrc: 'assets/Angular_logo.svg',
      information: [
        'What I\'m most comfortable with, spent a large part of the past two years focused on this',
        'Building responsive data driven user interfaces...',
        'Much like this site',
        '1.x or 2+ whatever, it doesn\'t matter'
      ]
    }, {
      name: 'Node.js',
      imgSrc: 'assets/Node.js_logo.svg',
      information: [
        'Most often I\'ve paired front ends with this, though not exclusively',
        'Setup a TypeScript Node API recently',
        'Of course have used Express too.',
        'Basically MEAN stack, if MYSQL were the \'M\''
      ]
    }, {
      name: 'TypeScript',
      imgSrc: 'assets/TypeScript_logo.svg',
      information: [
        'Obviously used for any newer Angular projects',
        'Microsoft has been up to some good stuff lately, TS is pretty sweet',
        'This and Progressive Web Apps is what I\'ve been learning recently',
      ]
    }, {
      name: 'Android',
      imgSrc: 'assets/Android_logo.svg',
      information: [
        'Began messing with Android back at Jellybean(4.1)',
        'Wouldn\'t mind doing more of this again',
        'Native certainly has it\'s place.  I feel like web tech can accomplish most of what you want out of an app'
      ]
    }, {
      name: 'Ionic',
      imgSrc: 'assets/Ionic_logo.svg',
      information: [
        'Speaking of web tech being able to meet most of the requirements for a phone app',
        'Worked on a App for iOS and Android out in production',
        'An interesting cross section between Angular and mobile development',
        'This and PWA\'s(Once Apple gets with it) seems like it will continue to blur what an App is'
      ]
    }, {
      name: 'Java',
      imgSrc: 'assets/Java_logo.svg',
      information: [
        'This is what I started with, this is what made me think, "Oh maybe this programming thing is a good choice."',
        'Definitely comfortable with the language in general',
        'Though most of the Java I deal with now is Android'
      ]
    }, {
      name: 'PHP',
      imgSrc: 'assets/PHP_Full_logo.svg',
      information: [
        'This language gets a lot of hate, I feel like the implementation is a big reason why',
        'When you use PHP to dynamically create html code to be served, well then its pretty heinous',
        'Symfony is pretty tolerable for a PHP framework, you can even just use it as an API to serve your, front end',
        'To conclude, "Basically I can, but I\'d rather not"'
      ]
    }
  ];

  public static ANIMATION_VIEW_STATES = {
    IN_VIEW: 'isInView',
    NOT_IN_VIEW: 'isNotInView',
    TRANSITION_INTO_VIEW: 'isNotInView => isInView',
    TRANSITION_OUT_OF_VIEW: 'isInView => isNotInView',
  };

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

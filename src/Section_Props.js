const section_props = {
  'categories': {
    'title':'100+ responses later',
     text: 'Total denotes the total number of times a category appeared in the responses. \
     Unique is the number of unique emojis that appeared in each category \
     And Percent is the percentage of unique emojis that appeared per category \
     It\'s  interesting to note which categories have the most number of unique emojis \
     and which actually have duplicate emojis show up.',
    },
    'twitter': {
      'title': 'Twitter Post',
    },
    'map': {
      'title': 'Countries',
      'text': 'Most countries (9 out of 14) just show up once but Ireland, UK, \
      Canada, and Japan all show up multiple times. European countries are \
      highly represented as dream destinations in this survey.'
    },
    'pairs':{
      title: 'Emoji Connection',
      text: 'Hover over an emoji to see which emojis it is linked to in responses. \
      The dots on the inside reflect how frequently the emoji appeared in the survey. '
    },
    'Transport':{
      title: 'Have Wheels? Will Travel',
      text: 'Since Airbnb is associated with travel, a number of transportation \
      emojis also popped up: airplanes, trains, helicopters and ships. \
      Airbnb is partnering with airlines but maybe there are other ways to make \
      sure the transportation is as magical as the experiences. '
    },
    'Scene':{
      title: 'Scenes',
      text: 'Travel is about going places and seeing those postcard scenes. \
      These emojis present some of those dream scenic experiences. \
      Beaches, islands, and waves (all evoking island and beach getaways) are the most popular. \
      This is followed by landmark type places such as castles and towers. \
      Then there are nature scenes such as sunrises and mountains as well as cityscapes. '
    },
    'Activity':{
      title:'Activities',
      text: 'Traveling is about more than just taking in pretty scenery. \
      It\'s also about doing things and having experiences. \
      This section features emojis that represent some of those desired experiences. \
      There is a lot of music (musical notes, dancing, saxophones). \
      The second most popular activity is surfing but this is expected since there were so many beach scenes requested. \
      Sports, in general, were also a popular type of activity in the responses.'
    },
    'Food':{
      title:'Food',
      text: 'What\'s travel without food? For some people (like me), travel is all about food so \
      food-related emojis showed up quite frequently. \
      We see that beverages actually account for some of the more popular food emojis.'
    },
    'Animal':{
      title: 'Animals',
      text: 'Animals are another interesting category that popped up suprisingly often.'
    },
    'People':{
      title: 'People',
      text: 'At the end of the day, travel is also about people- \
      either adventuring with old faces or meeting new friends.'
    },
    'Face':{
      title: 'Faces and Emotions',
      text: 'More than the other types of emojis, emoji faces provide a glimpse \
      into the emotion and sentiment people have about Experiences and Airbnb in general.'
    },
    'Symbol':{
      title: 'People',
      text: 'This was more of a catch-all category for emojis that didn\'t fit as \
      neatly into some of the other categories.'
    }
  };

const section_order = ['Transport', 'Scene', 'Activity', 'Food', 'Animal', 'Symbol', 'Face', 'People'];

export {section_props, section_order};

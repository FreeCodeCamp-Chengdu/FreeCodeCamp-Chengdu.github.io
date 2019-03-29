const { VEvent } = require('icalendar');


module.exports = function (hexo) {

  hexo.extend.helper.register(
    'eventOf',
    function (title, description, start, end, location) {

      const event = new VEvent();

      event.setSummary( title );

      event.setDescription( description );

      event.setDate(new Date(start), new Date(end));

      event.setLocation( location );

      return event;
    }
  );

  hexo.extend.helper.register('toDataURI', function (data, type = '') {

    return `data:${type};base64,${Buffer.from( data ).toString('base64')}`;
  });
};

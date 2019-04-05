const { VEvent } = require('icalendar'),
  type_map = {
    doc:  'word',
    docx: 'word',
    xls:  'excel',
    xlsx: 'excel',
    ppt:  'powerpoint',
    pptx: 'powerpoint'
  };


module.exports = function (hexo) {

  hexo.extend.helper.register('has_category',  (post, name) =>

    Array.from((post.categories || '').data,  ({ name }) => name).includes( name )
  );

  hexo.extend.helper.register('file_type',  path => {

    var type = path.split('.');

    if (! type[1]) return;

    type = type.slice(-1)[0].toLowerCase();

    return type_map[type] || type;
  });

  hexo.extend.helper.register('toDataURI',  (data, type = '') =>

    `data:${type};base64,${Buffer.from( data ).toString('base64')}`
  );

  hexo.extend.helper.register(
    'eventOf',  (title, description, start, end, location) => {

      const event = new VEvent();

      event.setSummary( title );

      event.setDescription( description );

      event.setDate(new Date(start), new Date(end));

      event.setLocation( location );

      return event;
    }
  );
};

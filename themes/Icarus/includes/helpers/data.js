const { VEvent } = require('icalendar'),
  type_map = {
    doc:  'word',
    docx: 'word',
    xls:  'excel',
    xlsx: 'excel',
    ppt:  'powerpoint',
    pptx: 'powerpoint'
  };

function has_category(post, name) {

  return Array.from(
    (post.categories || '').data,  ({ name }) => name
  ).includes( name )
}

module.exports = function (hexo) {

  hexo.extend.helper.register('has_category', has_category);

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

  const url_for = hexo.extend.helper.get('url_for');

  hexo.extend.helper.register('sponsor_list',  function (posts) {

    return posts.map(({categories, source, title, path, thumbnail}) =>

      has_category({ categories }, 'Sponsor')  &&  {
        name:  source.match( /([^/\\]+)\.\w+$/i )[1],
        title,
        logo:  url_for.call(this, path + thumbnail),
        URL:   url_for.call(this, path)
      }
    ).filter(Boolean)
  });
};

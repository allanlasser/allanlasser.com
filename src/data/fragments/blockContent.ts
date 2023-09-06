const blockContent = `
_type != 'reference' => @,
_type == 'reference' => @->{
  _type != 'album' => @,
  _type == 'album' => {
    _type,
    _id,
    title,
    images[] {
      "_id": asset->_id,
      "title": asset->title,
      "alt": asset->altText,
      "src": asset->url
    }
  }
}`;

export default blockContent;

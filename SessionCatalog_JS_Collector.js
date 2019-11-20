//  to fetch the presentations/video via bash after creating your JSON of slide reference data
//  while read line ; do title=$(echo $line | jq -r '.title' | sed ) && slidesurl=$(echo $line | jq -r '.slidesurl') && curl -o "$title.pdf" $slidesurl ; done < <(jq -r -c '.[]| {title: .Title, slidesurl: .SlidesUrl, videourl: .VideoUrl}' < 'test.json')

let PresentationArray = []

$('li.session-result').each(function(index, elem) {
  // this: the current, raw DOM element
  // index: the current element's index in the selection
  // elem: the current, raw DOM element (same as this)
  
  let sessionInfo = {}

  sessionInfo.Products = []
  
  $( elem ).find('button').each(function(index, elem) {
    // Expand the item if needed by clicking
    //$( elem ).click()
    // Grab the session title
    sessionInfo.Title = $( elem ).find('div.title-text').text().replace( /([\/\\:\*\?"<>\|])/g, "-")
  })

  if( $( elem ).find('div.rf-products').length) {
    $( elem ).find('div.rf-products').each(function(index, elem) {
      let product = this.textContent.replace(", ", "")
      sessionInfo.Products.push(product)
    })
  }
  
  if( $( elem ).find('div.rf-industries').length ) {
    sessionInfo.Industry = $( elem ).find('div.rf-industries').text()
  }

  if( $( elem ).find('div.rf-track').length ) {
    sessionInfo.Track = $( elem ).find('div.rf-track').text()
  }

  if ( $( elem ).find('div.rf-event').length ) {
    sessionInfo.Event = $( elem ).find('div.rf-event').text()
  }

  if ( $( elem ).find('div.rf-skill-level').length ) {
    sessionInfo.SkillLevel = $( elem ).find('div.rf-skill-level').text()
  }
  
  if( $( elem ).find('div.attribute-SessionVideo').find('span.attribute-values').children('a').length ) {
    sessionInfo.VideoUrl = $( elem ).find('div.attribute-SessionVideo').find('span.attribute-values').children('a')["0"].href
  }

  if( $( elem ).find('div.attribute-SessionFile').find('span.attribute-values').children('a').length ) {
    sessionInfo.SlidesUrl = $( elem ).find('div.attribute-SessionFile').find('span.attribute-values').children('a')["0"].href
  }

  if( $( elem ).find('div.rf-attribute').has('div.description').find('span').length ) {
    sessionInfo.Description = $( elem ).find('div.rf-attribute').has('div.description').find('span').text()
  }

  PresentationArray.push(sessionInfo)

})

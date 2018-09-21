import prismic from 'prismic-javascript'
import prismicDOM from 'prismic-dom'

export default {
  post (id) {
    return {
      predicate: prismic.Predicates.at('my.gallery.uid', id),
      apiOptions: {},
      resolve: (response, mappers) => {
        let data = response['results'][0]

        let mapped = {
          title: data['data']['gallery_name'],
          description: prismicDOM.RichText.asHtml(data['data']['gallery_description'], function (doc) {
            if (doc.type === 'gallery') return '/gallery/' + doc.uid
            return '/' + doc.id
          }),
          images: data['data']['images'],
          published: data['last_publication_date'],
          order: data['data']['order']
        }

        return mappers.set(mapped)
      }
    }
  }
}

import prismic from 'prismic-javascript'
import prismicDOM from 'prismic-dom'

export default {
  about () {
    return {
      predicate: prismic.Predicates.at('document.type', 'about'),
      resolve: (response, mappers) => {
        let data = response.results[0].data
        return Promise.resolve({
          content: prismicDOM.RichText.asHtml(data['content'], function (doc) {
            if (doc.type === 'gallery') return '/gallery/' + doc.uid
            return '/' + doc.id
          }),
          picture: data.profile_pic.url
        })
      }
    }
  }
}

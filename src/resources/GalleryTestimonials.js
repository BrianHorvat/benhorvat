import prismic from 'prismic-javascript'
import prismicDOM from 'prismic-dom'

export default {
  testimonials () {
    return {
      predicate: prismic.Predicates.at('document.type', 'testimonials'),
      resolve: (response, mappers) => {
        let data = response.results[0].data
        
        return Promise.resolve({
          flavorText: prismicDOM.RichText.asHtml(data['flavor_text'], function (doc) {
            if (doc.type === 'gallery') return '/gallery/' + doc.uid
            return '/' + doc.id
          }),
          testimonials: data['testimonial'].map(testimonial => {
            testimonial.quote = prismicDOM.RichText.asHtml(testimonial.quote, function (doc) {
              if (doc.type === 'gallery') return '/gallery/' + doc.uid
              return '/' + doc.id
            })
            testimonial.picture = testimonial.picture.url

            return testimonial
          })
        })
      }
    }
  }
}

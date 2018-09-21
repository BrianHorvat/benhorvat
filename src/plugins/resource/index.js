import _merge from 'lodash.merge'
import cache from './cache'
import prismic from 'prismic-javascript'

// install $resource as a Vue plugin
export default {
  install (Vue, { endpoint = '', resources = {} }) {
    Vue.prototype.$getResource = function (method, options) {
      let name = this.$options.resource
      if (!name || !resources[name] || !resources[name][method]) return

      // get fetch path and response resolver/mapper
      let { predicate, apiOptions, resolve } = resources[name][method](options)

      // methods return promise to allow chaining
      const mappers = {
        // only return promise without modifying instance $data
        pipe: dataSet => Promise.resolve(dataSet),

        // deep merge object with instance $data
        merge: dataSet => {
          _merge(this.$data, dataSet)
          return Promise.resolve(dataSet)
        },

        // set individual props on instance $data
        set: dataSet => {
          Object.keys(dataSet).forEach(prop => {
            this.$set(this.$data, prop, dataSet[prop])
          })

          return Promise.resolve(dataSet)
        }
      }

      // check to see if the resource has been cached already
      if (cache.has([predicate])) {
        return resolve(cache.get(predicate), mappers)
      }

      return prismic.getApi(endpoint)
        .then(api => api.query(predicate, apiOptions))
        .then(response => cache.set(predicate, response))
        .then(response => resolve(response, mappers))
    }
  }
}

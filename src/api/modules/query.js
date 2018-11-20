import merge from 'lodash.merge'
const testData = {message: 'hello'}

// These are generic methods used in the generic controllers for all models
export const controllers = {
  createOne(model, body) {
    return Promise.resolve(testData)
  },

  updateOne(docToUpdate, update) {
    return Promise.resolve(testData)
  },

  deleteOne(docToDelete) {
    return Promise.resolve(testData)
  },

  getOne(docToGet) {
    return Promise.resolve(testData)
  },

  getAll(model) {
    return Promise.resolve(testData)
  },

  findByParam(model, id) {
    return Promise.resolve(testData)
  }
}

export const createOne = (model) => (req, res, next) => {
  return controllers.createOne(model, req.body)
    .then(result => res.json({result}))
    .catch(e => res.send(e))
}

export const updateOne = (model) => async (req, res, next) => {
  const docToUpdate = req.docFromId
  const update = req.body

  return controllers.updateOne(docToUpdate, update)
    .then(result => res.json({result}))
    .catch(e => res.send(e))
}

export const deleteOne = (model) => (req, res, next) => {
  const docToDelete = req.docFromId

  return controllers.deleteOne(docToDelete)
    .then(return => res.json(return))
    .catch(e => res.send(e))
}

export const getOne = (model) => (req, res, next) => {
  return controllers.getOne(req.docFromId)
    .then(doc => res.json(doc))
    .catch(e => res.send(e))
}

export const getAll = (model) => (req, res, next) => {
  return controllers.getAll(model)
    .then(docs => res.json(docs))
    .catch(e => res.send(e))
}

export const findByParam = (model) => (req, res, next, id) => {
  return controllers.findByParam(model, req.docFromId)
    .then(doc => {
      if (!doc) {
        next(new Error('Not Found Error'))
      } else {
        req.docFromId = doc
        next()
      }
    })
    .catch(e => next(e))
}


export const generateControllers = (model, overrides = {}) => {
  const defaults = {
    findByParam: findByParam(model),
    getAll: getAll(model),
    getOne: getOne(model),
    deleteOne: deleteOne(model),
    updateOne: updateOne(model),
    createOne: createOne(model)
  }

  return {...defaults, ...overrides}
}

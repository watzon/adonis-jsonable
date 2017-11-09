class Jsonable {
    
    constructor () {
        this.fields = []
    }

    register (Model, options) {
        this.fields = Model.prototype.jsonFields || options || []
        console.log(options)

        Model.addHook('beforeSave', this.beforeUpdateSave.bind(this))
        Model.addHook('beforeUpdate', this.beforeUpdateSave.bind(this))
        Model.addHook('afterSave', this.afterUpdateSave.bind(this))
        Model.addHook('afterUpdate', this.afterUpdateSave.bind(this))
    }

    beforeUpdateSave (instance) {
        for (let field of this.fields) {
            if (instance[field]) {
                instance[field] = JSON.stringify(instance[field])
            }
        }
    }

    afterUpdateSave (instance) {
        for (let field of this.fields) {
            if (instance[field]) {
                instance[field] = JSON.parse(instance[field])
            }
        }
    }

}

module.exports = Jsonable
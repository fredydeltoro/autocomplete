const app = {}

app.Character = Backbone.Model.extend({
  defaults: {
    name: ''
  }
})

app.Characters = Backbone.Collection.extend({
  model: app.Character,
  url: 'https://swapi.dev/api/people/',
  parse: (response) => response.results.map((chr) => ({
    name: chr.name,
    height: chr.height,
    mass: chr.mass,
    films: chr.films
  }))
});

app.characterView = Backbone.View.extend({
  tagName: 'ul',
  template: _.template($('#suggestions-template').html()),
  render: function () {
    this.$el.html(this.template({
      suggestions: this.model.toJSON()
    }));
    return this
  }
})

const AppView = Backbone.View.extend({
  el: '#app',
  initialize: function () {
    this.input = this.$('#search-input')
    this.wrapper = this.$('#suggestions')
    this.loading = this.$('.loading')
    this.loading.hide()
    this.cursor = 0
    app.characters = new app.Characters()
    app.characters.on('sync', this.listenSuggestions, this)
    app.characters.on('reset', this.listenSuggestions, this)

  },
  events: {
    'keyup #search-input': 'onChange',
    'keydown #search-input': 'upDown',
    'click': 'clickOutside',
    'click .suggestion': 'onClick',
  },
  clickOutside: function (e) {
    console.log('ya ==>', e.target.closest('.suggestion'));
    if (e.target.closest('.suggestion') === null) {
      app.characters.reset()
    }
    if (e.target.closest('#search-input') && this.value.length) {
      this.fetch()
    }
  },
  onClick: function (e) {
    const id = e.target.closest('.suggestion').id.match(/^(\d{1,2})-/)

    if (id) {
      const current = app.characters.models[parseInt(id[1]) - 1]
      this.value = current.get('name')
      this.input.val(this.value)
      app.characters.reset()
    }
  },
  upDown: function (e) {
    const size = app.characters.length
    document.querySelectorAll('.suggestion').forEach((el) => {
      el.classList.remove('hover')
    })

    if (e.which === 27) {
      this.input.val(this.value)
      app.characters.reset()
      return
    }

    if (e.which === 38) {
      e.preventDefault()
      if (this.cursor > 0) {
        this.cursor -= 1
        if (this.cursor === 0) {
          this.input.val(this.value)
        }
      } else {
        this.cursor = 0
      }
    } else if (e.which === 40 && size && this.cursor < size) {
      e.preventDefault()
      this.cursor += 1
    }

    if (this.cursor > 0) {
      const suggestion = this.$(`#${this.cursor}-suggestion`)
      const currentValue = app.characters.models[(this.cursor - 1)].get('name')
      this.input.val(currentValue)
      suggestion.addClass('hover')
    }
  },
  onChange: _.debounce(function (e) {
    if ([38, 40, 27].includes(e.which)) {
      return
    }

    this.value = this.input.val().trim()

    if (e.which === 13 || !this.value) {
      this.value = this.input.val().trim()
      app.characters.reset()
      return
    }
    this.loading.show()
    this.fetch()
  }, 300),
  fetch: function () {
    app.characters.fetch({
      data: {
        search: this.value
      }
    }).done(() => {
      this.loading.hide()
      this.cursor = 0
    })
  },
  listenSuggestions: function () {
    const view = new app.characterView({
      model: app.characters
    })
    this.wrapper.html(view.render().el)
  }
})

const appView = new AppView()
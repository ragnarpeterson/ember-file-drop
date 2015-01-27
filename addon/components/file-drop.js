import Em from 'ember';

var bind = Em.run.bind;

export default Em.Component.extend({
  classNames: ['file-drop'],
  hoverClass: 'hover',
  file: null,
  onChange: null,

  setup: function() {
    var handleDrag = bind(this, this.handleDrag),
        handleDrop = bind(this, this.handleDrop),
        handleChange = bind(this, this.handleChange);

    this.$().on({
      dragover: handleDrag,
      dragleave: handleDrag,
      drop: handleDrop
    });

    this.$('input:file').on('change', handleChange);
  }.on('didInsertElement'),

  handleDrag: function(evt) {
    if (evt.type === 'dragover') {
      this.startHover();
    } else {
      this.stopHover();
    }

    return false;
  },

  handleDrop: function(evt) {
    this.stopHover();
    this.handleFile(evt.dataTransfer.files[0]);
    return false;
  },

  handleChange: function(evt) {
    this.handleFile(evt.target.files[0] || null);
  },

  handleFile: function(file) {
    if (file && this.validate(file)) {
      this.setFile(file);
    } else {
      this.setFile(null);
    }
  },

  setFile: function(file) {
    this.set('file', file);
    this.sendAction('onChange', file);
  },

  validate: function(file) {
    return true;
  },

  browse: function(evt) {
    if (evt.target.type !== 'file') { this.$('input:file').click(); }
  }.on('click'),

  startHover: function() {
    this.$().addClass(this.get('hoverClass'));
  },

  stopHover: function() {
    this.$().removeClass(this.get('hoverClass'));
  },

  teardown: function() {
    var handleDrag = bind(this, this.handleDrag),
        handleDrop = bind(this, this.handleDrop),
        handleChange = bind(this, this.handleChange);

    this.$().off({
      dragover: handleDrag,
      dragleave: handleDrag,
      drop: handleDrop
    });

    this.$('input:file').off('change', handleChange);
  }.on('willDestroyElement')
});

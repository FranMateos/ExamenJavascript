'use strict';

function validate(value) {
  // Todo: completar
}


new Vue({
  el: '#app',
  data: {
    dni: '12345678Z'
  },
  computed: {
    result: function() {
      return validate(this.dni);
    }
  }
});

ko.bindingHandlers.tooltip = {
  init: function(element, valueAccessor) {
    var local = ko.utils.unwrapObservable(valueAccessor()),
      options = {};

    ko.utils.extend(options, ko.bindingHandlers.tooltip.options);
    ko.utils.extend(options, local);

    $(element)
      .find(".fa-question-circle")
      .tooltip(options);
  },
  options: {
    placement: "right",
    trigger: "hover"
  }
};

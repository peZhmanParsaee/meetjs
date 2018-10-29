describe("TimeHelper", function () {
  var timeHelper;

  beforeEach(function() {    
    timeHelper = new TimeHelper();
  });

  it('should format hour HH:MM properly', function() {    

    timeHelper.formatHour()

    expect("09:00").toEqual(timeHelper.formatHour("9", 2));
    expect("01:00").not.toEqual(timeHelper.formatHour(1, 1));

  });  

});
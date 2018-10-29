describe("ArrayHelper", function () {
  var arrayHelper;

  beforeEach(function() {
    arrayHelper = new ArrayHelper();
  });

  it('should clone an array', function() {

    let arrMeetings = [
      { id: "New", start: 60, end: 120 },
      { id: "New 1", start: 150, end: 270 },
      { id: "New 2", start: 240, end: 300 },
      { id: "New 3", start: 200, end: 360 },
      { id: "New 4", start: 180, end: 330 },
    ];
    
    let clonedArray = arrayHelper.cloneData(arrMeetings);

    expect(clonedArray).toEqual(jasmine.arrayContaining(arrMeetings));

  });

  it('should remove duplicate elements from array', function() {

    let arrMeetings = [ 'Meeting 1', 'Meeting 2', 'Meeting 3', 'Meeting 2', 'Meeting 1'  ];
    
    let uniqueArray = arrayHelper.unique(arrMeetings);

    expect(uniqueArray).toEqual([ 'Meeting 1', 'Meeting 2', 'Meeting 3' ]);

  });

});
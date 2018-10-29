describe("Meeting", function () {
  var meeting;

  beforeEach(function() {
    meeting = new Meeting();
  });

  it('should return calculated position of meetings', function() {

    let arrMeetings = [
      { id: "New", start: 60, end: 120 },
      { id: "New 1", start: 150, end: 270 },
      { id: "New 2", start: 240, end: 300 },
      { id: "New 3", start: 200, end: 360 },
      { id: "New 4", start: 180, end: 330 },
    ];
    
    var arrMeetingsWithPosition = meeting.calculateMeetingsPosition(arrMeetings);
    
    for (let i=0; i<arrMeetings.length; i++) {
      expect(arrMeetingsWithPosition[i].hasOwnProperty('position')).toBe(true);
    }
  });


});
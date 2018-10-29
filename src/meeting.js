var canvasWidth = 600;
var centerY = 1440;
var lastY = 1440;
var originY = 0;
var originX = 0;
var oneHourPixel = 120;
var defaultMeetingColor = '#83C6B6';

function Meeting(id, start, end, color) {
  this.id = id;
  this.start = start;
  this.end = end;
  this.color = color;  
}

Meeting.prototype.search = function(id, meetings) {
  for (var i=0; i < meetings.length; i++) {
    if (meetings[i].id === id) {
      return meetings[i];
    }
  }
}

Meeting.prototype.add = function(){  
  var self = this;

  if (self.end <= self.start || !self.id) {    
    return { status: false, message: "Validation Failed! Check your inputs :)" };
  }

  let newMeetingToBeSaved = { id: self.id, start: self.start, end: self.end, color: self.color };

  let storedMeetings = localStorage.getItem("meetings");
  let meetingsArray = JSON.parse(storedMeetings);
  let meeting = new Meeting();
  let foundMeeting = meeting.search(newMeetingToBeSaved.id, meetingsArray);

  if (foundMeeting) {
    return { status: false, message: "Already exists !! Choose another Id" };
  }

  meetingsArray.push(newMeetingToBeSaved);

  populateCanvas(meetingsArray);
  
  self.save(meetingsArray);

  return { status: true };
}

Meeting.prototype.calculateMeetingsPosition = function (meetingsArray) {
  var self = this;
  var arrayHelper = new ArrayHelper();

  // make a copy of meetingsArray, to not adding extra meta data to it
  let meetings = arrayHelper.cloneData(meetingsArray);

  meetings.reverse();
  
  // find each meeting DIRECT conflicts
  meetings = meetings.map(function (meeting) {
    let conflicts = [];
    for (meetingToCheck of meetings) {
      if (self.haveTwoMeetingsAnyConflict(meeting, meetingToCheck)) {
        console.log(`${meeting.id} and ${meetingToCheck.id} have conflicts!`);
        conflicts.push(meetingToCheck.id);
      }
    }
    meeting.conflicts = conflicts;
    return meeting;
  });

  // find ALL meeting conflicts
  meetings = meetings.map(function (meeting) {    

    if (meeting.conflicts.length) {
      let allConflicts = [];
      
      allConflicts.push(...meeting.conflicts);

      let meetingObject = new Meeting();
      for (conflictMeetingId of meeting.conflicts) {
        let conflicMeeting = meetingObject.search (conflictMeetingId, meetings);
        allConflicts.push(...conflicMeeting.conflicts);
      }

      let arrayHelper = new ArrayHelper();

      allConflicts = arrayHelper.unique(allConflicts);
      let selfMeetingIndex = allConflicts.indexOf(meeting.id);
      if (selfMeetingIndex >= 0) {
        console.log('found selfMeetingIndex in '+ JSON.stringify(allConflicts) + ' for meetngs id ' + meeting.id);
        allConflicts.splice(selfMeetingIndex, 1);
        console.log('and after splicing it converts to: ' + JSON.stringify(allConflicts));
      }
      meeting.allConflicts = allConflicts;
      if (!allConflicts.length) {
        console.log('all conflicts is zero for meeting '+ meeting.id);
      }
      return meeting;
    } else {
      meeting.allConflicts = meeting.conflicts;
      return meeting;
    }
    
  });

  let meetingsPositionCalculationStatus = []

  // specify each meeting's position
  meetings = meetings.map(function (meeting, index, updatedMeetings) {
    const top = centerY - meeting.end * 2;
    const width = meeting.allConflicts.length ? Math.round(canvasWidth / (meeting.allConflicts.length + 1)) : canvasWidth;
    const height = (centerY - meeting.start * 2) - top;
    
    let left = 0;
    
    if (meeting.allConflicts && meeting.allConflicts.length) {
      // calculate left of meeting
      let leftBoxNum = 0;
      for (let conflicMeetingId of meeting.allConflicts) {
        if (meetingsPositionCalculationStatus[conflicMeetingId] 
          && meetingsPositionCalculationStatus[conflicMeetingId] == true) {
          // position of conflicMeeting was calculated before
          // so left of meeting must be increased
          leftBoxNum += 1;
        }
      }
      // calculate new left
      left = leftBoxNum * width;
      
    }
    
    meetingsPositionCalculationStatus[meeting.id] = true;
    return { ...meeting, position: { left, top, width, height }};
  });

  return meetings;
}

Meeting.prototype.haveTwoMeetingsAnyConflict = function(meeting1, meeting2) {
  let haveConfliction =
    meeting1.id != meeting2.id && (
        ( meeting1.start >= meeting2.start && meeting1.start < meeting2.end) || 
        ( meeting1.end   > meeting2.start && meeting1.end   <= meeting2.end) ||

        ( meeting2.start >= meeting1.start && meeting2.start < meeting1.end) || 
        ( meeting2.end   > meeting1.start && meeting2.end   <= meeting1.end)
    );
  return haveConfliction;
}

Meeting.prototype.save = function(meetingsArray) {
  if (typeof(Storage) != "undefined") {
    localStorage.setItem("meetings", JSON.stringify(meetingsArray));
   }
}

Meeting.prototype.clearDataStorage = function() {
  localStorage.removeItem("meetings");
  localStorage.setItem("meetings", JSON.stringify([]));
}
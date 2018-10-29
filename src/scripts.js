var canvas = document.getElementById('calendar_canvas');

if (canvas.getContext) {
  clearCanvas(canvas);

  let context = canvas.getContext('2d');    
  
  context.translate(40, 20);
}

let populateCanvas = function (meetingsArray) {

  if (canvas.getContext) {
    clearCanvas(canvas);

    let context = canvas.getContext('2d');
    
    context.lineWidth = 1;
    context.strokeStyle = '#a7a7a7';
      
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(0, 1440);
    context.lineTo(600, 1440);
    context.strokeStyle = '#2822A5';
  
    let timeHelper = new TimeHelper();
    
    // show vertical axes
    for (let i = 0; i <= 12; i++) {
      let x = originX - 5;
      let y = centerY - (oneHourPixel * i);
  
      if (i != 0) {
        context.moveTo(x, y);
        context.lineTo(x + 10, y);
      }
      
      context.strokeText(timeHelper.formatHour(i + 9, 2), x - 30, y + 3);
    } 
    
    context.stroke();
    var meetingObject = new Meeting();    
    let arrMeetingsWithPosition = meetingObject.calculateMeetingsPosition(meetingsArray);
    
    for (let meeting of arrMeetingsWithPosition) {
      
      context.strokeStyle = '#ffffff';
      context.lineWidth = 1;

      if (meeting.color) {
        context.fillStyle = meeting.color;
      } else {
        context.fillStyle = defaultMeetingColor;
      }      
      
      context.fillRect(meeting.position.left, meeting.position.top, meeting.position.width, meeting.position.height);
      let centerOfRect = {
        x: meeting.position.left + (meeting.position.width) / 2 - meeting.id.length,
        y: meeting.position.top + (meeting.position.height) / 2
      }
      context.strokeText(meeting.id, centerOfRect.x, centerOfRect.y);
    }

    context.lineWidth = 1;
    context.stroke();
  }

}

function clearCanvas(canvas) {
  const ctx = canvas.getContext('2d');
  ctx.save();
  ctx.globalCompositeOperation = 'copy';
  ctx.strokeStyle = 'transparent';
  ctx.beginPath();
  ctx.lineTo(0, 0);
  ctx.stroke();
  ctx.restore();
}

var colorElements = document.getElementsByClassName('color');
var colorHiddenElement = document.getElementById('color');
var closeButtons = document.getElementsByClassName('close_button');
var colorElements = document.getElementsByClassName('color');
var colorHiddenElement = document.getElementById('color');

function HtmlHelper() {  
}

HtmlHelper.prototype.showForm = function() {
  this.clearForm();
  document.getElementById("overlay").style.display = "block";
}

HtmlHelper.prototype.hideForm = function() {
  document.getElementById("overlay").style.display = "none";
}

HtmlHelper.prototype.clearForm = function() {
  document.getElementById("error_message").innerText = "";
  document.getElementById("new_meeting_id").value = "";  
  
  var startTimeElement = document.getElementById("start_time");
  startTimeElement.value = startTimeElement.options[0].value;
  var endTimeElement = document.getElementById("end_time");
  endTimeElement.value = endTimeElement.options[0].value;
  
  colorHiddenElement.value = defaultMeetingColor;

  var colorElements = document.getElementsByClassName('color');
  for (var i = 0; i < colorElements.length; i++) {
    colorElements[i].classList.remove("selected_color");
  }
  colorElements[0].classList.add('selected_color');
}

HtmlHelper.prototype.clearMessages = function () {
  var errorMessageElement = document.getElementById("error_message");
  errorMessageElement.innerText = "";
}

HtmlHelper.prototype.createEventListeners = function() {
  var self = this;
  var addNewButton = document.getElementById("add_new_button");
  var addMeetingButton = document.getElementById("add_meeting_button");  
  var overlay = document.getElementById("overlay");

  addNewButton.addEventListener('click', function (e) {
    self.showForm();
  });

  addMeetingButton.addEventListener('click', function (e) {    
    self.clearMessages();

    var errorMessage = document.getElementById("error_message");

    var startTimeElement = document.getElementById("start_time");
    var endTimeElement = document.getElementById("end_time");
    var colorHiddenElement = document.getElementById("color");
    var id = document.getElementById("new_meeting_id").value;
    var start = Number(startTimeElement.options[startTimeElement.selectedIndex].value);
    var end = Number(endTimeElement.options[endTimeElement.selectedIndex].value);
    var color = colorHiddenElement.value;

    var meetingObject = new Meeting(id, start, end, color);
    var opStatus = meetingObject.add();

    if (opStatus.status && opStatus.status == true) {
      self.hideForm();
      return;
    } else {
      errorMessage.innerText = opStatus.message;
    }

  });
  
  overlay.addEventListener('click', function (e) {
    if (e.target == overlay) {
      self.hideForm();
    }
  });

  for (var i = 0; i < colorElements.length; i++) {
    colorElements[i].addEventListener('click', self.setColorOfNewMeeting, false);
  }

  for (var i = 0; i < closeButtons.length; i++) {
    closeButtons[i].addEventListener('click', self.hideForm, false);
  }

}

HtmlHelper.prototype.setColorOfNewMeeting = function () {
  hexColor = this.getAttribute('data-hex');
  colorHiddenElement.value = hexColor;

  var selectedColors = document.getElementsByClassName('selected_color');
  for (var i = 0; i < selectedColors.length; i++) {
    selectedColors[i].classList.remove("selected_color");
  }

  this.classList.add("selected_color");
}
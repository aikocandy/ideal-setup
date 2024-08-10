// 이메일을 찾기 위한 라벨 이름을 지정합니다.
// Gmail 필터를 통해 삭제하고자 하는 패턴의 메일이 아래의 라벨로 자동으로 분류되도록 하는 작업이 선행되어야 합니다.
const LABEL_NAME = 'mocaverse passwordless';

function moveEmailsToTrash() {
  var label = GmailApp.getUserLabelByName(LABEL_NAME);
  
  if (label) {
    // 하루 전에 받은 이메일만 선택합니다.
    var threads = label.getThreads();
    var now = new Date();
    threads.forEach(function(thread) {
      var messages = thread.getMessages();
      messages.forEach(function(message) {
        var ageInHours = (now - message.getDate()) / (1000 * 60 * 60);
        if (ageInHours >= 1) { // 1시간을 넘은 이메일
          GmailApp.moveThreadToTrash(thread);
        }
      });
    });
  } else {
    Logger.log("라벨이 존재하지 않습니다: " + LABEL_NAME);
  }
}
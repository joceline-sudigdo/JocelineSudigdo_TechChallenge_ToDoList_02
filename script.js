$(document).ready(function() {
  // Enable drag and drop
  $('ul').sortable({
    cursor: 'move',
    opacity: 0.6,
    placeholder: 'placeholder',
    animation: 150
  });

  $('#add-btn').click(function(event) {
    event.preventDefault();
    
    var title = $('input[name=listItem]').val();
    var desc = $('input[name=taskDesc]').val();
    var startTime = $('input[name=startTime]').val();
    var endTime = $('input[name=endTime]').val();
    
    if(title && startTime && endTime) {
      // Format waktu dari 24jam ke 12jam (opsional)
      var timeRange = startTime + ' - ' + endTime;
      
      var newItem = `
        <li>
          <div class="task-content">
            <div class="task-info">
              <span class="task-time">${timeRange}</span>
              <div class="task-details">
                <h2 class="task-title">${title}</h2>
                <p class="task-desc">${desc || 'No description'}</p>
              </div>
            </div>
          </div>
        </li>
      `;
      
      $('ul').prepend(newItem);
      $('ul li:first').slideDown(300);
      
      // Kosongkan semua input
      $('input[name=listItem]').val('');
      $('input[name=taskDesc]').val('');
      $('input[name=startTime]').val('');
      $('input[name=endTime]').val('');
      
      $('ul').sortable('refresh');
      alert('Task added!');
    } else {
      alert('Title still empty!');
    }
  });

  $(document).on('dblclick', 'li', function() {
    var $item = $(this);
    
    //cek apakah task sudah complete?
    if ($item.hasClass('completed')) {
      //kalau udah task di delete
      $item.slideUp(400, function() {
        $item.remove();
      });
    } else {
      //kalau belum di mark as completed
      $item.addClass('completed');

      setTimeout(function() {
        $item.slideUp(400, function() {
          $item.appendTo('ul').slideDown(400);
        });
      }, 300);
    }
  });
});
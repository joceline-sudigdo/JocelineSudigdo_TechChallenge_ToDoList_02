$(document).ready(function() {
  //drag and drop feature using jquery ui
  $('ul').sortable({
    cursor: 'move', //mengubah cursor jadi move
    opacity: 0.6, //mengubah opacity item saat di drag
  });

  $('#add-btn').click(function(event) { //tambah task baru
    event.preventDefault(); //mencegah page reload
    
    var title = $('input[name=listItem]').val(); //ambil value dari input dengan nama listItem
    var desc = $('input[name=taskDesc]').val(); //ambil value dari input dengan nama taskDesc
    var startTime = $('input[name=startTime]').val(); //ambil value dari input dengan nama startTime
    var endTime = $('input[name=endTime]').val(); //ambil value dari input dengan nama endTime
    
    if(title && startTime && endTime) { //jika title, starTime, endTIme sudah terisi maka akan dieksekusi
      var timeRange = startTime + ' - ' + endTime; //menggabungkan startTime dengan endTime
      
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
      `; //declare task baru
      
      $('ul').prepend(newItem); //nambah task baru di dalam ul mulai dari urutan awal
      
      // Kosongkan semua input, agar user tau task berhasil ditambah
      $('input[name=listItem]').val('');
      $('input[name=taskDesc]').val('');
      $('input[name=startTime]').val('');
      $('input[name=endTime]').val('');
      
      $('ul').sortable('refresh'); //untuk update sortable list, agar task yg baru di add bisa disort
      alert('Task added!'); //akan keluar pop up task added
    } else {
      alert('Title still empty!'); //kalau tidak memenuhi kondisi if, keluar pop up
    }
  });

  $(document).on('dblclick', 'li', function() { //fitur double klik task
    var $item = $(this); //declare task sebagai variabel $item
    
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
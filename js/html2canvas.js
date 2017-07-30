window.onload = function () {
  var jietu = document.getElementById('jietu')
  var container = document.getElementById('container')
  jietu.addEventListener('click', function() {
    html2canvas(container).then(function(canvas) {
      var preview = document.getElementById('preview')
      preview.style.display = 'flex'
      preview.appendChild(canvas)
      // ctx = canvas.getContext('2d')
      // canvas.toBlob(function(blob) {
      //   saveAs(blob, 'jietu image.png')
      // })
    })
  }, false)
  
  var download = document.getElementById('download')
  download.addEventListener('click', function() {
    preview.style.display = 'none'
    html2canvas(document.body).then(function(canvas) {
      var preview = document.getElementById('preview')
      ctx = canvas.getContext('2d')
      canvas.toBlob(function(blob) {
        saveAs(blob, 'jietu image.png')
      })
    })
  }, false)
}


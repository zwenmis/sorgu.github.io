document.getElementById('lookupBtn').addEventListener('click', () => {
    const ipInput = document.getElementById('ipInput').value;
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = 'Yükleniyor...';

    // IP adresinin geçerli bir formatta olup olmadığını basitçe kontrol et
    if (!/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(ipInput)) {
        resultsDiv.innerHTML = '<p style="color: red;">Lütfen geçerli bir IP adresi girin.</p>';
        return;
    }

    // ip-api.com'un ücretsiz API'sini kullanıyoruz.
    // Lütfen bunun sadece basit bir örnek olduğunu unutmayın,
    // ticari uygulamalar için ücretli API'ler veya backend kullanımı daha uygundur.
    fetch(`http://ip-api.com/json/${ipInput}`)
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                resultsDiv.innerHTML = `
                    <p><strong>IP Adresi:</strong> ${data.query}</p>
                    <p><strong>Ülke:</strong> ${data.country} (${data.countryCode})</p>
                    <p><strong>Şehir:</strong> ${data.city}</p>
                    <p><strong>Bölge:</strong> ${data.regionName}</p>
                    <p><strong>Posta Kodu:</strong> ${data.zip}</p>
                    <p><strong>Enlem/Boylam:</strong> ${data.lat}, ${data.lon}</p>
                    <p><strong>Zaman Dilimi:</strong> ${data.timezone}</p>
                    <p><strong>ISP (İnternet Servis Sağlayıcısı):</strong> ${data.isp}</p>
                    <p><strong>Organizasyon:</strong> ${data.org}</p>
                `;
            } else {
                resultsDiv.innerHTML = `<p style="color: red;">IP adresi sorgulanamadı. Hata: ${data.message || 'Bilinmeyen Hata'}</p>`;
            }
        })
        .catch(error => {
            console.error('Sorgulama hatası:', error);
            resultsDiv.innerHTML = '<p style="color: red;">Bir hata oluştu. Lütfen tekrar deneyin.</p>';
        });
});

// Sayfa yüklendiğinde kullanıcının kendi IP adresini sorgula
document.addEventListener('DOMContentLoaded', () => {
    fetch('http://ip-api.com/json/')
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                document.getElementById('ipInput').value = data.query;
                document.getElementById('lookupBtn').click(); // Otomatik sorgula
            }
        })
        .catch(error => console.error('Kendi IP adresinizi bulmada hata:', error));
});

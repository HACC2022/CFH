async function getURLs() {
  const response = await fetch("/admin/getURLs")
  const result = await response.json()
  const urls = result.map(u => u.longUrl).filter(x => x !== undefined);
  const httpsCount  = urls.filter(u => u.startsWith("https://")).length;
  const httpCount = urls.filter(u => u.startsWith("http://")).length
  const labels = ["https", "http"]
  const urlData = [httpsCount, httpCount]
  const data = {
    labels: labels,
    datasets: [{
      label: "https vs http",
      backgroundColor: ["rgba(75, 192, 192, 0.5)", "rgba(255, 99, 132, 0.5)"],
      data: urlData,
    }]
  }

  const config = {
    type: "bar",
    data: data,
    options: {}
  }

  const urlDataChart = new Chart(
    document.getElementById('urlSecurityData'),
    config
  );
}

async function getCountries() {
  const response = await fetch("/admin/country")
  const countries = await response.json();
  const filteredData = Object.entries(countries).filter(([key,_]) => key !== "undefined");
  const labels = filteredData.map(fd => fd[0]);
  const vals = filteredData.map(fd => fd[1]);
  
  const data = {
    labels: labels,
    datasets: [{
      label: "URLs by Country",
      data: vals,
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
      'rgba(255, 159, 64, 0.5)',
      'rgba(255, 205, 86, 0.5)',
      'rgba(75, 192, 192, 0.5)',
      'rgba(54, 162, 235, 0.5)',
      'rgba(153, 102, 255, 0.5)',
      'rgba(201, 203, 207, 0.5)'
      ]
    }]
  }

  const config = {
    type: "bar",
    data: data,
    options: {}
  }
  
  const urlCountryData = new Chart(
    document.getElementById('urlCountryData'),
    config
  );
}

const filteredData =  getCountries();

const urls = getURLs();

$('#table_id').DataTable();


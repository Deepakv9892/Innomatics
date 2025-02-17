function trafficLightControl(density) {
    let greenLightDuration = 0;
  
    if (density === 'heavy') {
      greenLightDuration = 60;
    } else if (density === 'moderate') {
      greenLightDuration = 40; 
    } else if (density === 'light') {
      greenLightDuration = 20;
    }
  
    return greenLightDuration;
  }

  document.getElementById("traffic-form").addEventListener("submit", function(event) {
    event.preventDefault();
    let density = document.getElementById("density").value;
    let duration = trafficLightControl(density);
    document.getElementById("result").innerText = `Green light will stay on for ${duration} seconds for ${density} traffic.`;
  });
  